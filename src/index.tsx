// import React, { Suspense } from 'react'
// import ReactDOM from 'react-dom/client'
// import RtlDirection from './contexts/RtlDirection'
// import { CssBaseline } from '@mui/material'
// import CustomTheme from './contexts/ThemeContext'
// import { AuthProvider } from './contexts/AuthContext'
// import { CSRFProvider } from './contexts/CSRFContext'
// import './utils/axios'
// import reportWebVitals from '../reportWebVitals'
// import { HashRouter } from 'react-router-dom'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';

// import App from './App'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'


// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   // <React.StrictMode>
//   // <Suspense fallback="loading ...">
//   //   <CSRFProvider>
//   //     <CssBaseline />
//   //     <ToastContainer rtl={true} position="top-center"/>
//   //       <RtlDirection>
//   //         <CustomTheme>
//   //           <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
//   //             <AuthProvider>
       
//                 <App />
           
//   //             </AuthProvider>
//   //           </LocalizationProvider>
//   //         </CustomTheme>
//   //       </RtlDirection>
//   //   </CSRFProvider>
//   // </Suspense>
//   // </React.StrictMode>,
// )

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()



// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ایمپورت فونت‌های فارسی (Vazir)
import '@fontsource/vazir/300.css';
import '@fontsource/vazir/400.css';
import '@fontsource/vazir/500.css';
import '@fontsource/vazir/700.css';

// ایجاد root و رندر کردن برنامه
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);