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