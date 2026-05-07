-- Enable RLS on all tables
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE horarios_bloqueados ENABLE ROW LEVEL SECURITY;
ALTER TABLE clube_assinaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE profissionais ENABLE ROW LEVEL SECURITY;
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
ALTER TABLE unidades ENABLE ROW LEVEL SECURITY;

-- CLIENTES: Users can see/update only their own row
CREATE POLICY "Clients can view their own data"
ON clientes FOR SELECT
USING (auth.uid() = id::uuid);

CREATE POLICY "Clients can update their own data"
ON clientes FOR UPDATE
USING (auth.uid() = id::uuid);

-- AGENDAMENTOS: Users can see only their own bookings
CREATE POLICY "Clients can view their own bookings"
ON agendamentos FOR SELECT
USING (auth.uid() = cliente_id::uuid);

CREATE POLICY "Clients can insert their own bookings"
ON agendamentos FOR INSERT
WITH CHECK (auth.uid() = cliente_id::uuid);

CREATE POLICY "Clients can update their own bookings"
ON agendamentos FOR UPDATE
USING (auth.uid() = cliente_id::uuid);

CREATE POLICY "Clients can delete their own bookings"
ON agendamentos FOR DELETE
USING (auth.uid() = cliente_id::uuid);

-- ADMINS: Only admins can access
CREATE POLICY "Only admins can view admins table"
ON admins FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can insert"
ON admins FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can update"
ON admins FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can delete"
ON admins FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));

-- HORARIOS_BLOQUEADOS: Only admins can manage
CREATE POLICY "Admins can manage blocked hours"
ON horarios_bloqueados FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can insert blocked hours"
ON horarios_bloqueados FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can update blocked hours"
ON horarios_bloqueados FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can delete blocked hours"
ON horarios_bloqueados FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));

-- CLUBE_ASSINATURAS: Only admins can manage
CREATE POLICY "Admins can view club subscriptions"
ON clube_assinaturas FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can insert club subscriptions"
ON clube_assinaturas FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can update club subscriptions"
ON clube_assinaturas FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can delete club subscriptions"
ON clube_assinaturas FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));

-- PROFISSIONAIS: Public read, admins write
CREATE POLICY "Anyone can view professionals"
ON profissionais FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert professionals"
ON profissionais FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can update professionals"
ON profissionais FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can delete professionals"
ON profissionais FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));

-- PRODUTOS: Public read, admins write
CREATE POLICY "Anyone can view products"
ON produtos FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert products"
ON produtos FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can update products"
ON produtos FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can delete products"
ON produtos FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));

-- UNIDADES: Public read, admins write
CREATE POLICY "Anyone can view units"
ON unidades FOR SELECT
USING (true);

CREATE POLICY "Only admins can insert units"
ON unidades FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can update units"
ON unidades FOR UPDATE
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Only admins can delete units"
ON unidades FOR DELETE
USING (auth.uid() IN (SELECT id FROM admins));
