-- Ajout de nouvelles catégories de produits alimentaires raffinées à l'ENUM existant
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Farines bio';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Céréales bio';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Légumineuses bio';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Plantes et fleurs pour boissons naturelles';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Épices et condiments bio';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Racines et tubercules transformés';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Fruits séchés et dérivés';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Produits de cueillette traditionnelle';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Huiles végétales bio';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Sucres et édulcorants naturels';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Produits bien-être naturels';
ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS 'Produits cosmétiques naturels bio';

-- Note: Les anciennes catégories qui ne sont plus dans cette liste ne seront pas supprimées de l'ENUM
-- car cette opération est complexe et risquée. Elles n'apparaîtront cependant plus dans l'interface.
