CREATE OR REPLACE FUNCTION public.add_product_category(
  category_name TEXT
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  -- This is a workaround because you cannot use parameters directly
  -- in ALTER TYPE ... ADD VALUE.
  -- We use dynamic SQL with format() and %L to quote the literal,
  -- which prevents SQL injection and makes this operation safe.
  EXECUTE format('ALTER TYPE public.product_category ADD VALUE IF NOT EXISTS %L', category_name);
END;
$$;
