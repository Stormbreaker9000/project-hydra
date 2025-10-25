-- Create unified labels table for Metal Archives scraped data
-- This table stores all the information collected by the Python scraper

CREATE TABLE hydra.labels_comprehensive (
    -- Primary identifier

    label_id BIGINT PRIMARY KEY,
    
    -- Basic label information (from dt/dd elements)
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    status VARCHAR(50),
    country VARCHAR(100),
    founded_date DATE,
    location VARCHAR(255),
    parent_company VARCHAR(255),
    sub_label VARCHAR(255),
    
    -- Contact and web presence
    logo_url TEXT,
    email VARCHAR(255),
    website_url TEXT,
    online_shopping VARCHAR(10),
    
    -- Audit trail information
    added_by VARCHAR(255),
    added_on TIMESTAMP,
    modified_by VARCHAR(255),
    modified_on TIMESTAMP,
    
    -- Metadata
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)


-- Create unified table for all band-label relationships
CREATE TABLE hydra.label_bands (
    id SERIAL PRIMARY KEY,
    label_id BIGINT NOT NULL,
    band_id VARCHAR(50) NOT NULL,
    band_name VARCHAR(255) NOT NULL,
    band_url TEXT NOT NULL,
    genre VARCHAR(255),
    country VARCHAR(100),
    relationship_type VARCHAR(20) NOT NULL DEFAULT 'current', -- 'current' or 'historical'
    num_releases INTEGER, -- Only populated for historical bands
    
    FOREIGN KEY (label_id) REFERENCES hydra.labels_comprehensive(label_id) ON DELETE CASCADE,
    
    -- Ensure unique band-label combinations per relationship type
    UNIQUE(label_id, band_id, relationship_type)
);

-- Create table for label releases (if needed in the future)

CREATE TABLE hydra.label_releases (
    id SERIAL PRIMARY KEY,
    label_id BIGINT NOT NULL,
    release_id VARCHAR(50) NOT NULL,
    release_name VARCHAR(255) NOT NULL,
    release_url TEXT NOT NULL,
    band_id VARCHAR(50) NOT NULL,
    release_type VARCHAR(100) NOT NULL,
    release_year INTEGER NOT NULL,
    catalog VARCHAR(255) NOT NULL,
    format VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    -- TODO: Add foreign key constraint for band_id once the bands table is created
    -- FOREIGN KEY (band_id) REFERENCES hydra.bands(band_id) ON DELETE CASCADE,
    FOREIGN KEY (label_id) REFERENCES hydra.labels_comprehensive(label_id) ON DELETE CASCADE,
    UNIQUE(label_id, release_id)
);

CREATE TABLE hydra.label_links (
    id SERIAL PRIMARY KEY,
    label_id BIGINT NOT NULL,
    link_name VARCHAR(255) NOT NULL,
    link_url TEXT NOT NULL,
    FOREIGN KEY (label_id) REFERENCES hydra.labels_comprehensive(label_id) ON DELETE CASCADE,
    UNIQUE(label_id, link_name)
);

CREATE TABLE hydra.label_notes (
    id SERIAL PRIMARY KEY,
    label_id BIGINT NOT NULL,
    note_title VARCHAR(255) NOT NULL,
    note_text TEXT NOT NULL,
    FOREIGN KEY (label_id) REFERENCES hydra.labels_comprehensive(label_id) ON DELETE CASCADE,
    UNIQUE(label_id, note_title)
);

CREATE INDEX idx_label_releases_label_id ON hydra.label_releases(label_id);
CREATE INDEX idx_label_releases_release_id ON hydra.label_releases(release_id);
CREATE INDEX idx_label_releases_release_year ON hydra.label_releases(release_year);

CREATE INDEX idx_label_links_label_id ON hydra.label_links(label_id);
CREATE INDEX idx_label_notes_label_id ON hydra.label_notes(label_id);

