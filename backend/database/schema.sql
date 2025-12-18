CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    password TEXT
);

INSERT INTO users (username, password)
VALUES ('innovino', '$2a$12$uTAqPz8Pe95P9sMgeoU6JOhwDztdIPo/QB6IlvSx0BVrqrPA9HDP6')
ON CONFLICT (username) DO NOTHING;

CREATE TABLE IF NOT EXISTS sessions (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id SERIAL references users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
  );

CREATE TABLE IF NOT EXISTS products (
  -- Seed mock products (zelfde als in ProductOverview.tsx)
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  description TEXT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  category TEXT, -- vul later in of importeer vanuit map
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT products_name_unique UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS cart_items (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (user_id, product_id)
);

INSERT INTO products (id, name, image_url, price, description, category, active)
VALUES
  (1, 'Anijszaad', 'https://placehold.co/400', 5.52, 'Beschikbaar: 6.000 stuks', 'Specerijen', TRUE),
  (2, 'AOSA zeewier sojasaus', 'https://placehold.co/400', 31.00, 'Beschikbaar: 4.000 stuks', 'Sauzen', TRUE),
  (3, 'DOMAINE 2019', 'https://placehold.co/400', 31.23, 'Beschikbaar: 6.000 stuks', 'Wijn', TRUE),
  (4, 'Whisky, New Path Edition', 'https://placehold.co/400', 37.92, 'Beschikbaar: 23.000 stuks', 'Whisky', TRUE)
ON CONFLICT (name) DO NOTHING;
