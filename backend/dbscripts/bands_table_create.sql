-- Create bands table for Metal Archives data
CREATE TABLE bands (
    band_id BIGINT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    country VARCHAR(100) NOT NULL,
    genre VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    photo_url TEXT
);

-- Add indexes for common queries
CREATE INDEX idx_bands_name ON bands(name);
CREATE INDEX idx_bands_country ON bands(country);
CREATE INDEX idx_bands_genre ON bands(genre);
CREATE INDEX idx_bands_status ON bands(status);

-- Add comments for documentation
COMMENT ON TABLE bands IS 'Metal Archives band information';
COMMENT ON COLUMN bands.band_id IS 'Unique band identifier from Metal Archives';
COMMENT ON COLUMN bands.name IS 'Band name';
COMMENT ON COLUMN bands.url IS 'Metal Archives URL for the band';
COMMENT ON COLUMN bands.country IS 'Country of origin';
COMMENT ON COLUMN bands.genre IS 'Musical genre(s)';
COMMENT ON COLUMN bands.status IS 'Current status (Active, Split-up, etc.)';
COMMENT ON COLUMN bands.photo_url IS 'URL to band photo (optional)';
