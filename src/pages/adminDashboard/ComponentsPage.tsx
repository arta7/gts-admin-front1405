

import React from 'react';
import axios from './axiosConfig';
import DynamicCrudPage from './DynamicCrudPage';

export const componentsLoader = async () => {
  try {
    console.log('🔄 Loading components...');
    const response = await axios.get('/api/components');
    console.log('✅ Components loaded:', response.data);
    
    if (response.data && response.data.length > 0) {
      console.log('📋 First component data:', response.data[0]);
      console.log('🔍 Available fields:', Object.keys(response.data[0]));
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Error loading components:', error);
    throw error;
  }
};

const componentsServices = {
  list: '/api/components',
  base: '/api/components',
  get: (id) => `/api/components/${id}`,
  create: '/api/components',
  update: (id) => `/api/components/${id}`,
  delete: (id) => `/api/components/${id}`
};

const componentsColumns = [
  {
    accessorKey: 'componentName',
    header: 'نام کامپوننت',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'caption',
    header: 'عنوان',
    enableColumnFilter: true
  },
  {
    accessorKey: 'subSystemName',
    header: 'زیرسیستم',
    enableColumnFilter: true,
    cell: ({ row }) => {
      return row.original.subSystemName || 'نامشخص';
    }
  },
  {
    accessorKey: 'componentTypes',
    header: 'نوع کامپوننت',
    enableColumnFilter: true,
    cell: ({ row }) => {
      const type = row.original.componentTypes;
      
      return  type;
    }
  },
  {
    accessorKey: 'parentName',
    header: 'والد',
    enableColumnFilter: true,
    cell: ({ row }) => {
      return row.original.parentName || 'بدون والد';
    }
  },
  {
    accessorKey: 'routPath',
    header: 'آدرس دسترسی'
  },
  {
    accessorKey: 'sortOrder',
    header: 'ترتیب نمایش',
    enableSorting: true
  },
  {
    accessorKey: 'isActive',
    header: 'فعال',
    meta: { type: 'boolean' },
    enableColumnFilter: true
  }
];

const componentsFormConfig = {
  fields: [
    {
     
      name: 'componentName',
      type: 'select', // تغییر از async-combo به select
      label: 'نام کامپوننت',
      options: [
        { value: 'Grid', label: 'Grid' },
        { value: 'Header', label: 'Header' },
        { value: 'Menu', label: 'Menu' },
        { value: 'Tab', label: 'Tab' },
        { value: 'TabGrid', label: 'TabGrid' }
      ],
      rules: { required: "نام کامپوننت الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
     
      name: 'targetPageType',
      type: 'select', // تغییر از async-combo به select
      label: 'targetPageType',
      options: [
        { value: 'MasterGrid', label: 'MasterGrid' },
        { value: 'SpecificReport', label: 'SpecificReport' },
        { value: 'StatisticsReport', label: 'StatisticsReport' }
      ],
      rules: { required: "نام targetPageType الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'caption',
      type: 'text',
      label: 'عنوان',
      rules: { required: "عنوان الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'subSystemId',
      type: 'async-combo',
      label: 'زیرسیستم',
      url: '/api/subsystems',
      getOptionLabel: (option) => option.name || 'بدون نام',
      getOptionValue: (option) => option.id,
      rules: { required: "انتخاب زیرسیستم الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'componentType',
      type: 'async-combo',
      label: 'نوع کامپوننت',
      url: '/api/component-types',
      getOptionLabel: (option) => option.name,
      getOptionValue: (option) => option.id,
      rules: { required: "انتخاب نوع کامپوننت الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'parentId',
      type: 'async-combo',
      label: 'والد',
      url: '/api/parent-components',
      getOptionLabel: (option) => `${option.name} - ${option.caption}`,
      getOptionValue: (option) => option.id,
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'rootComponentId',
      type: 'async-combo',
      label: 'کامپوننت ریشه',
      url: '/api/parent-components',
      getOptionLabel: (option) => `${option.name} - ${option.caption}`,
      getOptionValue: (option) => option.id,
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'routPath',
      type: 'text',
      label: 'آدرس دسترسی',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'icon',
      type: 'text',
      label: 'آیکون',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'ترتیب نمایش',
      rules: { 
        required: "ترتیب نمایش الزامی است",
        min: { value: 0, message: "ترتیب نمایش نمی‌تواند منفی باشد" }
      },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'tableName',
      type: 'text',
      label: 'نام جدول',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'submitAPI',
      type: 'text',
      label: 'API ثبت',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'fetchDataAPI',
      type: 'text',
      label: 'API دریافت داده',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'isPartOfParent',
      type: 'checkbox',
      label: 'بخشی از والد است',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'updateInsteadOfInsert',
      type: 'checkbox',
      label: 'آپدیت به جای اینسرت',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'hasAttachment',
      type: 'checkbox',
      label: 'دارای پیوست',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'hasExclusiveReport',
      type: 'checkbox',
      label: 'دارای گزارش انحصاری',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'isDynamic',
      type: 'checkbox',
      label: 'داینامیک',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'فعال',
      grid: { xs: 12, md: 6 }
    }
  ]
};

const createComponent = () => ({ 
  componentName: '', 
  caption: '', 
  subSystemId: 0, 
  componentType: 0,
  parentId: 0,
  rootComponentId: 0,
  routPath: '', 
  icon: '',
  sortOrder: 0, 
  tableName: '',
  submitAPI: '',
  fetchDataAPI: '',
  isPartOfParent: false,
  updateInsteadOfInsert: false,
  hasAttachment: false,
  hasExclusiveReport: false,
  isDynamic: true,
  isActive: true ,
  id:0,
  targetPageType:''
});

// تابع transform برای تبدیل داده‌ها
const transformFormData = (data) => {
  console.log('🔄 Transforming form data:', data);
  
  // اطمینان از اینکه componentName به درستی مدیریت شود
  if (data.componentName && typeof data.componentName == 'object') {
    data.componentName = data.componentName.value || data.componentName.name || data.componentName;
  }
  
  return data;
};

export default function ComponentsPage() {

  return (
    <DynamicCrudPage
      title="مدیریت کامپوننت‌ها"
      columns={componentsColumns}
      services={componentsServices}
      formConfig={componentsFormConfig}
      createDefault={createComponent}
      transformFormData={transformFormData}
    />
  );
}