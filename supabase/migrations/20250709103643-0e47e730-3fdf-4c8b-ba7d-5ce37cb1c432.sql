-- STEP 1: Create ENUM for organization types
DO $$ BEGIN
    CREATE TYPE public.organization_type AS ENUM (
        'enterprise_bank',
        'small_financial_institution',
        'credit_union',
        'fintech_startup',
        'payment_processor',
        'regulatory_body'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- STEP 2: Create ENUM for organization sizes
DO $$ BEGIN
    CREATE TYPE public.organization_size AS ENUM (
        'small',
        'medium',
        'large',
        'enterprise'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- STEP 3: Add 'organization_type' to 'profiles' table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS organization_type public.organization_type DEFAULT 'small_financial_institution';

-- STEP 4: Add 'organization_size' to 'profiles' table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS organization_size public.organization_size DEFAULT 'small';

-- STEP 5: Index for performance on organization_type
CREATE INDEX IF NOT EXISTS idx_profiles_organization_type ON public.profiles(organization_type);

-- STEP 6: Index for performance on organization_size
CREATE INDEX IF NOT EXISTS idx_profiles_organization_size ON public.profiles(organization_size);

-- STEP 7 (Optional): Comment for documentation
COMMENT ON COLUMN public.profiles.organization_type IS 'Defines the type of organization: bank, fintech, etc.';
COMMENT ON COLUMN public.profiles.organization_size IS 'Categorizes the organization by scale for feature management.';