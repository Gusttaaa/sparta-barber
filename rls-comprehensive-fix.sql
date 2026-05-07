-- Fix for clube_assinaturas: Allow users to view their own subscriptions
DROP POLICY IF EXISTS "Admins can view club subscriptions" ON clube_assinaturas;

CREATE POLICY "Clients can view their own club subscriptions"
ON clube_assinaturas FOR SELECT
USING (auth.uid() = cliente_id::uuid);

CREATE POLICY "Admins can view all club subscriptions"
ON clube_assinaturas FOR SELECT
USING (auth.uid() IN (SELECT id FROM admins));

-- Fix for agendamentos: Allow admins to INSERT (for admin-created bookings)
CREATE POLICY "Admins can insert bookings"
ON agendamentos FOR INSERT
WITH CHECK (auth.uid() IN (SELECT id FROM admins));

-- Allow non-authenticated users to INSERT (for anonymous bookings) by checking if cliente_id is null
CREATE POLICY "Anyone can insert bookings without client_id"
ON agendamentos FOR INSERT
WITH CHECK (cliente_id IS NULL);
