"use client";

import { Box } from "@mui/material";
import { LabelRelease } from "../../_data/types";
import { DataGrid, GridColDef, gridClasses } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "release_name", headerName: "Release Name", flex: 1.5, minWidth: 200 },
  { field: "release_type", headerName: "Release Type", flex: 1, minWidth: 100 },
  { field: "release_year", headerName: "Release Year", flex: 1, minWidth: 100 },
  { field: "catalog", headerName: "Catalog", flex: 1, minWidth: 100 },
  { field: "format", headerName: "Format", flex: 1, minWidth: 100 },
  { field: "description", headerName: "Description", flex: 1, minWidth: 100 },
];

export default function LabelReleases({ releases }: { releases: LabelRelease[] }) {
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={releases.map((release) => ({ ...release }))}
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
          [`& .${gridClasses.root}, & .${gridClasses.cell}`]: {
            outline: "transparent",
          },
          [`& .${gridClasses.root}:focus-within, & .${gridClasses.cell}:focus-within`]: {
            outline: "none",
          },
        }}
      />
    </Box>
  );
}
