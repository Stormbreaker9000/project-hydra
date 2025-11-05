import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import { LabelLink } from "../../_data/types";

export default function LabelLinks({ links }: { links: LabelLink[] }) {
    return (
        <Card>
            <CardHeader title="Links" />
            <CardContent>
                <Stack spacing={1}>
                    {links.map((link) => (
                        <Typography key={link.id} variant="body1">{`${link.link_name} - ${link.link_url}`}</Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}