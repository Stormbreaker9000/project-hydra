import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { LabelRelease } from "../../_data/types";

export default function LabelReleases({ releases }: { releases: LabelRelease[] }) {
    return (
        <Card>
            <CardHeader title="Releases" />
            <CardContent>
                <Stack spacing={1}>
                    {releases.map((release) => (
                        <Typography key={release.id} variant="body1">{`${release.release_name} - ${release.release_type} - ${release.release_year} - ${release.catalog} - ${release.format} - ${release.description}`}</Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}