// ComponentsExcelUploadPage.jsx
import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Alert,
  Snackbar,
  Chip,
  Card,
  CardContent,
  Grid as MuiGrid,
  TextField,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';
import {
  Home,
  CloudUpload,
  Save,
  Download,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ComponentsExcelUploadPage = () => {
  const navigate = useNavigate();
  const [excelData, setExcelData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' 
  });

  // داده‌های ثابت برای dropdown ها
  const dropdownOptions = {
    componentNames: [
      { id: 'Grid', name: 'Grid' },
      { id: 'Header', name: 'Header' },
      { id: 'Menu', name: 'Menu' },
      { id: 'Tab', name: 'Tab' },
      { id: 'TabGrid', name: 'TabGrid' },
      { id: 'Form', name: 'Form' },
      { id: 'Report', name: 'Report' },
      { id: 'Dashboard', name: 'Dashboard' }
    ],
    booleanOptions: [
      { id: true, name: 'بله' },
      { id: false, name: 'خیر' }
    ]
  };

  // تعریف ستون‌های grid
  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: '#',
      width: 60,
      renderCell: (params) => params.api?.getRowIndex(params?.row?.id) + 1
    },
    {
      field: 'componentName',
      headerName: 'نام کامپوننت',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: dropdownOptions.componentNames.map(opt => opt.name),
      renderCell: (params) => (
        <FormControl fullWidth size="small">
          <Select
            value={params.value || ''}
            onChange={(e) => handleCellChange(params.row.id, 'componentName', e.target.value)}
            displayEmpty
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            {dropdownOptions.componentNames.map(option => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
    },
    {
      field: 'caption',
      headerName: 'عنوان',
      width: 180,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => handleCellChange(params.row.id, 'caption', e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'subSystemName',
      headerName: 'زیرسیستم',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => handleCellChange(params.row.id, 'subSystemName', e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'componentType',
      headerName: 'نوع کامپوننت',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['فرم', 'گزارش', 'داشبورد', 'تنظیمات', 'لیست'],
      renderCell: (params) => (
        <FormControl fullWidth size="small">
          <Select
            value={params.value || ''}
            onChange={(e) => handleCellChange(params.row.id, 'componentType', e.target.value)}
            displayEmpty
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            <MenuItem value="فرم">فرم</MenuItem>
            <MenuItem value="گزارش">گزارش</MenuItem>
            <MenuItem value="داشبورد">داشبورد</MenuItem>
            <MenuItem value="تنظیمات">تنظیمات</MenuItem>
            <MenuItem value="لیست">لیست</MenuItem>
          </Select>
        </FormControl>
      )
    },
    {
      field: 'routPath',
      headerName: 'آدرس دسترسی',
      width: 200,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => handleCellChange(params.row.id, 'routPath', e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'icon',
      headerName: 'آیکون',
      width: 120,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => handleCellChange(params.row.id, 'icon', e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'sortOrder',
      headerName: 'ترتیب نمایش',
      width: 120,
      type: 'number',
      editable: true,
      renderCell: (params) => (
        <TextField
          type="number"
          value={params.value || 0}
          onChange={(e) => handleCellChange(params.row.id, 'sortOrder', parseInt(e.target.value) || 0)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'tableName',
      headerName: 'نام جدول',
      width: 150,
      editable: true,
      renderCell: (params) => (
        <TextField
          value={params.value || ''}
          onChange={(e) => handleCellChange(params.row.id, 'tableName', e.target.value)}
          size="small"
          fullWidth
          variant="outlined"
        />
      )
    },
    {
      field: 'isActive',
      headerName: 'فعال',
      width: 100,
      editable: true,
      type: 'boolean',
      renderCell: (params) => (
        <FormControl fullWidth size="small">
          <Select
            value={params.value === true ? 'true' : params.value === false ? 'false' : ''}
            onChange={(e) => handleCellChange(params.row.id, 'isActive', e.target.value === 'true')}
            displayEmpty
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            <MenuItem value="true">بله</MenuItem>
            <MenuItem value="false">خیر</MenuItem>
          </Select>
        </FormControl>
      )
    },
    {
      field: 'hasAttachment',
      headerName: 'دارای پیوست',
      width: 120,
      editable: true,
      type: 'boolean',
      renderCell: (params) => (
        <FormControl fullWidth size="small">
          <Select
            value={params.value === true ? 'true' : params.value === false ? 'false' : ''}
            onChange={(e) => handleCellChange(params.row.id, 'hasAttachment', e.target.value === 'true')}
            displayEmpty
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            <MenuItem value="true">بله</MenuItem>
            <MenuItem value="false">خیر</MenuItem>
          </Select>
        </FormControl>
      )
    }
  ], []);

  // هندل آپلود فایل اکسل
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        processExcelData(jsonData);
      } catch (err) {
        showNotification('خطا در خواندن فایل اکسل', 'error');
        console.error('Excel read error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      showNotification('خطا در بارگذاری فایل', 'error');
      setLoading(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  // پردازش داده‌های اکسل
  const processExcelData = (jsonData) => {
    const processedData = jsonData.map((row, index) => ({
      id: index + 1,
      componentName: row['نام کامپوننت'] || '',
      caption: row['عنوان'] || '',
      subSystemName: row['زیرسیستم'] || '',
      componentType: row['نوع کامپوننت'] || '',
      routPath: row['آدرس دسترسی'] || '',
      icon: row['آیکون'] || '',
      sortOrder: row['ترتیب نمایش'] || 0,
      tableName: row['نام جدول'] || '',
      isActive: convertToBoolean(row['فعال']),
      hasAttachment: convertToBoolean(row['دارای پیوست']),
      submitAPI: row['API ثبت'] || '',
      fetchDataAPI: row['API دریافت داده'] || ''
    }));

    setExcelData(jsonData);
    setTableData(processedData);
    showNotification(`تعداد ${processedData.length} رکورد با موفقیت بارگذاری شد`);
  };

  // تبدیل متن به boolean
  const convertToBoolean = (value) => {
    if (value === 'بله' || value === 'true' || value === true) return true;
    if (value === 'خیر' || value === 'false' || value === false) return false;
    return false;
  };

  // تغییر مقدار سلول
  const handleCellChange = (rowId, field, value) => {
    setTableData(prev => 
      prev.map(row => 
        row.id === rowId ? { ...row, [field]: value } : row
      )
    );
  };

  // ذخیره داده‌ها
  const handleSave = async () => {
    if (tableData.length === 0) {
      showNotification('هیچ داده‌ای برای ذخیره‌سازی وجود ندارد', 'warning');
      return;
    }

    setLoading(true);
    
    try {
      // تبدیل داده‌ها به فرمت مورد نظر backend
      const dataToSave = tableData.map(item => ({
        componentName: item.componentName,
        caption: item.caption,
        subSystemName: item.subSystemName,
        componentType: convertComponentType(item.componentType),
        routPath: item.routPath,
        icon: item.icon,
        sortOrder: item.sortOrder,
        tableName: item.tableName,
        isActive: item.isActive,
        hasAttachment: item.hasAttachment,
        submitAPI: item.submitAPI,
        fetchDataAPI: item.fetchDataAPI
      }));

      const response = await axios.post('/api/components/bulk-import', dataToSave, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      showNotification('داده‌ها با موفقیت ذخیره شدند');
      console.log('✅ Data saved successfully:', response.data);
    } catch (error) {
      console.error('❌ Error saving data:', error);
      showNotification('خطا در ذخیره‌سازی داده‌ها', 'error');
    } finally {
      setLoading(false);
    }
  };

  // تبدیل نوع کامپوننت به عدد
  const convertComponentType = (type) => {
    const typeMap = {
      'فرم': 1,
      'گزارش': 2,
      'داشبورد': 3,
      'تنظیمات': 4,
      'لیست': 5
    };
    return typeMap[type] || 1;
  };

  // دانلود template اکسل
  const downloadTemplate = () => {
    const templateData = [
      {
        'نام کامپوننت': 'Grid',
        'عنوان': 'لیست کاربران',
        'زیرسیستم': 'مدیریت کاربران',
        'نوع کامپوننت': 'لیست',
        'آدرس دسترسی': '/users',
        'آیکون': 'people',
        'ترتیب نمایش': 1,
        'نام جدول': 'Users',
        'فعال': 'بله',
        'دارای پیوست': 'خیر',
        'API ثبت': '/api/users',
        'API دریافت داده': '/api/users'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, 'components_template.xlsx');
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box sx={{ p: 3, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Breadcrumb */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/')}
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          خانه
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => navigate('/components')}
          sx={{ cursor: 'pointer' }}
        >
          کامپوننت‌ها
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <CloudUpload sx={{ mr: 0.5 }} fontSize="inherit" />
          آپلود گروهی از اکسل
        </Typography>
      </Breadcrumbs>

      {/* Title */}
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          mb: 4,
          color: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        آپلود گروهی کامپوننت‌ها از اکسل
      </Typography>

      <MuiGrid container spacing={3}>
        {/* کارت آپلود */}
        <MuiGrid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ textAlign: 'center', p: 3 }}>
              <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                آپلود فایل اکسل
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                فایل اکسل حاوی اطلاعات کامپوننت‌ها را انتخاب کنید
              </Typography>

              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ mb: 2 }}
                disabled={loading}
              >
                انتخاب فایل اکسل
                <input
                  type="file"
                  hidden
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                />
              </Button>

              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={downloadTemplate}
                sx={{ mb: 2, display: 'block', mx: 'auto' }}
              >
                دانلود فایل نمونه
              </Button>

              {tableData.length > 0 && (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Save />}
                  onClick={handleSave}
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  ذخیره داده‌ها
                </Button>
              )}
            </CardContent>
          </Card>
        </MuiGrid>

        {/* کارت پیش‌نمایش داده‌ها */}
        <MuiGrid item xs={12} md={8}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  پیش‌نمایش و ویرایش داده‌ها
                </Typography>
                {tableData.length > 0 && (
                  <Chip 
                    label={`${tableData.length} رکورد`} 
                    color="primary" 
                    variant="outlined" 
                  />
                )}
              </Box>

              {tableData.length > 0 ? (
                <Box sx={{ height: 500, width: '100%' }}>
                  {/* استفاده از DataGrid یا Table معمولی */}
                  <Paper sx={{ width: '100%', overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                          {columns.map(column => (
                            <th 
                              key={column.field}
                              style={{ 
                                padding: '12px', 
                                textAlign: 'right', 
                                borderBottom: '2px solid #e0e0e0',
                                minWidth: column.width
                              }}
                            >
                              {column.headerName}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row) => (
                          <tr key={row.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                            {columns.map(column => (
                              <td 
                                key={column.field} 
                                style={{ padding: '8px' }}
                              >
                                {column.renderCell ? 
                                  column.renderCell({ 
                                    value: row[column.field], 
                                    row,
                                    id: row.id
                                  }) : 
                                  row[column.field]
                                }
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Paper>
                </Box>
              ) : (
                <Box 
                  sx={{ 
                    textAlign: 'center', 
                    py: 8, 
                    color: 'text.secondary',
                    border: '2px dashed #e0e0e0',
                    borderRadius: 2
                  }}
                >
                  <CloudUpload sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
                  <Typography variant="h6" gutterBottom>
                    هیچ داده‌ای نمایش داده نمی‌شود
                  </Typography>
                  <Typography variant="body2">
                    لطفاً فایل اکسل خود را آپلود کنید
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </MuiGrid>
      </MuiGrid>

      {/* دکمه بازگشت */}
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/components')}
        sx={{ mt: 3 }}
      >
        بازگشت به صفحه کامپوننت‌ها
      </Button>

      {/* نوتیفیکیشن */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert 
          onClose={handleCloseNotification} 
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ComponentsExcelUploadPage;