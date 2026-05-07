-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Clients can view their own data" ON clientes;
DROP POLICY IF EXISTS "Clients can update their own data" ON clientes;
DROP POLICY IF EXISTS "Only admins can view admins table" ON admins;
DROP POLICY IF EXISTS "Only admins can insert" ON admins;
DROP POLICY IF EXISTS "Only admins can update" ON admins;
DROP POLICY IF EXISTS "Only admins can delete" ON admins;
DROP POLICY IF EXISTS "Clients can view their own bookings" ON agendamentos;
DROP POLICY IF EXISTS "Clients can insert their own bookings" ON agendamentos;
DROP POLICY IF EXISTS "Clients can update their own bookings" ON agendamentos;
DROP POLICY IF EXISTS "Clients can delete their own bookings" ON agendamentos;
DROP POLICY IF EXISTS "Admins can view all agendamentos" ON agendamentos;
DROP POLICY IF EXISTS "Admins can manage blocked hours" ON horarios_bloqueados;
DROP POLICY IF EXISTS "Admins can insert blocked hours" ON horarios_bloqueados;
DROP POLICY IF EXISTS "Admins can update blocked hours" ON horarios_bloqueados;
DROP POLICY IF EXISTS "Admins can delete blocked hours" ON horarios_bloqueados;
DROP POLICY IF EXISTS "Admins can view club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Admins can insert club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Admins can update club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Admins can delete club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Anyone can view professionals" ON profissionais;
DROP POLICY IF EXISTS "Only admins can insert professionals" ON profissionais;
DROP POLICY IF EXISTS "Only admins can update professionals" ON profissionais;
DROP POLICY IF EXISTS "Only admins can delete professionals" ON profissionais;
DROP POLICY IF EXISTS "Anyone can view products" ON produtos;
DROP POLICY IF EXISTS "Only admins can insert products" ON produtos;
DROP POLICY IF EXISTS "Only admins can update products" ON produtos;
DROP POLICY IF EXISTS "Only admins can delete products" ON produtos;
DROP POLICY IF EXISTS "Anyone can view units" ON unidades;
DROP POLICY IF EXISTS "Only admins can insert units" ON unidades;
DROP POLICY IF EXISTS "Only admins can update units" ON unidades;
DROP POLICY IF EXISTS "Only admins can delete units" ON unidades;
DROP POLICY IF EXISTS "Clients can view their own club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Admins can view all club subscriptions" ON clube_assinaturas;
DROP POLICY IF EXISTS "Admins can insert bookings" ON agendamentos;
DROP POLICY IF EXISTS "Anyone can insert bookings without client_id" ON agendamentos;

-- ===== ADMINS TABLE =====
CREATE POLICY "admin ve proprio status"
ON admins FOR SELECT
USING (auth.uid() = id);

-- ===== AGENDAMENTOS TABLE =====
CREATE POLICY "leitura publica"
ON agendamentos FOR SELECT
USING (true);

CREATE POLICY "insercao publica"
ON agendamentos FOR INSERT
WITH CHECK (true);

CREATE POLICY "admin atualiza agendamentos"
ON agendamentos FOR UPDATE
USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- ===== CLIENTES TABLE =====
CREATE POLICY "ver proprio perfil"
ON clientes FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "editar proprio perfil"
ON clientes FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "criar proprio perfil"
ON clientes FOR INSERT
WITH CHECK (auth.uid() = id);

-- ===== CLUBE_ASSINATURAS TABLE =====
CREATE POLICY "ver propria assinatura"
ON clube_assinaturas FOR SELECT
USING (cliente_id = auth.uid());

-- ===== HORARIOS_BLOQUEADOS TABLE =====
CREATE POLICY "leitura_publica"
ON horarios_bloqueados FOR SELECT
USING (true);

CREATE POLICY "escrita_livre"
ON horarios_bloqueados FOR INSERT
WITH CHECK (true);

CREATE POLICY "escrita_livre_update"
ON horarios_bloqueados FOR UPDATE
WITH CHECK (true);

CREATE POLICY "escrita_livre_delete"
ON horarios_bloqueados FOR DELETE
USING (true);

-- ===== PROFISSIONAIS TABLE =====
CREATE POLICY "leitura publica profissionais"
ON profissionais FOR SELECT
USING (true);

CREATE POLICY "admin escreve profissionais"
ON profissionais FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "admin atualiza profissionais"
ON profissionais FOR UPDATE
USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "admin deleta profissionais"
ON profissionais FOR DELETE
USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

-- ===== PRODUTOS TABLE =====
CREATE POLICY "produtos_leitura_publica"
ON produtos FOR SELECT
USING (ativo = true);

CREATE POLICY "produtos_escrita_admin"
ON produtos FOR INSERT
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "produtos_atualiza_admin"
ON produtos FOR UPDATE
WITH CHECK (auth.role() = 'authenticated'::text);

CREATE POLICY "produtos_deleta_admin"
ON produtos FOR DELETE
USING (auth.role() = 'authenticated'::text);

-- ===== UNIDADES TABLE =====
CREATE POLICY "leitura publica unidades"
ON unidades FOR SELECT
USING (true);

CREATE POLICY "admin escreve unidades"
ON unidades FOR INSERT
WITH CHECK (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "admin atualiza unidades"
ON unidades FOR UPDATE
USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));

CREATE POLICY "admin deleta unidades"
ON unidades FOR DELETE
USING (EXISTS (SELECT 1 FROM admins WHERE admins.id = auth.uid()));
