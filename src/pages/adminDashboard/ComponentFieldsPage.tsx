// ComponentFieldsPage.jsx
import React from 'react';
import axios from './axiosConfig';
import DynamicCrudPage from './DynamicCrudPage';

export const componentFieldsLoader = async () => {
  try {
    const response = await axios.get('/api/component-fields');
    return response.data;
  } catch (error) {
    console.error('Error loading component fields:', error);
    throw error;
  }
};

const componentFieldsServices = {
  list: '/api/component-fields',
  base: '/api/component-fields',
  delete: '/api/component-fields'
};

const componentFieldsColumns = [
  {
    accessorKey: 'componentName',
    header: 'نام کامپوننت',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'fieldName',
    header: 'نام فیلد',
    enableColumnFilter: true
  },
  {
    accessorKey: 'isRequired',
    header: 'اجباری',
    meta: { type: 'boolean' },
    enableColumnFilter: true
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

const componentFieldsFormConfig = {
  fields: [
    {
      name: 'componentId',
      type: 'async-combo',
      label: 'کامپوننت',
      url: '/api/components',
      getOptionLabel: (option) => option.name,
      rules: { required: "انتخاب کامپوننت الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'fieldId',
      type: 'async-combo',
      label: 'فیلد',
      url: '/api/fields',
      getOptionLabel: (option) => option.name,
      rules: { required: "انتخاب فیلد الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'isRequired',
      type: 'checkbox',
      label: 'اجباری',
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'sortOrder',
      type: 'number',
      label: 'ترتیب نمایش',
      rules: { 
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

const createComponentField = () => ({ 
  componentId: 0, 
  fieldId: 0, 
  isRequired: false, 
  sortOrder: 0, 
  isActive: true 
});

export default function ComponentFieldsPage() {
  return (
    <DynamicCrudPage
      title="مدیریت فیلدهای کامپوننت"
      columns={componentFieldsColumns}
      services={componentFieldsServices}
      formConfig={componentFieldsFormConfig}
      createDefault={createComponentField}
    />
  );
}