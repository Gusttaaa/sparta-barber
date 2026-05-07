-- Allow admins to view all data in protected tables
CREATE POLICY "Admins can view all agendamentos"
ON agendamentos FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Admins can view all clube_assinaturas"
ON clube_assinaturas FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

-- Allow anyone to view profissionais, produtos, unidades (already public)
-- but add explicit admin policies for write access (already exist)

-- Allow clients to view their own data in profissionais, produtos if needed
-- (optional - if clients need to see available services/products/units)
