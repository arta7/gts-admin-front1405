// FieldsPage.jsx
import React from 'react';
import axios from './axiosConfig';
import DynamicCrudPage from './DynamicCrudPage';

export const fieldsLoader = async () => {
  try {
    const response = await axios.get('/api/fields');
    return response.data;
  } catch (error) {
    console.error('Error loading fields:', error);
    throw error;
  }
};

const fieldsServices = {
  list: '/api/fields',
  base: '/api/fields',
  delete: '/api/fields'
};

const fieldsColumns = [
  {
    accessorKey: 'fieldName',
    header: 'نام فیلد',
    enableColumnFilter: true,
    enableSorting: true
  },
  {
    accessorKey: 'tableName',
    header: 'نام جدول',
    enableColumnFilter: true
  },
  {
    accessorKey: 'aliasName',
    header: 'نام alias',
    enableColumnFilter: true
  },
  {
    accessorKey: 'dataType',
    header: 'نوع داده',
    enableColumnFilter: true
  },
  {
    accessorKey: 'sortOrder',
    header: 'ترتیب نمایش',
    enableSorting: true
  },
  {
    accessorKey: 'description',
    header: 'توضیحات'
  },
  {
    accessorKey: 'isActive',
    header: 'فعال',
    meta: { type: 'boolean' },
    enableColumnFilter: true
  }
];

const fieldsFormConfig = {
  fields: [
    {
      name: 'fieldName',
      type: 'text',
      label: 'نام فیلد',
      rules: { required: "نام فیلد الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'tableName',
      type: 'async-combo',
      label: 'نام جدول',
      url: '/api/tables',
      getOptionLabel: (option) => option.tableName,
      rules: { required: "انتخاب جدول الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'aliasName',
      type: 'text',
      label: 'نام alias',
      rules: { required: "کد الزامی است" },
      grid: { xs: 12, md: 6 }
    },
    {
      name: 'dataType',
      type: 'select', // تغییر از async-combo به select
      options: [
        { value: 'bigint', label: 'bigint' },
        { value: 'bit', label: 'bit' },
        { value: 'date', label: 'date' },
         { value: 'float', label: 'float' },
        { value: 'int', label: 'int' },
        { value: 'nchar', label: 'nchar' },
        { value: 'nvarchar', label: 'nvarchar' },
        { value: 'time', label: 'time' },
        { value: 'tinyint', label: 'tinyint' }
      ],
      label: 'نوع داده',
      rules: { required: "نوع داده الزامی است" },
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
      name: 'description',
      type: 'text',
      label: 'توضیحات',
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

const createField = () => ({ 
  fieldName: '', 
  tableName: '', 
  aliasName:'',
  sortOrder:0,
  dataType: '', 
  description: '',
  defaultValue:null, 
  isActive: true 
});

export default function FieldsPage() {
  return (
    <DynamicCrudPage
      title="مدیریت فیلدها"
      columns={fieldsColumns}
      services={fieldsServices}
      formConfig={fieldsFormConfig}
      createDefault={createField}
    />
  );
}