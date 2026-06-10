import { Typography } from "@mui/material";

export default function Label({
  label,
  required = false,
}: {
  label: string;
  required: boolean;
}) {
  return (
    <Typography
      height="2rem"
      color={"#6C748B"}
      sx={{ pl: "1rem", mb: "0.25rem", fontSize: "0.95rem !important" }}
    >
      {label} {required && "*"}
    </Typography>
  );
}
