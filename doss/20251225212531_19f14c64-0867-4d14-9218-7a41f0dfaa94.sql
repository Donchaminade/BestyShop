-- =====================================================
-- EXTENSION UUID
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- ENUM : app_role
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
-- ENUM : product_category (ElectroSmart)
-- =====================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'product_category'
  ) THEN
    CREATE TYPE public.product_category AS ENUM (
      'Réfrigérateurs & Congélateurs',
      'Lave-linge & Sèche-linge',
      'Cuisinières & Fours',
      'Micro-ondes',
      'Climatiseurs & Ventilateurs',
      'Aspirateurs & Nettoyeurs',
      'Petits appareils de cuisine',
      'Téléviseurs & Multimédia',
      'Fer à repasser & Entretien',
      'Distributeurs d’eau',
      'Générateurs & Onduleurs',
      'Accessoires électroménagers'
    );
  END IF;
END
$$;

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
  category public.product_category NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
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
  user_id uuid NOT NULL UNIQUE,
  role public.app_role NOT NULL DEFAULT 'user',

  CONSTRAINT user_roles_user_fk
    FOREIGN KEY (user_id)
    REFERENCES auth.users(id)
    ON DELETE CASCADE
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at);
CREATE INDEX IF NOT EXISTS idx_user_roles_user ON public.user_roles(user_id);

-- =====================================================
-- TRIGGER : updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_settings_updated_at ON public.settings;
CREATE TRIGGER trg_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

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
  'ElectroSmart',
  'https://example.com/logo.png',
  '+22890000000',
  'https://youtube.com/video'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- =====================================================
-- RLS
-- =====================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- POLICIES : PUBLIC
-- =====================================================
DROP POLICY IF EXISTS "Public read products" ON public.products;
CREATE POLICY "Public read products"
ON public.products
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Public read settings" ON public.settings;
CREATE POLICY "Public read settings"
ON public.settings
FOR SELECT
USING (true);

-- =====================================================
-- POLICIES : ADMIN
-- =====================================================
DROP POLICY IF EXISTS "Admin manage products" ON public.products;
CREATE POLICY "Admin manage products"
ON public.products
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

DROP POLICY IF EXISTS "Admin manage settings" ON public.settings;
CREATE POLICY "Admin manage settings"
ON public.settings
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- =====================================================
-- POLICIES : user_roles
-- =====================================================
DROP POLICY IF EXISTS "User read own role" ON public.user_roles;
CREATE POLICY "User read own role"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Admin manage roles" ON public.user_roles;
CREATE POLICY "Admin manage roles"
ON public.user_roles
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  )
);

-- =====================================================
-- FIN
-- =====================================================
