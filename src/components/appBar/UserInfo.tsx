import { Avatar, Box, Typography } from "@mui/material";

interface UserInfoProps {
  userInfo: UserInformation;
}

type UserInformation = {
  name: string;
  firstName: string;
  lastName: string;
};

export default function UserInfo({ userInfo }: UserInfoProps) {
  return (
    <Box
      sx={{ display:"flex" , alignItems: "center", }}
    >
      <Typography >
        {`${userInfo.firstName}${" "}${
        userInfo.lastName
      }`}</Typography>
    </Box>
  );
}
