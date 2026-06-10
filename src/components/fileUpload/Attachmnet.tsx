import {Button, styled } from '@mui/material';
import { useState } from 'react';
import FileUploadInput from './FileUploadInput';
import { TextFieldControl } from '../FormControl/TextFieldControl';
import { useForm } from 'react-hook-form';
import { base64ToFile} from '../../utils/helpers';
import Grid, { CustomAction } from '../grid/Grid';
import { DownloadForOfflineTwoTone } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAsync } from '../../hooks/useAsync';
import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { inValidResponseFormatGridRows } from '../../utils/Messages';
import { error } from 'console';
import { getServerError } from '../../utils/axios';

const AttachmentForm = ({ title, fileUploadButtonTitle, value, onChange, componentId, componentName, row, ownerId }:
    { title: string, fileUploadButtonTitle: string, value:any, onChange: (val: any) => any, componentId: any, componentName: any, row: any, ownerId: any }) => {
    const { control, handleSubmit,reset } = useForm();
    const [contentfile, setContent] = useState();
    let result: any;
    const { run, data: rows, isLoading, isIdle, isError, isSuccess } = useAsync(
        null,
    )
    const url = '/attachment/v1/api/fetch'
    function readFile(file: File) {
        const fileURL = window.URL.createObjectURL(new Blob([file]));
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = file.name;
        alink.click();
    }

    const loadData = () =>
        axios
            .get(`/attachment/v1/api/fetch/${Number(componentId)}/${Number(row.masterId)}`)
            .then((response: any) => {
                response?.data?.result?.map((x: any) => {
                    x.fileName = base64ToFile(x.fileContent, x.fileName, x.fileExtension).name,
                        x.fileContent = base64ToFile(x.fileContent, x.fileName, x.fileExtension)
                })
                if (!response.data.result) {
                    toast.error(inValidResponseFormatGridRows)
                    return []
                }
                return response.data.result
            })
    React.useEffect(() => {
        run(loadData())
    }, [])
    const onSubmit = async (data: any) => {
        if (data && contentfile) {
            result = {
                componentId: Number(componentId),
                ownerId: Number(row.masterId),
                fileName: value?.name.split('.')[0],
                fileExtension: value?.name.split('.')[1],
                fileContent: contentfile,
                fileSize: Number(value?.size),
                attachmentType: data.attachmentType,
                componentName: componentName,
            }
           
                const response = await axios.post('attachment/v1/api/create', result)
                run(loadData()).then(() => {
                    onChange('')
                    reset({attachmentType:''});
                })
          
        }
        
    }
    function onShow(row: any): void {
        readFile(row.fileContent);
    }
    const customAction: CustomAction = {
        method: (row: any) => {
            onShow(row);
        },
        icon: <DownloadForOfflineTwoTone />,
        tooltip: "نمایش"
    }

    const columns = [
        {
            accessorKey: "componentName",
            header: 'موضوع'
        },
        {
            accessorKey: 'attachmentType',
            header: 'نوع ضمائم'
        },
        {
            accessorKey: 'fileName',
            header: 'فایل'
        },
        {
            accessorKey: 'fileSize',
            header: "حجم فایل"
        },
        {
            accessorKey: 'registerDate',
            header: 'تاریخ',
            meta: {
                type: 'date'
            }
        },
       
    ]

    function onDelete(row: any): void {
        axios
            .delete(
                `/attachment/v1/api/remove/${Number(row.id)}`,
            )
            .then((res) => {
                run(loadData())
            })
       
    }

    return (
        (isLoading || isIdle) ? <Root1><GridLoader color="#36d7b7" /></Root1> : <Root>
            <Container>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUploadInput title={title} fileUploadButtonTitle={fileUploadButtonTitle} value={value} onChange={onChange} setContent={setContent} />
                    <TextFieldControl name={'attachmentType'} label={"نوع ضمیمه"} control={control} required={true} />
                    <Button variant='contained' style={{ alignItems: "self-end", marginTop: '1rem' }} type='submit'>{'ارسال'}</Button>
                </form>
            </Container>
            <Grid columns={columns} rows={rows} addRowNumber={true} onDelete={onDelete} deleteEdit={true} customAction={customAction} enableFilters={true} />
        </Root>
    );
}

export default AttachmentForm;

const Root = styled('div')(({ theme }: any) => ({
    display: 'flex',
    flexDirection: 'column',
}));
        
const Root1 = styled('div')(({ theme }: any) => ({
     display: 'flex',
    width: "100%",
    height:"400px",
    gap: '0.2rem',
    justifyContent: 'center',
    alignItems:'center'
}));

const Container = styled('div')(({ theme }: any) => ({
    display: 'flex',
    width: "50%",
    gap:'0.2rem'
}));
