// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import AuthenticatedApp from './AuthenticatedApp';
// import Spinner from './components/spinner/Spinner';
// import { useAuth } from './contexts/AuthContext';
// import { Login } from './pages';
// import BasicLogin from './pages/auth/BasicLoginForm';
// import { LoginConfig } from './pages/auth/LoginConfigForm';
// import baseUrl from './utils/Util';

// export default function App() {
//   const { isAuthenticated, isInitialized } = useAuth();
//   const [loginConfig, setLoginConfig] = useState<LoginConfig>();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios.get(`/gts/v1/api/base/login-page-info/fetch`).then((res) => {
//       const result: any = res.data.result;
//       console.log('login page info',result)
//       if (result && result.length) {
//         setLoginConfig(res.data.result[0]);
//       }
//       setLoading(false);
//     }).catch(() => {
//       toast.error("! دریافت تنظیمات لاگین با خطا مواجه شد");
//       setLoading(false);
//     })
//   }, []);

//   if (!isAuthenticated && isInitialized) {
//     if (!loading) {
//       if (loginConfig) {
//         return <Login config={loginConfig} />;
//       }
//       else {
//         return <BasicLogin />;
//       }
//     }
//     return <Spinner />
//   }

//   return <AuthenticatedApp />
// }


// App.jsx
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { faIR } from '@mui/material/locale';
import AppRoutes from './AppRoutes';

const theme = createTheme(
  {
    direction: 'rtl',
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: '"Vazir", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  },
  faIR
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;