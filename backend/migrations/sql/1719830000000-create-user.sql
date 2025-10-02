-- 1) Type ENUM pour le rôle
CREATE TYPE user_role AS ENUM ('admin', 'citoyen', 'policier', 'analyste');

-- 2) Table users
CREATE TABLE users (
  id          BIGSERIAL PRIMARY KEY,
  nom         VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  -- bcrypt fait ~60 caractères, on laisse 255 pour marge
  password    VARCHAR(255),             -- NULL autorisé
  role        user_role NOT NULL,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) (Optionnel) validation légère email côté DB
-- ALTER TABLE users ADD CONSTRAINT email_format_chk
--   CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$');

-- 4) Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- DROP TRIGGER IF EXISTS trg_users_updated_at ON users;
-- DROP FUNCTION IF EXISTS set_updated_at();

-- DROP TABLE IF EXISTS users;

-- DROP TYPE IF EXISTS user_role;
