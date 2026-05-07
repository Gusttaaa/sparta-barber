const { Client } = require('pg');

const oldConnStr = 'postgresql://postgres:Vayneismymain123!@db.mkvgazhybnxkvfjuiwcn.supabase.co:5432/postgres';
const newConnStr = 'postgresql://postgres:Vayneismymain123!@db.gokyztsacszgxqnebfiq.supabase.co:5432/postgres';

async function migrate() {
  const oldClient = new Client({ connectionString: oldConnStr });
  const newClient = new Client({ connectionString: newConnStr });

  await oldClient.connect();
  await newClient.connect();

  console.log('📋 Getting list of tables...');

  // Get all tables
  const tablesResult = await oldClient.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  `);

  const tables = tablesResult.rows.map(r => r.tablename);
  console.log(`Found ${tables.length} tables: ${tables.join(', ')}\n`);

  for (const table of tables) {
    console.log(`\n🔄 Processing table: ${table}`);

    try {
      // Get table schema/definition from old database
      const schemaResult = await oldClient.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [table]);

      if (schemaResult.rows.length === 0) {
        console.log(`  ⚠️  No columns found`);
        continue;
      }

      // Build CREATE TABLE statement
      let createTable = `CREATE TABLE IF NOT EXISTS "${table}" (\n`;
      const columns = schemaResult.rows.map(col => {
        let def = `  "${col.column_name}" ${col.data_type}`;
        if (col.is_nullable === 'NO') def += ' NOT NULL';
        if (col.column_default) def += ` DEFAULT ${col.column_default}`;
        return def;
      });
      createTable += columns.join(',\n') + '\n)';

      // Create table in new database
      await newClient.query(createTable);
      console.log(`  ✓ Table schema created`);

      // Copy data
      const data = await oldClient.query(`SELECT * FROM "${table}"`);

      if (data.rows.length === 0) {
        console.log(`  ✓ No data to copy`);
        continue;
      }

      const columnNames = Object.keys(data.rows[0]);

      for (const row of data.rows) {
        const values = columnNames.map(col => row[col]);
        const placeholders = columnNames.map((_, i) => `$${i + 1}`).join(', ');
        const query = `INSERT INTO "${table}" (${columnNames.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;

        await newClient.query(query, values);
      }

      console.log(`  ✓ Copied ${data.rows.length} rows`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
    }
  }

  await oldClient.end();
  await newClient.end();

  console.log('\n🎉 Migration complete!');
}

migrate().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
