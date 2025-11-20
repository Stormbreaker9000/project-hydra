import { Box, Grid, Stack } from "@mui/material";

import { getLabelData } from "../_data/label-data";
import LabelAudit from "./_components/LabelAudit";
import LabelCurrentBands from "./_components/LabelCurrentBands";
import LabelHistoricBands from "./_components/LabelHistoricBands";
import LabelInfo from "./_components/LabelInfo";
import LabelLinks from "./_components/LabelLinks";
import LabelLocation from "./_components/LabelLocation";
import LabelLogo from "./_components/LabelLogo";
import LabelNotes from "./_components/LabelNotes";
import LabelReleases from "./_components/LabelReleases";
import LabelTableTabs from "./_components/LabelTableTabs";
import LabelTitle from "./_components/LabelTitle";

export default async function LabelPage({ params }: { params: Promise<{ labelID: number }> }) {
  const { labelID } = await params;
  const { label, currentBands, historicBands, releases, links, notes } =
    await getLabelData(labelID);

  if (!label) {
    return <div>Label not found</div>;
  }

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
        <Grid container spacing={2}>
          <Grid
            size={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LabelTitle label={label} />
          </Grid>
          <Grid size={6}>
            <LabelInfo label={label} />
          </Grid>
          <Grid size={6}>
            <LabelLogo logo_url={label.logo_url} />
          </Grid>
          <Grid size={12}>
            <LabelLocation label={label} />
          </Grid>
          <Grid size={12}>
            <LabelTableTabs tabs={tabArray} />
          </Grid>
          <Grid size={12}>
            <LabelLinks links={links} />
          </Grid>
          <Grid size={12}>
            <LabelNotes notes={notes} />
          </Grid>
          <Grid size={12}>
            <LabelAudit label={label} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
