import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Fieldset from '../../components/Fieldset';
import FileUploadButton from '../../components/fileUpload/FileUploadButton';
import Combo from '../../components/inputs/Combo';
import FileUploadModal from './FileUploadModal';
import { jensiat, mokhatabVizhe, noeShoghl, raveshAshnai, tahsilat, vaziatTaahol } from '../../staticData/StaticData';

const SejamInfoCompletionStep = () => {
    const { control, handleSubmit } = useForm();
    const [open, setOpen] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = useState<Array<any>>([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const getFileUploadLabel = (fileCount: number) => {
        if (!fileCount) {
            return '';
        }
        return `${fileCount} فایل ضمیمه شد`;
    }
    const onSubmit = (data: any) => {

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Fieldset title={'مشخصات تکمیلی'}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={4}>
                            <Combo name={'raveshAshnai'} options={raveshAshnai} label='روش آشنایی' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Combo name={'jensiat'} options={jensiat} label='جنسیت' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Combo name={'noeShoghl'} options={noeShoghl} label='نوع شغل' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Combo name={'vaziatTaahol'} options={vaziatTaahol} label='وضعیت تاهل' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Combo name={'tahsilat'} options={tahsilat} label='تحصیلات' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <Combo name={'mokhatabVizhe'} options={mokhatabVizhe} label='آیا شامل مخاطبین ویژه حساب می شوید؟' control={control} required={true} />
                        </Grid>
                        <Grid xs={12} marginY={'1.5rem'}>
                            <Divider />
                        </Grid>
                    </Grid>
                </Fieldset>
                <Fieldset title='مستندات و فایلهای ضمیمه'>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='تصویر کارت ملی' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='تصویر پشت کارت ملی' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='تصویر صفحه اول شناسنامه' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='تصویر صفحه توضیحات شناسنامه' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='عکس مدرک مخاطبین ویژه' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='تصویر تایید شماره شبا بانکی' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} marginY={'1.5rem'}>
                            <Divider />
                        </Grid>
                        <Grid xs={12}>
                            <Typography component={'div'} fontSize='1rem' fontWeight={'bold'}>مدارک هویتی حقوقی شرکت</Typography>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='روزنامه رسمی' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='آخرین تغییرات' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <FileUploadButton onClick={handleOpen} label='نامه نمایندگی' value={getFileUploadLabel(selectedFiles.length)} />
                        </Grid>

                    </Grid>
                </Fieldset>
            </Box>




            <FileUploadModal open={open} onSubmit={handleClose} onClose={handleClose} fileUploadProps={{
                value: selectedFiles,
                onChange: setSelectedFiles
            }} />
        </form>
    )
}

export default SejamInfoCompletionStep