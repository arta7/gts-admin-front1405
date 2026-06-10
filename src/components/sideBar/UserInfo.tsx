import { Avatar, Box, Typography } from "@mui/material";

interface UserInfoProps {
  userInfo: UserInformation;
  open: boolean;
}

type UserInformation = {
  name: string;
  firstName: string;
  lastName: string;
};

export default function UserInfo({ userInfo, open }: UserInfoProps) {
  return (
    <Box
      sx={{ display: open ? "flex" : "none", alignItems: "center", p: "1rem" }}
    >
      <Typography variant="h6">{`${userInfo.firstName}${" "}${
        userInfo.lastName
      }`}</Typography>
    </Box>
  );
}
