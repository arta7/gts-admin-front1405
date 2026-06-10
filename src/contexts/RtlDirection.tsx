import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "vazirmatn/Vazirmatn-font-face.css";
import rtlPlugin from "stylis-plugin-rtl";

//@ts-ignore
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn",
  },
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

interface RtlDirection {
  children: React.ReactNode;
}

export default function RtlDirection({ children }: RtlDirection) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
