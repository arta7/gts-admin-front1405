
import React from 'react';
import axios from './axiosConfig';
import DynamicCrudPage from './DynamicCrudPage';

export const systemsLoader = async () => {
  try {
    const response = await axios.get('/api/systems');
    return response.data;
  } catch (error) {
    console.error('Error loading systems:', error);
    throw error;
  }
};

const systemsServices = {
  list: '/api/systems',
  base: '/api/systems',
  delete: '/api/systems'
};

const systemsColumns = [
  {
    accessorKey: 'name',
    header: 'نام سیستم',
    enableColumnFilter: true,
    enableSorting: true,
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'code',
    header: 'کد',
    enableColumnFilter: true,
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'routPath',
    header: 'مسیر روتر',
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'icon',
    header: 'آیکون',
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'isActive',
    header: 'فعال',
    meta: { type: 'boolean' },
    enableColumnFilter: true,
    muiTableBodyCellProps: {
      align: 'center',
    },
  },
  {
    accessorKey: 'sortOrder',
    header: 'ترتیب نمایش',
    enableSorting: true,
    muiTableBodyCellProps: {
      align: 'center',
    },
  }
];

const systemsFormConfig = {
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام سیستم',
      rules: { required: "نام سیستم الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'code',
      type: 'text',
      label: 'کد',
      rules: { 
        required: "کد الزامی است",
        maxLength: {
          value: 3,
          message: "کد باید حداکثر 3 کاراکتر باشد"
        }
      },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'routPath',
      type: 'text',
      label: 'مسیر روتر',
      rules: { 
        maxLength: {
          value: 50,
          message: "مسیر روتر باید حداکثر 50 کاراکتر باشد"
        }
      },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'icon',
      type: 'text',
      label: 'آیکون',
      rules: { 
        maxLength: {
          value: 100,
          message: "آیکون باید حداکثر 100 کاراکتر باشد"
        }
      },
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
        },
        min: {
          value: 0,
          message: "ترتیب نمایش نمی‌تواند منفی باشد"
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

const createSystem = () => ({ 
  name: '', 
  code: '', 
  routPath: '', 
  icon: '', 
  sortOrder: 0, 
  isActive: true 
});

export default function SystemsPage() {
  return (
    <DynamicCrudPage
      title="مدیریت سیستم‌ها"
      columns={systemsColumns}
      services={systemsServices}
      formConfig={systemsFormConfig}
      createDefault={createSystem}
    />
  );
}