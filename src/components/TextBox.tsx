import { Box, TextField, TextFieldProps } from "@mui/material";
import Label from "./Label";

export function TextBox({
  label,
  ...rest
}: TextFieldProps & { label: string; required: boolean }) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {label && <Label label={label} required={rest.required} />}
      <TextField {...rest} />
    </Box>
  );
}