-- Add comments for documentation
COMMENT ON TABLE hydra.labels_comprehensive IS 'Comprehensive label information scraped from Metal Archives';
COMMENT ON TABLE hydra.label_bands IS 'All band-label relationships (current and historical)';
COMMENT ON TABLE hydra.label_releases IS 'Releases associated with each label';
COMMENT ON TABLE hydra.label_links IS 'Links associated with each label';
COMMENT ON TABLE hydra.label_notes IS 'Notes associated with each label';
-- Add column comments
COMMENT ON COLUMN hydra.labels_comprehensive.label_id IS 'Primary key for label';
COMMENT ON COLUMN hydra.labels_comprehensive.name IS 'Label name';
COMMENT ON COLUMN hydra.labels_comprehensive.specialization IS 'Label specialization (e.g., Heavy Metal)';
COMMENT ON COLUMN hydra.labels_comprehensive.status IS 'Label status (active, closed, etc.)';
COMMENT ON COLUMN hydra.labels_comprehensive.country IS 'Country where label is based';
COMMENT ON COLUMN hydra.labels_comprehensive.founded_date IS 'Year the label was founded';
COMMENT ON COLUMN hydra.labels_comprehensive.location IS 'Physical location of the label';
COMMENT ON COLUMN hydra.labels_comprehensive.parent_company IS 'Parent company if applicable';
COMMENT ON COLUMN hydra.labels_comprehensive.logo_url IS 'URL to label logo image';
COMMENT ON COLUMN hydra.labels_comprehensive.email IS 'Label contact email';
COMMENT ON COLUMN hydra.labels_comprehensive.website_url IS 'Label website URL';
COMMENT ON COLUMN hydra.labels_comprehensive.online_shopping IS 'Whether label offers online shopping (Yes/No)';
COMMENT ON COLUMN hydra.labels_comprehensive.added_by IS 'User who added the label to Metal Archives';
COMMENT ON COLUMN hydra.labels_comprehensive.added_on IS 'Date when label was added to Metal Archives';
COMMENT ON COLUMN hydra.labels_comprehensive.modified_by IS 'User who last modified the label';
COMMENT ON COLUMN hydra.labels_comprehensive.modified_on IS 'Date when label was last modified';
COMMENT ON COLUMN hydra.labels_comprehensive.scraped_at IS 'When this data was scraped';
COMMENT ON COLUMN hydra.labels_comprehensive.last_updated IS 'When this record was last updated';

COMMENT ON COLUMN hydra.label_bands.band_id IS 'Metal Archives band ID';
COMMENT ON COLUMN hydra.label_bands.band_name IS 'Band name';
COMMENT ON COLUMN hydra.label_bands.band_url IS 'Metal Archives band URL';
COMMENT ON COLUMN hydra.label_bands.genre IS 'Band genre';
COMMENT ON COLUMN hydra.label_bands.country IS 'Band country';
COMMENT ON COLUMN hydra.label_bands.relationship_type IS 'Type of relationship: current or historical';
COMMENT ON COLUMN hydra.label_bands.num_releases IS 'Number of releases by this band on this label (only for historical bands)';

COMMENT ON COLUMN hydra.label_releases.release_id IS 'Metal Archives release ID';
COMMENT ON COLUMN hydra.label_releases.release_name IS 'Release name';
COMMENT ON COLUMN hydra.label_releases.release_url IS 'Metal Archives release URL';
COMMENT ON COLUMN hydra.label_releases.band_id IS 'Metal Archives band ID';
COMMENT ON COLUMN hydra.label_releases.release_type IS 'Release type';
COMMENT ON COLUMN hydra.label_releases.release_year IS 'Release year';
COMMENT ON COLUMN hydra.label_releases.catalog IS 'Catalog';
COMMENT ON COLUMN hydra.label_releases.format IS 'Format';
COMMENT ON COLUMN hydra.label_releases.description IS 'Description';

COMMENT ON COLUMN hydra.label_links.link_name IS 'Link name';
COMMENT ON COLUMN hydra.label_links.link_url IS 'Link URL';
COMMENT ON COLUMN hydra.label_notes.note_title IS 'Note title';
COMMENT ON COLUMN hydra.label_notes.note_text IS 'Note text';

-- Example queries for the unified approach:

-- Get all bands for a label
-- SELECT * FROM label_bands WHERE label_id = ?;

-- Get only current bands for a label
-- SELECT * FROM label_bands WHERE label_id = ? AND relationship_type = 'current';

-- Get only historical bands for a label
-- SELECT * FROM label_bands WHERE label_id = ? AND relationship_type = 'historical';

-- Get bands that moved from current to historical (useful for analytics)
-- SELECT band_id, band_name, 
--        MAX(CASE WHEN relationship_type = 'current' THEN 1 ELSE 0 END) as was_current,
--        MAX(CASE WHEN relationship_type = 'historical' THEN 1 ELSE 0 END) as is_historical
-- FROM label_bands 
-- WHERE label_id = ? 
-- GROUP BY band_id, band_name
-- HAVING was_current = 1 AND is_historical = 1;
