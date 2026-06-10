import { createTheme, ThemeProvider } from "@mui/material/styles";
import "vazirmatn/misc/UI-Farsi-Digits/Vazirmatn-UI-FD-font-face.css";
import { useI18n } from "../i18n";
// .first - color {
//   background: #323643;
// }
	
// .second - color {
//   background: #606470;
// }

// .third - color {
//   background: #93deff;
// }

// .fourth - color {
//   background: #f7f7f7;
// }
declare module "@mui/material/styles" {
  interface Palette {
    customColor: Palette["primary"];
    customGrey: Palette["primary"];
    iconPrimary?: PaletteOptions["primary"];
    orange: Palette["primary"];
  }

  interface PaletteOptions {
    customColor?: PaletteOptions["primary"];
    customGrey?: PaletteOptions["primary"];
    iconPrimary?: PaletteOptions["primary"];
    orange: Palette["primary"];
  }

  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    iconSize?: {
      medium: number;
      small: number;
      large: number;
      extraLarge: number;
    };
  }
}

export const theme = createTheme({
  direction: 'rtl',
  breakpoints: {},
  palette: {
    primary: {
      main: "#BCBCC6",
      light: "#F1F1F6"
    },

    secondary: {
      dark: "#FADCD9",
      main: "#FFF0DF",
    },
    text: {
      primary: "#323643",
    },
    info: {
      main: "#E6DF44",
    },
    customColor: { main: "B87465" },
    customGrey: {
      main: "#D3D3D3",
    },
    iconPrimary: {
      main: "#555555",
    },
    orange: {
      light: '#f6c23e',
      main: '#ffa900',
      dark: '#f37121',
      contrastText: '#ffa900'
    }
  },
  iconSize: {
    medium: 24,
    small: 16,
    large: 32,
    extraLarge: 44,
  },
  typography: {
    fontFamily: "Vazirmatn UI FD",

  },
  components: {
    // MuiBreadcrumbs: {
    //   defaultProps: {
    //     expandText: 'Show path',
    //   },
    // },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          // height:'100%'
        }
      }
    },

    MuiBreadcrumbs: {
      defaultProps: {
        expandText: "نمایش مسیر",
      },
    },
    MuiTablePagination: {
      defaultProps: {
        getItemAriaLabel: (type) => {
          if (type === "first") {
            return "رفتن به اولین صفحه";
          }
          if (type === "last") {
            return "رفتن به آخرین صفحه";
          }
          if (type === "next") {
            return "رفتن به صفحه‌ی بعدی";
          }
          // if (type === 'previous') {
          return "رفتن به صفحه‌ی قبلی";
        },
        labelRowsPerPage: "تعداد سطرهای هر صفحه:",
        labelDisplayedRows: ({ from, to, count }) =>
          `${from}–${to} از ${count !== -1 ? count : `more than ${to}`}`,
      },
    },
    MuiRating: {
      defaultProps: {
        getLabelText: (value) => `${value} ستاره`,
        emptyLabelText: "خالی",
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        clearText: "پاک‌کردن",
        closeText: "بستن",
        loadingText: "در حال بارگذاری…",
        noOptionsText: "موردی یافت نشد",
        openText: "بازکردن",
      },
    },
    MuiAlert: {
      defaultProps: {
        closeText: "بستن",
      },
    },
    MuiPagination: {
      defaultProps: {
        "aria-label": "ناوبری صفحه",
        getItemAriaLabel: (type, page, selected) => {
          if (type === "page") {
            return `${selected ? "" : "رفتن به "}صفحهٔ ${page}`;
          }
          if (type === "first") {
            return "رفتن به اولین صفحه";
          }
          if (type === "last") {
            return "رفتن به آخرین صفحه";
          }
          if (type === "next") {
            return "رفتن به صفحه‌ی بعدی";
          }
          // if (type === 'previous') {
          return "رفتن به صفحه‌ی قبلی";
        },
      },
    },
  },
});

export default function CustomTheme(props: any) {
  useI18n();
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
