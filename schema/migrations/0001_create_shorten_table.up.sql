CREATE TABLE IF NOT EXISTS shorten_urls (
    id SERIAL PRIMARY KEY,
    alias TEXT NOT NULL UNIQUE,
    url TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_alias ON shorten_urls(alias);
