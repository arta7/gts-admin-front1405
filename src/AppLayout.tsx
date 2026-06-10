// // layouts/AppLayout.jsx
// import React from 'react';
// import { 
//   Box, 
//   Drawer, 
//   AppBar, 
//   Toolbar, 
//   Typography, 
//   List, 
//   ListItem, 
//   ListItemIcon, 
//   ListItemText, 
//   CssBaseline,
//   IconButton,
//   useTheme,
//   useMediaQuery
// } from '@mui/material';
// import { 
//   Menu as MenuIcon,
//   Dashboard as DashboardIcon,
//   Settings as SettingsIcon,
//   Apps as AppsIcon,
//   ViewModule as ComponentsIcon,
//   TextFields as FieldsIcon,
//   Link as LinkIcon
// } from '@mui/icons-material';
// import { Outlet, useNavigate, useLocation } from 'react-router-dom';

// const drawerWidth = 240;

// const menuItems = [
//   { text: 'داشبورد', icon: <DashboardIcon />, path: '/' },
//   { text: 'سیستم‌ها', icon: <SettingsIcon />, path: '/systems' },
//   { text: 'زیرسیستم‌ها', icon: <AppsIcon />, path: '/subsystems' },
//   { text: 'کامپوننت‌ها', icon: <ComponentsIcon />, path: '/components' },
//   { text: 'فیلدها', icon: <FieldsIcon />, path: '/fields' },
//   { text: 'فیلدهای کامپوننت', icon: <LinkIcon />, path: '/component-fields' },
//   { text: 'اکسل کامپوننت', icon: <ComponentsIcon />, path: '/components/excel-upload' },
// ];

// export default function AppLayout() {
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleMenuClick = (path) => {
//     navigate(path);
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   const drawer = (
//     <div>
//       <Toolbar>
//         <Typography variant="h6" noWrap component="div">
//           سیستم مدیریت
//         </Typography>
//       </Toolbar>
      
//       <List>
//         {menuItems.map((item) => (
//           <ListItem 
//             button 
//             key={item.text}
//             selected={location.pathname === item.path}
//             onClick={() => handleMenuClick(item.path)}
//           >
//             <ListItemIcon>
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
      
//       {/* App Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           ml: { md: `${drawerWidth}px` },
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { md: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             {menuItems.find(item => item.path === location.pathname)?.text || 'سیستم مدیریت'}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Navigation Drawer */}
//       <Box
//         component="nav"
//         sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
//         aria-label="navigation menu"
//       >
//         {/* Mobile drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            
//           }}
          
//         >
//           {drawer}
//         </Drawer>
        
//         {/* Desktop drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* Main content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           minHeight: '100vh',
//           backgroundColor: theme.palette.background.default
//         }}
//       >
//         <Toolbar /> {/* This toolbar pushes content down below the app bar */}
//         <Outlet />
//       </Box>
//     </Box>
//   );
// }


// layouts/AppLayout.jsx
import React from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  CssBaseline,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Settings as SettingsIcon,
  Apps as AppsIcon,
  ViewModule as ComponentsIcon,
  TextFields as FieldsIcon,
  Link as LinkIcon
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const menuItems = [
  { text: 'داشبورد', icon: <DashboardIcon />, path: '/' },
  { text: 'سیستم‌ها', icon: <SettingsIcon />, path: '/systems' },
  { text: 'زیرسیستم‌ها', icon: <AppsIcon />, path: '/subsystems' },
  { text: 'کامپوننت‌ها', icon: <ComponentsIcon />, path: '/components' },
  { text: 'فیلدها', icon: <FieldsIcon />, path: '/fields' },
  { text: 'فیلدهای کامپوننت', icon: <LinkIcon />, path: '/component-designer' },
  { text: 'llm کامپوننت', icon: <ComponentsIcon />, path: '/AiPageGenerator' },
];

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (path) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          سیستم مدیریت
        </Typography>
      </Toolbar>
      
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => handleMenuClick(item.path)}
          >
            <ListItemIcon sx={{ justifyContent: 'center' }}> {/* Center icons in RTL */}
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  // برای RTL، ما نیاز داریم که جهت را به عنصر اصلی اعمال کنیم و موقعیت آیتم‌های ناوبری را جابجا کنیم.
  return (
    // 1. اعمال جهت RTL به Box اصلی
    <Box dir="rtl" sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          // در RTL، ما معمولاً می‌خواهیم نوار کناری در سمت راست باشد، بنابراین عرض از راست محاسبه می‌شود.
          width: { md: `calc(100% - ${drawerWidth}px)` },
          // تغییر ml (margin-left) به mr (margin-right) برای اعمال فاصله از سمت راست در RTL
          mr: { md: `${drawerWidth}px` }, 
          ml: { md: '0px' } // حذف فاصله از چپ
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}> {/* اضافه کردن flexGrow برای تراز کردن درست محتوا */}
            {menuItems.find(item => item.path === location.pathname)?.text || 'سیستم مدیریت'}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end" // تغییر به end برای قرارگیری در سمت چپ (که در RTL معادل راست است)
            onClick={handleDrawerToggle}
            sx={{ ml: 2, display: { md: 'none' }, mr: 0 }} // تغییر mr به ml برای دکمه همبرگری
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="navigation menu"
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                // اطمینان از تراز شدن Drawer در سمت راست در حالت موقت
                right: 0, 
                left: 'auto' 
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                // تنظیم موقعیت Drawer به سمت راست برای RTL
                right: 0, 
                left: 'auto' 
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // اصلاح محاسبه عرض محتوا: اکنون که Drawer در سمت راست است، عرض آن باید از کل کم شود.
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default
        }}
      >
        <Toolbar /> {/* این Toolbar محتوا را پایین می‌آورد */}
        <Outlet />
      </Box>
    </Box>
  );
}
