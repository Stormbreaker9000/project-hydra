export type Label = {
    label_id: number;
    name: string;
    specialization: string;
    status: string;
    country: string;
    website: string;
    online_shopping: string;
    logo_url: string;
    email: string;
    website_url: string;
    parent_company: string;
    sub_label: string;
    founded_date: string;
    location: string;
    added_by: string;
    added_on: string;
    modified_by: string;
    modified_on: string;
    scraped_at: string;
    last_updated: string;
}

export type LabelBand = {
    id: number;
    label_id: number;
    band_id: number;
    band_name: string;
    band_url: string;
    genre: string;
    country: string;
    relationship_type: string;
    num_releases: number;
}

export type LabelRelease = {
    id: number;
    label_id: number;
    release_id: string;
    release_name: string;
    release_url: string;
    band_id: string;
    release_type: string;
    release_year: number;
    catalog: string;
    format: string;
    description: string;
}

export type LabelLink = {
    id: number;
    label_id: number;
    link_name: string;
    link_url: string;
}

export type LabelNote = {
    id: number;
    label_id: number;
    note_title: string;
    note_text: string;
}