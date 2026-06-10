// import React, { useState } from "react";
// import axios from './axiosConfig';

// import {
//   Button,
//   TextField,
//   Typography,
//   CircularProgress,
//   Card,
//   Grid,
//   Alert,
//   Stack,
//   Chip,
//   Snackbar,
//   Box
// } from "@mui/material";

// import SmartToyIcon from "@mui/icons-material/SmartToy";
// import BoltIcon from "@mui/icons-material/Bolt";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// interface GenerationResult {
//   success: boolean;
//   message: string;
//   data: {
//     componentId: number;
//     componentName: string;
//     caption: string;
//     routPath: string;
//     tableName: string;
//     fields: number;
//     componentFields: number;
//   };
// }

// const AiPageGenerator: React.FC = () => {
//   const [prompt, setPrompt] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<GenerationResult | null>(null);
//   const [snack, setSnack] = useState<string | null>(null);

//   const examples = [
//     "یک فرم ثبت نام کاربر با فیلدهای نام، نام خانوادگی، ایمیل، شماره تماس و تاریخ تولد بساز",
//     "یک داشبورد مدیریت فروش با نمودار فروش ماهانه و جدول آخرین سفارشات ایجاد کن",
//     "یک صفحه گزارش برای نمایش لیست محصولات با قابلیت فیلتر بر اساس دسته‌بندی و قیمت بساز",
//     "یک فرم تنظیمات سیستم با فیلدهای نام شرکت، لوگو، رنگ تم و تنظیمات SMTP ایجاد کن"
//   ];

//   const handleGenerate = async () => {
//     if (!prompt.trim()) {
//       setSnack("لطفاً درخواست خود را وارد کنید");
//       return;
//     }

//     setLoading(true);
//     setResult(null);

//     try {
//       // const response = await axios.post("/api/generate-page",   { prompt: prompt.trim() });
//       // console.log('response generate-api',response);
//       const { data } = await axios.post<GenerationResult>(
//         "/api/generate-page",
//         { prompt: prompt.trim() }
//       );

//       setResult(data);

//       if (data.success) {
//         setSnack(`صفحه "${data.data.caption}" با موفقیت ایجاد شد`);
//       } else {
//         setSnack(data.message || "خطا در ایجاد صفحه");
//       }
//     } catch (error: any) {
//       setSnack(error.response?.data?.error || "خطا در ارتباط با سرور");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExampleClick = (example: string) => {
//     setPrompt(example);
//   };

//   const handleReset = () => {
//     setPrompt("");
//     setResult(null);
//   };

//   const handleViewPage = () => {
//     if (result?.data?.routPath) {
//       window.open(result.data.routPath, "_blank");
//     }
//   };

//   return (
//     <Box p={3} maxWidth={1000} mx="auto">

//       <Stack direction="row" alignItems="center" spacing={1} mb={2}>
//         <SmartToyIcon />
//         <Typography variant="h5">
//           ساخت خودکار صفحه با هوش مصنوعی
//         </Typography>
//       </Stack>

//       <Typography variant="body2" color="text.secondary" mb={3}>
//         درخواست خود را به زبان فارسی توصیف کنید تا سیستم یک صفحه جدید بسازد.
//       </Typography>

//       <Card sx={{ p: 3, mb: 3 }}>
//         <TextField
//           multiline
//           rows={4}
//           fullWidth
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="مثال: یک فرم ثبت نام مشتری با فیلدهای نام، شماره تماس، ایمیل و شهر بساز"
//           disabled={loading}
//         />

//         <Box mt={2}>
//           <Typography fontWeight={600} mb={1}>
//             مثال‌های آماده
//           </Typography>

//           <Stack direction="row" spacing={1} flexWrap="wrap">
//             {examples.map((ex, i) => (
//               <Chip
//                 key={i}
//                 label={ex}
//                 clickable
//                 color="primary"
//                 variant="outlined"
//                 onClick={() => !loading && handleExampleClick(ex)}
//               />
//             ))}
//           </Stack>
//         </Box>

//         <Box mt={3}>
//           <Button
//             variant="contained"
//             startIcon={loading ? <CircularProgress size={18} /> : <BoltIcon />}
//             size="large"
//             onClick={handleGenerate}
//             disabled={loading}
//           >
//             تولید صفحه
//           </Button>
//         </Box>
//       </Card>

