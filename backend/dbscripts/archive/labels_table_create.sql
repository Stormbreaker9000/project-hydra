-- Create labels table for Metal Archives data
CREATE TABLE labels (
    label_id INTEGER NOT NULL,
    band_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    specialization VARCHAR(255),
    status VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    website TEXT,
    online_shopping VARCHAR(10),
    PRIMARY KEY (label_id, band_id),
    FOREIGN KEY (band_id) REFERENCES bands(band_id) ON DELETE CASCADE
);

-- Add indexes for common queries
CREATE INDEX idx_labels_label_id ON labels(label_id);
CREATE INDEX idx_labels_band_id ON labels(band_id);
CREATE INDEX idx_labels_name ON labels(name);
CREATE INDEX idx_labels_country ON labels(country);
CREATE INDEX idx_labels_status ON labels(status);
CREATE INDEX idx_labels_specialization ON labels(specialization);

-- Add comments for documentation
COMMENT ON TABLE labels IS 'Metal Archives label information and band-label relationships';
COMMENT ON COLUMN labels.label_id IS 'Label identifier from Metal Archives';
COMMENT ON COLUMN labels.band_id IS 'Foreign key reference to bands table';
COMMENT ON COLUMN labels.name IS 'Label name';
COMMENT ON COLUMN labels.specialization IS 'Label specialization (e.g., Heavy Metal)';
COMMENT ON COLUMN labels.status IS 'Label status (active, closed, etc.)';
COMMENT ON COLUMN labels.country IS 'Country where label is based';
COMMENT ON COLUMN labels.website IS 'Label website URL (optional)';
COMMENT ON COLUMN labels.online_shopping IS 'Whether label offers online shopping (Yes/No)';
