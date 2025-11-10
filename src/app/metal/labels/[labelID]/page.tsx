import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Label, LabelBand, LabelRelease, LabelLink, LabelNote } from "../_data/types";
import { neon } from "@neondatabase/serverless";
import { Stack } from "@mui/material";
import LabelTitle from "./_components/LabelTitle";
import LabelInfo from "./_components/LabelInfo";
import LabelLocation from "./_components/LabelLocation";
import LabelCurrentBands from "./_components/LabelCurrentBands";
import LabelHistoricBands from "./_components/LabelHistoricBands";
import LabelReleases from "./_components/LabelReleases";
import LabelLinks from "./_components/LabelLinks";
import LabelNotes from "./_components/LabelNotes";
import LabelAudit from "./_components/LabelAudit";
import LabelLogo from "./_components/LabelLogo";
import LabelTableTabs from "./_components/LabelTableTabs";

async function getLabel(labelID: number): Promise<Label | null> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response = await sql`SELECT * FROM hydra.labels_comprehensive WHERE label_id = ${labelID}`;
  if (response.length === 1) {
    return response[0] as Label;
  } else {
    return null;
  }
}

async function getCurrentBands(labelID: number): Promise<LabelBand[]> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response =
    await sql`SELECT * FROM hydra.label_bands WHERE label_id = ${labelID} AND relationship_type = 'current' ORDER BY band_name ASC LIMIT 100;`;
  return response as LabelBand[];
}

async function getHistoricBands(labelID: number): Promise<LabelBand[]> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response =
    await sql`SELECT * FROM hydra.label_bands WHERE label_id = ${labelID} AND relationship_type = 'historical' ORDER BY band_name ASC LIMIT 100;`;
  return response as LabelBand[];
}

async function getLabelReleases(labelID: number): Promise<LabelRelease[]> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response =
    await sql`SELECT * FROM hydra.label_releases WHERE label_id = ${labelID} ORDER BY release_year DESC LIMIT 100;`;
  return response as LabelRelease[];
}

async function getLabelLinks(labelID: number): Promise<LabelLink[]> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response =
    await sql`SELECT * FROM hydra.label_links WHERE label_id = ${labelID} ORDER BY link_name ASC LIMIT 100;`;
  return response as LabelLink[];
}

async function getLabelNotes(labelID: number): Promise<LabelNote[]> {
  const sql = neon(process.env.DATABASE_URL || "");
  const response =
    await sql`SELECT * FROM hydra.label_notes WHERE label_id = ${labelID} ORDER BY note_title ASC LIMIT 100;`;
  return response as LabelNote[];
}

export default async function LabelPage({ params }: { params: Promise<{ labelID: number }> }) {
  const { labelID } = await params;
  const data = await getLabel(labelID);
  const currentBands = await getCurrentBands(labelID);
  const historicBands = await getHistoricBands(labelID);
  const releases = await getLabelReleases(labelID);
  const links = await getLabelLinks(labelID);
  const notes = await getLabelNotes(labelID);

  const tabArray = [
    {
      label: "Current Bands",
      component: <LabelCurrentBands bands={currentBands} />,
    },
    {
      label: "Historic Bands",
      component: <LabelHistoricBands bands={historicBands} />,
    },
    {
      label: "Releases",
      component: <LabelReleases releases={releases} />,
    },
  ];

  if (!data) {
    return <div>Label not found</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Stack
          spacing={1}
          direction="column"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
          }}
        >
          <LabelTitle label={data} />
          <LabelLogo logo_url={data.logo_url} />
          <LabelInfo label={data} />
          <LabelLocation label={data} />
          <LabelTableTabs tabs={tabArray} />
          <LabelLinks links={links} />
          <LabelNotes notes={notes} />
          <LabelAudit label={data} />
        </Stack>
      </Box>
    </Box>
  );
}
