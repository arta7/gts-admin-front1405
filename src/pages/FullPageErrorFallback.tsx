import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function FullPageErrorFallback() {
  const error: any = useRouteError();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  console.error(error);
  return (
    <Box
      role="alert"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>خطایی در سیستم رخ داده است.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Box>
  );
}


