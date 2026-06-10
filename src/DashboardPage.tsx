
// import React from 'react';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Divider
// } from '@mui/material';
// import {
//   Settings as SystemsIcon,
//   Apps as SubSystemsIcon,
//   ViewModule as ComponentsIcon,
//   TextFields as FieldsIcon,
//   Link as LinkIcon,
//   TrendingUp as StatsIcon
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const StatCard = ({ title, value, icon, color = 'primary' }) => (
//   <Card sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
//     <CardContent sx={{ textAlign: 'center' }}>
//       <Box sx={{ color: `${color}.main`, mb: 2 }}>
//         {icon}
//       </Box>
//       <Typography variant="h4" component="div" gutterBottom>
//         {value}
//       </Typography>
//       <Typography variant="h6" color="text.secondary">
//         {title}
//       </Typography>
//     </CardContent>
//   </Card>
// );

// const QuickAccessItem = ({ text, icon, path, onClick }) => (
//   <ListItem 
//     button 
//     onClick={onClick}
//     sx={{
//       borderRadius: 1,
//       mb: 1,
//       '&:hover': {
//         backgroundColor: 'action.hover',
//       },
//       // راست‌چین کردن آیتم‌های لیست
//       direction: 'rtl',
//       textAlign: 'right'
//     }}
//   >
//     <ListItemIcon
//       sx={{
//         // جابجایی آیکون به سمت راست
//         minWidth: 'auto',
//         marginLeft: 2,
//         marginRight: 0
//       }}
//     >
//       {icon}
//     </ListItemIcon>
//     <ListItemText 
//       primary={text}
//       sx={{
//         textAlign: 'right',
//         marginRight: 1
//       }}
//     />
//   </ListItem>
// );

// export default function DashboardPage() {
//   const navigate = useNavigate();

//   // This would typically come from API
//   const stats = {
//     systems: 12,
//     subsystems: 45,
//     components: 128,
//     fields: 356
//   };

//   const quickAccessItems = [
//     { text: 'مدیریت سیستم‌ها', icon: <SystemsIcon />, path: '/systems' },
//     { text: 'مدیریت زیرسیستم‌ها', icon: <SubSystemsIcon />, path: '/subsystems' },
//     { text: 'مدیریت کامپوننت‌ها', icon: <ComponentsIcon />, path: '/components' },
//     { text: 'مدیریت فیلدها', icon: <FieldsIcon />, path: '/fields' },
//     { text: 'مدیریت فیلدهای کامپوننت', icon: <LinkIcon />, path: '/component-fields' },
//   ];

//   const handleQuickAccess = (path) => {
//     navigate(path);
//   };

//   return (
//     <Box sx={{ direction: 'rtl' }}> {/* اضافه کردن direction: 'rtl' به کل صفحه */}
//       <Typography variant="h4" gutterBottom sx={{ textAlign: 'right' }}>
//         داشبورد مدیریت
//       </Typography>
      
//       <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'right' }}>
//         به پنل مدیریت سیستم خوش آمدید. از اینجا می‌توانید تمام بخش‌های سیستم را مدیریت کنید.
//       </Typography>

//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="سیستم‌ها"
//             value={stats.systems}
//             icon={<SystemsIcon fontSize="large" />}
//             color="primary"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="زیرسیستم‌ها"
//             value={stats.subsystems}
//             icon={<SubSystemsIcon fontSize="large" />}
//             color="secondary"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="کامپوننت‌ها"
//             value={stats.components}
//             icon={<ComponentsIcon fontSize="large" />}
//             color="success"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={3}>
//           <StatCard
//             title="فیلدها"
//             value={stats.fields}
//             icon={<FieldsIcon fontSize="large" />}
//             color="info"
//           />
//         </Grid>
//       </Grid>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={8}>
//           <Paper sx={{ p: 3, direction: 'rtl' }}>
//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
//               آمار اخیر
//             </Typography>
//             <Typography variant="body2" color="text.secondary" paragraph sx={{ textAlign: 'right' }}>
//               اطلاعات آماری سیستم در این بخش نمایش داده می‌شود.
//             </Typography>
//             {/* Add charts or more detailed stats here */}
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={4}>
//           <Paper sx={{ p: 2, direction: 'rtl' }}> {/* اضافه کردن direction: 'rtl' */}
//             <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
//               دسترسی سریع
//             </Typography>
//             <Divider sx={{ mb: 2 }} />
//             <List sx={{ padding: 0 }}>
//               {quickAccessItems.map((item, index) => (
//                 <QuickAccessItem
//                   key={index}
//                   text={item.text}
//                   icon={item.icon}
//                   onClick={() => handleQuickAccess(item.path)}
//                 />
//               ))}
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// pages/Dashboard/DashboardPage.jsx
import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import {
  Settings as SystemsIcon,
  Apps as SubSystemsIcon,
  ViewModule as ComponentsIcon,
  TextFields as FieldsIcon,
  Link as LinkIcon,
  TrendingUp as StatsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color = 'primary' }) => (
  <Card sx={{ height: '100%', cursor: 'pointer', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Box sx={{ color: `${color}.main`, mb: 2 }}>
        {icon}
      </Box>
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
    </CardContent>
  </Card>
);

const QuickAccessItem = ({ text, icon, path, onClick }) => (
  <ListItem 
    button 
    onClick={onClick}
    sx={{
      borderRadius: 1,
      mb: 1,
      '&:hover': {
        backgroundColor: 'action.hover',
      },
      // راست‌چین کردن آیتم‌های لیست
      direction: 'rtl',
      textAlign: 'right'
    }}
  >
    <ListItemIcon
      sx={{
        // جابجایی آیکون به سمت راست
        minWidth: 'auto',
        marginLeft: 2,
        marginRight: 0
      }}
    >
      {icon}
    </ListItemIcon>
    <ListItemText 
      primary={text}
      sx={{
        textAlign: 'right',
        marginRight: 1
      }}
    />
  </ListItem>
);

export default function DashboardPage() {
  const navigate = useNavigate();

  // This would typically come from API
  const stats = {
    systems: 12,
    subsystems: 45,
    components: 128,
    fields: 356
  };

  const quickAccessItems = [
    { text: 'مدیریت سیستم‌ها', icon: <SystemsIcon />, path: '/systems' },
    { text: 'مدیریت زیرسیستم‌ها', icon: <SubSystemsIcon />, path: '/subsystems' },
    { text: 'مدیریت کامپوننت‌ها', icon: <ComponentsIcon />, path: '/components' },
    { text: 'مدیریت فیلدها', icon: <FieldsIcon />, path: '/fields' },
    { text: 'مدیریت فیلدهای کامپوننت', icon: <LinkIcon />, path: '/component-fields' },
  ];

  const handleQuickAccess = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ direction: 'rtl' }}> {/* اضافه کردن direction: 'rtl' به کل صفحه */}
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'right' }}>
        داشبورد مدیریت
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph sx={{ textAlign: 'right' }}>
        به پنل مدیریت سیستم خوش آمدید. از اینجا می‌توانید تمام بخش‌های سیستم را مدیریت کنید.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="سیستم‌ها"
            value={stats.systems}
            icon={<SystemsIcon fontSize="large" />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="زیرسیستم‌ها"
            value={stats.subsystems}
            icon={<SubSystemsIcon fontSize="large" />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="کامپوننت‌ها"
            value={stats.components}
            icon={<ComponentsIcon fontSize="large" />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="فیلدها"
            value={stats.fields}
            icon={<FieldsIcon fontSize="large" />}
            color="info"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, direction: 'rtl' }}>
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
              آمار اخیر
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ textAlign: 'right' }}>
              اطلاعات آماری سیستم در این بخش نمایش داده می‌شود.
            </Typography>
            {/* Add charts or more detailed stats here */}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, direction: 'rtl' }}> {/* اضافه کردن direction: 'rtl' */}
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'right' }}>
              دسترسی سریع
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ padding: 0 }}>
              {quickAccessItems.map((item, index) => (
                <QuickAccessItem
                  key={index}
                  text={item.text}
                  icon={item.icon}
                  onClick={() => handleQuickAccess(item.path)}
                />
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}