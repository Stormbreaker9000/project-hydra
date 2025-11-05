import { Typography } from "@mui/material";
import { Label } from "../../_data/types";

export default function LabelTitle({ label }: { label: Label }) {
    return (
        <Typography variant="h1">{label.name}</Typography>
    )
}