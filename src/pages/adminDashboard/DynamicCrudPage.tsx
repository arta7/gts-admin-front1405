// DynamicCrudPage.jsx
import React, { useEffect } from 'react';
import { Box, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useLoaderData, useRevalidator } from "react-router-dom";
import useConfirmDialog from "../../components/ConfirmDialog/UseConfirmDialog";
import Grid from "../../components/grid/Grid";
import DynamicEditForm from "./DynamicEditForm";

export default function DynamicCrudPage({ 
  title, 
  columns, 
  services, 
  formConfig,
  createDefault 
}) {
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentEntity, setCurrentEntity] = React.useState(null);
  const [notification, setNotification] = React.useState({ open: false, message: '', severity: 'success' });
  
  const rows = useLoaderData();
  const revalidator = useRevalidator();
  // const { confirm } = useConfirmDialog();

  const showNotification = (message, severity = 'success') => {
    setNotification({ open: true, message, severity });
  };



  useEffect(()=>{
console.log('list',services)
  },[])
  const reloadData = () => {
    revalidator.revalidate();
  };

  const openModal = (entity = null) => {

    setCurrentEntity(entity);
    setModalOpen(true);
  };

  const handleCloseModal = (submitted, result, error) => {
    setModalOpen(false);
    setCurrentEntity(null);
    
    if (submitted && !error) {
      showNotification('عملیات با موفقیت انجام شد');
      reloadData();
    } else if (error) {
      showNotification('خطا در انجام عملیات', 'error');
    }
  };

  const handleAdd = () => {
    openModal(createDefault());
  };

  const handleEdit = (rowEntity) => {
    console.log('rowEntity',rowEntity)

    openModal(rowEntity);
  };

  const handleDelete = (entity) => {
    // confirm(`آیا از حذف این آیتم اطمینان دارید؟`).then((isConfirmed) => {
    //   if (isConfirmed) {
    //     axios.delete(`${services.delete}/${entity.id}`)
    //       .then(() => {
    //         showNotification('آیتم با موفقیت حذف شد');
    //         reloadData();
    //       })
    //       .catch(error => {
    //         console.error('Error deleting item:', error);
    //         showNotification('خطا در حذف آیتم', 'error');
    //       });
    //   }
    // });
  };

  return (
    <Box padding={2}>
      <Grid 
        columns={columns} 
        rows={rows} 
        addRowNumber={true} 
        onAdd={handleAdd} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
        paging={true} 
        enableFilters={true}
        enableSorting={true}
        title={title}
      />

      {isModalOpen && (
        <DynamicEditForm 
          open={isModalOpen} 
          entity={currentEntity} 
          onClose={handleCloseModal} 
          webService={services.base}
          formConfig={formConfig}
          title={currentEntity?.id ? `ویرایش ${title}` : `ایجاد ${title}`}
        />
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert 
          onClose={() => setNotification({ ...notification, open: false })} 
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}