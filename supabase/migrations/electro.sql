-- =====================================================
-- EXTENSION UUID
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUM : app_role (CORRECTION SUPABASE)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'app_role'
  ) THEN
    CREATE TYPE public.app_role AS ENUM ('user', 'admin');
  END IF;
END
$$;

-- =====================================================
-- TABLE : product_categories
-- =====================================================
CREATE TABLE IF NOT EXISTS public.product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text UNIQUE NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- TABLE : products
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL CHECK (price >= 0),
  promo_price integer CHECK (promo_price >= 0),
  promo_active boolean NOT NULL DEFAULT false,
  image_url text NOT NULL,
  category_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT products_category_fk
    FOREIGN KEY (category_id)
    REFERENCES public.product_categories(id)
    ON DELETE RESTRICT
);

-- =====================================================
-- TABLE : settings
-- =====================================================
CREATE TABLE IF NOT EXISTS public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_name text NOT NULL,
  logo_url text NOT NULL,
  whatsapp_number text NOT NULL,
  presentation_video_url text NOT NULL,
  primary_color text NOT NULL DEFAULT '#1E90FF',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- =====================================================
-- TABLE : user_roles
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL DEFAULT 'user',

  CONSTRAINT user_roles_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);

-- =====================================================
-- TRIGGER updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- =====================================================
-- SEED : catégories électroménager
-- =====================================================
INSERT INTO public.product_categories (label) VALUES
('Réfrigérateurs & Congélateurs'),
('Lave-linge & Sèche-linge'),
('Cuisinières & Fours'),
('Micro-ondes'),
('Climatiseurs & Ventilateurs'),
('Aspirateurs & Nettoyeurs'),
('Petits appareils de cuisine'),
('Téléviseurs & Multimédia'),
('Fer à repasser & Entretien'),
('Distributeurs d’eau'),
('Générateurs & Onduleurs'),
('Accessoires électroménagers')
ON CONFLICT DO NOTHING;

-- =====================================================
-- SEED : settings par défaut
-- =====================================================
INSERT INTO public.settings (
  shop_name,
  logo_url,
  whatsapp_number,
  presentation_video_url
)
SELECT
  'ElectroShop',
  'https://example.com/logo.png',
  '+22890000000',
  'https://youtube.com/video'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES : PUBLIC
-- =====================================================
CREATE POLICY "Public read products"
ON public.products
FOR SELECT
USING (true);

CREATE POLICY "Public read categories"
ON public.product_categories
FOR SELECT
USING (active = true);

CREATE POLICY "Public read settings"
ON public.settings
FOR SELECT
USING (true);

-- =====================================================
-- POLICIES : ADMIN
-- =====================================================
CREATE POLICY "Admin manage products"
ON public.products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Admin manage categories"
ON public.product_categories
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

CREATE POLICY "Admin manage settings"
ON public.settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- =====================================================
-- POLICIES : user_roles
-- =====================================================
CREATE POLICY "User read own role"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

-- =====================================================
-- FIN
-- =====================================================
