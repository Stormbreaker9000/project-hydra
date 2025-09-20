-- Create albums table for Metal Archives data
CREATE TABLE albums (
    album_id SERIAL PRIMARY KEY,
    album_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    reviews TEXT,
    band_id BIGINT NOT NULL,
    FOREIGN KEY (band_id) REFERENCES bands(band_id) ON DELETE CASCADE
);

-- Add indexes for common queries
CREATE INDEX idx_albums_band_id ON albums(band_id);
CREATE INDEX idx_albums_year ON albums(year);
CREATE INDEX idx_albums_type ON albums(type);
CREATE INDEX idx_albums_name ON albums(album_name);

-- Add comments for documentation
COMMENT ON TABLE albums IS 'Metal Archives album information';
COMMENT ON COLUMN albums.album_id IS 'Auto-generated unique album identifier';
COMMENT ON COLUMN albums.album_name IS 'Album name';
COMMENT ON COLUMN albums.type IS 'Album type (EP, Single, Full-length, etc.)';
COMMENT ON COLUMN albums.year IS 'Release year';
COMMENT ON COLUMN albums.reviews IS 'Review information (e.g., "1 (77%)" or "No Reviews")';
COMMENT ON COLUMN albums.band_id IS 'Foreign key reference to bands table';
