"use client";

import { useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box, Typography, Paper, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Default Mapbox token - should be set via environment variable in production
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "bogus token"; // Public demo token

interface MapBoxTestProps {
  mapboxToken?: string;
}

export default function MapBoxTest({ mapboxToken }: MapBoxTestProps) {
  const [viewState, setViewState] = useState<ViewState>({
    longitude: -122.4194,
    latitude: 37.7749,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    padding: { top: 0, left: 0, bottom: 0, right: 0 },
  });

  const token = mapboxToken || MAPBOX_TOKEN;

  // Sample markers
  const markers = [
    { id: 1, longitude: -122.4194, latitude: 37.7749, label: "San Francisco" },
    { id: 2, longitude: -122.4094, latitude: 37.7849, label: "Marker 2" },
    { id: 3, longitude: -122.4294, latitude: 37.7649, label: "Marker 3" },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        height: "600px",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h4" component="h2">
          React Map GL Test
        </Typography>
        <Chip label={`Zoom: ${viewState.zoom.toFixed(2)}`} size="small" color="primary" />
      </Box>
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Map
          {...viewState}
          onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
          mapboxAccessToken={token}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          {/* Markers */}
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              longitude={marker.longitude}
              latitude={marker.latitude}
              anchor="bottom"
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <LocationOnIcon sx={{ color: "primary.main", fontSize: 40 }} />
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: "background.paper",
                    px: 0.5,
                    borderRadius: 0.5,
                    mt: -1,
                  }}
                >
                  {marker.label}
                </Typography>
              </Box>
            </Marker>
          ))}

          {/* Controls */}
          <NavigationControl position="top-left" />
          <FullscreenControl position="top-right" />
          <GeolocateControl position="top-right" />
        </Map>
      </Paper>
      <Typography variant="body2" color="text.secondary">
        Drag to pan, scroll to zoom. Click markers to interact.
      </Typography>
    </Box>
  );
}
