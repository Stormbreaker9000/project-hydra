"use client";

import { Box } from "@mui/material";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";
import { LabelBand } from "../../_data/types";

const columns: GridColDef[] = [
  { field: "band_name", headerName: "Band Name", flex: 1.5, minWidth: 200 },
  { field: "genre", headerName: "Genre", flex: 1, minWidth: 100 },
  { field: "country", headerName: "Country", flex: 1, minWidth: 100 },
  { field: "num_releases", headerName: "Number of Releases", flex: 1, minWidth: 100 },
];

export default function LabelHistoricBands({ bands }: { bands: LabelBand[] }) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={bands.map((band) => ({ ...band }))}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 50]}
        disableColumnResize
        density="compact"
        slotProps={{
          loadingOverlay: {
            variant: "circular-progress",
            noRowsVariant: "circular-progress",
          },
        }}
        sx={{
          [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
            outline: "transparent",
          },
          [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]: {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
