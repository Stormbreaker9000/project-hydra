import { neon } from "@neondatabase/serverless";

import { Label, LabelBand, LabelLink, LabelNote, LabelRelease } from "./types";

const sql = neon(process.env.DATABASE_URL || "");

export async function getLabel(labelID: number): Promise<Label | null> {
  const response =
    await sql`SELECT * FROM hydra.labels_comprehensive WHERE label_id = ${labelID}`;
  if (response.length === 1) {
    return response[0] as Label;
  } else {
    return null;
  }
}

export async function getCurrentBands(labelID: number): Promise<LabelBand[]> {
  const response =
    await sql`SELECT * FROM hydra.label_bands WHERE label_id = ${labelID} AND relationship_type = 'current' ORDER BY band_name ASC LIMIT 100;`;
  return response as LabelBand[];
}

export async function getHistoricBands(labelID: number): Promise<LabelBand[]> {
  const response =
    await sql`SELECT * FROM hydra.label_bands WHERE label_id = ${labelID} AND relationship_type = 'historical' ORDER BY band_name ASC LIMIT 100;`;
  return response as LabelBand[];
}

export async function getLabelReleases(labelID: number): Promise<LabelRelease[]> {
  const response =
    await sql`SELECT * FROM hydra.label_releases WHERE label_id = ${labelID} ORDER BY release_year DESC LIMIT 100;`;
  return response as LabelRelease[];
}

export async function getLabelLinks(labelID: number): Promise<LabelLink[]> {
  const response =
    await sql`SELECT * FROM hydra.label_links WHERE label_id = ${labelID} ORDER BY link_name ASC LIMIT 100;`;
  return response as LabelLink[];
}

export async function getLabelNotes(labelID: number): Promise<LabelNote[]> {
  const response =
    await sql`SELECT * FROM hydra.label_notes WHERE label_id = ${labelID} ORDER BY note_title ASC LIMIT 100;`;
  return response as LabelNote[];
}

/**
 * Aggregates all label-related data in a single function with parallel queries
 * for optimal performance using Promise.all
 */
export async function getLabelData(labelID: number) {
  const [label, currentBands, historicBands, releases, links, notes] = await Promise.all([
    getLabel(labelID),
    getCurrentBands(labelID),
    getHistoricBands(labelID),
    getLabelReleases(labelID),
    getLabelLinks(labelID),
    getLabelNotes(labelID),
  ]);

  return {
    label,
    currentBands,
    historicBands,
    releases,
    links,
    notes,
  };
}