//       {result && (
//         <Card sx={{ p: 3 }}>
//           {result.success ? (
//             <>
//               <Alert icon={<CheckCircleIcon />} severity="success" sx={{ mb: 2 }}>
//                 صفحه با موفقیت ایجاد شد
//               </Alert>

//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={6}>
//                   <Card sx={{ p: 2 }}>
//                     <Typography fontWeight={600} mb={1}>
//                       اطلاعات صفحه
//                     </Typography>

//                     <Stack spacing={1}>
//                       <Typography>
//                         <strong>نام صفحه:</strong> {result.data.caption}
//                       </Typography>

//                       <Typography>
//                         <strong>ID:</strong> {result.data.componentId}
//                       </Typography>

//                       <Typography>
//                         <strong>مسیر:</strong> {result.data.routPath}
//                       </Typography>
//                     </Stack>
//                   </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                   <Card sx={{ p: 2 }}>
//                     <Typography fontWeight={600} mb={1}>
//                       جزئیات فنی
//                     </Typography>

//                     <Stack spacing={1}>
//                       <Typography>
//                         <strong>Component:</strong> {result.data.componentName}
//                       </Typography>

//                       <Typography>
//                         <strong>Table:</strong> {result.data.tableName}
//                       </Typography>

//                       <Chip
//                         label={`${result.data.fields} فیلد`}
//                         color="primary"
//                         size="small"
//                       />
//                     </Stack>
//                   </Card>
//                 </Grid>
//               </Grid>

//               <Stack direction="row" spacing={2} mt={3}>
//                 <Button
//                   variant="contained"
//                   startIcon={<SmartToyIcon />}
//                   onClick={handleViewPage}
//                 >
//                   مشاهده صفحه
//                 </Button>

//                 <Button
//                   onClick={() => {
//                     navigator.clipboard.writeText(
//                       JSON.stringify(result.data, null, 2)
//                     );
//                     setSnack("اطلاعات کپی شد");
//                   }}
//                 >
//                   کپی اطلاعات
//                 </Button>

//                 <Button onClick={handleReset}>
//                   ساخت صفحه جدید
//                 </Button>
//               </Stack>
//             </>
//           ) : (
//             <Alert severity="error">
//               {result.message || "خطای نامشخصی رخ داده است"}
//             </Alert>
//           )}
//         </Card>
//       )}

//       <Snackbar
//         open={!!snack}
//         autoHideDuration={4000}
//         onClose={() => setSnack(null)}
//         message={snack}
//       />
//     </Box>
//   );
// };

// export default AiPageGenerator;



import React, { useState } from "react";
import axios from './axiosConfig';

