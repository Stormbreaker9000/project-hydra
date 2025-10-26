import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { LabelBand } from "../../_data/types";

export default function LabelHistoricBands({ bands }: { bands: LabelBand[] }) {
    return (
        <Card>
            <CardHeader title="Historic Bands" />
            <CardContent>
                <Stack spacing={1}>
                    {bands.map((band) => (
                        <Typography key={band.id} variant="body1">{`${band.band_name} - ${band.genre} - ${band.country}`}</Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}