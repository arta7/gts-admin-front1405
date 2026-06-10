import { Stack, Typography } from "@mui/material";

export default function Header({ Icon, title }: any) {
    return <Stack direction="row" spacing={2} padding={'1rem'} alignItems={"center"}>
       {Icon &&  <Icon size="32" color="#697689" variant="Bulk" />}
       <Typography variant="h6" >{title}</Typography>
    </Stack>
}