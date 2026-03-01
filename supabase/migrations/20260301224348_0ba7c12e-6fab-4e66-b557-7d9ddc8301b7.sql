INSERT INTO app_config (key, value, description) VALUES 
('parent_monthly_price', '29.9', 'מחיר מנוי חודשי להורים'),
('parent_yearly_price', '299', 'מחיר מנוי שנתי להורים'),
('sitter_monthly_price', '39.9', 'מחיר מנוי חודשי לבייביסיטר'),
('sitter_yearly_price', '399', 'מחיר מנוי שנתי לבייביסיטר')
ON CONFLICT (key) DO NOTHING;

-- Allow public read access to pricing config keys
CREATE POLICY "Anyone can read pricing config"
ON public.app_config
FOR SELECT
USING (key IN ('parent_monthly_price', 'parent_yearly_price', 'sitter_monthly_price', 'sitter_yearly_price', 'subscription_monthly_price', 'subscription_yearly_discount'));