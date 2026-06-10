// SubSystemsPage.jsx
import React from 'react';
import axios from './axiosConfig';
import DynamicCrudPage from './DynamicCrudPage';

export const subsystemsLoader = async () => {
  try {
    const response = await axios.get('/api/subsystems');
    return response.data;
  } catch (error) {
    console.error('Error loading subsystems:', error);
    throw error;
  }
};

const subsystemsServices = {
  list: '/api/subsystems',
  base: '/api/subsystems',
  delete: '/api/subsystems'
};

const subsystemsColumns = [
  {
    accessorKey: 'name',
    header: 'نام زیرسیستم',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'Systemname',
    header: 'نام سیستم',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'routPath',
    header: 'آدرس دسترسی',
    enableColumnFilter: true
  },
  {
    accessorKey: 'icon',
    header: 'آیکون'
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

const subsystemsFormConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام زیرسیستم',
      rules: { required: "نام زیرسیستم الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'systemId',
      type: 'async-combo',
      label: 'سیستم',
      url: '/api/systems',
      getOptionLabel: (option) => option.name,
      rules: { required: "انتخاب سیستم الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'routPath',
      type: 'text',
      label: 'آدرس دسترسی',
      rules: { required: "آدرس دسترسی الزامی است" },
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
        pattern: {
          value: /^[0-9]*$/,
          message: "لطفاً فقط عدد وارد کنید"
        }
      },
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

const createSubSystem = () => ({ 
  name: '', 
  systemId: 0, 
  routPath: '', 
  icon: '', 
  sortOrder: 0, 
  isActive: true 
  // Systemname:'',
});

export default function SubSystemsPage() {
  return (
    <DynamicCrudPage
      title="مدیریت زیرسیستم‌ها"
      columns={subsystemsColumns}
      services={subsystemsServices}
      formConfig={subsystemsFormConfig}
      createDefault={createSubSystem}
    />
  );
}