import {
  Button,
  TextField,
  Typography,
  CircularProgress,
  Card,
  Grid,
  Alert,
  Stack,
  Chip,
  Snackbar,
  Box,
  Divider
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListIcon from '@mui/icons-material/List';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface GenerationResult {
  success: boolean;
  message: string;
  data: {
    componentId: number;
    componentName: string;
    caption: string;
    routPath: string;
    tableName: string;
    fields: number;
    componentFields: number;
  };
}

const AiPageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [snack, setSnack] = useState<string | null>(null);

  // مثال‌های جدید با تمرکز بر ComboBox و روابط وابسته
  const examples = [
    {
      text: "یک فرم ثبت اطلاعات پرسنلی با فیلد وضعیت تاهل (لیست انتخابی) بساز",
      icon: <ListIcon fontSize="small" />
    },
    {
      text: "صفحه مدیریت خودروها با فیلد برند و مدل (وابسته به برند) ایجاد کن",
      icon: <AccountTreeIcon fontSize="small" />
    },
    {
      text: "فرم ثبت سفارش با فیلد استان و شهر که شهر بر اساس استان فیلتر شود بساز",
      icon: <AccountTreeIcon fontSize="small" />
    },
    {
      text: "یک لیست کالا با قابلیت انتخاب واحد سنجش از لیست مقادیر ثابت بساز",
      icon: <ListIcon fontSize="small" />
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setSnack("لطفاً درخواست خود را وارد کنید");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post<GenerationResult>(
        "/api/generate-page",
        { prompt: prompt.trim() }
      );

      setResult(data);

      if (data.success) {
        setSnack(`صفحه "${data.data.caption}" با موفقیت ایجاد شد`);
      } else {
        setSnack(data.message || "خطا در ایجاد صفحه");
      }
    } catch (error: any) {
      setSnack(error.response?.data?.error || "خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleReset = () => {
    setPrompt("");
    setResult(null);
  };

  const handleViewPage = () => {
    if (result?.data?.routPath) {
      window.open(result.data.routPath, "_blank");
    }
  };

  return (
    <Box p={3} maxWidth={1000} mx="auto">

      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <SmartToyIcon color="primary" fontSize="large" />
        <Typography variant="h5" fontWeight={700}>
          ساخت خودکار صفحه با هوش مصنوعی (نسخه ۲.۰)
        </Typography>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>قابلیت جدید:</strong> اکنون می‌توانید فیلدهای <strong>لیست انتخابی (ComboBox)</strong> و حتی <strong>کمبوهای وابسته</strong> (مثل استان و شهر) را فقط با توضیح دادن بسازید!
      </Alert>

      <Card sx={{ p: 3, mb: 3, boxShadow: 3 }}>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: یک فرم ثبت نام با فیلد استان و فیلد شهر (وابسته به استان) بساز..."
          disabled={loading}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box>
          <Typography variant="subtitle2" fontWeight={600} color="text.secondary" mb={1.5}>
            پیشنهادات هوشمند (کلیک کنید)
          </Typography>

          <Grid container spacing={1}>
            {examples.map((ex, i) => (
              <Grid item key={i}>
                <Chip
                  icon={ex.icon}
                  label={ex.text}
                  clickable
                  color="primary"
                  variant="outlined"
                  onClick={() => !loading && handleExampleClick(ex.text)}
                  sx={{ py: 2, px: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" color="text.secondary">
            سیستم به طور خودکار روابط دیتابیس و متادیتا را تنظیم می‌کند.
          </Typography>
          <Button
            variant="contained"
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <BoltIcon />}
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            sx={{ minWidth: 150, borderRadius: 2 }}
          >
            {loading ? "در حال تولید..." : "تولید آنی صفحه"}
          </Button>
        </Box>
      </Card>

      {result && (
        <Card sx={{ p: 3, borderLeft: '6px solid #2e7d32', animation: 'fadeIn 0.5s' }}>
          {result.success ? (
            <>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <CheckCircleIcon color="success" />
                <Typography variant="h6" color="success.main" fontWeight={600}>
                   عملیات با موفقیت انجام شد
                </Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box p={2} bgcolor="grey.50" borderRadius={2}>
                    <Typography fontWeight={700} color="primary" gutterBottom>
                      اطلاعات صفحه
                    </Typography>
                    <Stack spacing={1.5}>
                      <Typography variant="body2"><strong>عنوان نمایشی:</strong> {result.data.caption}</Typography>
                      <Typography variant="body2"><strong>کد شناسایی (ID):</strong> {result.data.componentId}</Typography>
                      <Typography variant="body2"><strong>مسیر دسترسی:</strong> <code>{result.data.routPath}</code></Typography>
                    </Stack>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box p={2} bgcolor="grey.50" borderRadius={2}>
                    <Typography fontWeight={700} color="primary" gutterBottom>
                      ساختار دیتابیس
                    </Typography>
                    <Stack spacing={1.5}>
                      <Typography variant="body2"><strong>نام جدول:</strong> {result.data.tableName}</Typography>
                      <Typography variant="body2"><strong>تعداد کل فیلدها:</strong> {result.data.fields}</Typography>
                      <Stack direction="row" spacing={1}>
                         <Chip label="Metadata Generated" size="small" color="success" variant="outlined" />
                         <Chip label="Relations Linked" size="small" color="info" variant="outlined" />
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>

              <Stack direction="row" spacing={2} mt={4} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SmartToyIcon />}
                  onClick={handleViewPage}
                  sx={{ borderRadius: 10, px: 4 }}
                >
                  مشاهده صفحه ساخته شده
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(result.data, null, 2));
                    setSnack("اطلاعات فنی کپی شد");
                  }}
                  sx={{ borderRadius: 10 }}
                >
                  کپی JSON
                </Button>

                <Button onClick={handleReset} sx={{ color: 'text.secondary' }}>
                  انصراف و شروع مجدد
                </Button>
              </Stack>
            </>
          ) : (
            <Alert severity="error" variant="filled">
              {result.message || "خطایی در فرآیند تولید متادیتا رخ داد"}
            </Alert>
          )}
        </Card>
      )}

      <Snackbar
        open={!!snack}
        autoHideDuration={4000}
        onClose={() => setSnack(null)}
        message={snack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default AiPageGenerator;
