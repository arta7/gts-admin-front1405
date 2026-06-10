import {  styled } from '@mui/material';
import { base64ToFile, } from '../../utils/helpers';
import Grid, { CustomAction } from '../grid/Grid';
import { DownloadForOfflineTwoTone } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAsync } from '../../hooks/useAsync';
import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { inValidResponseFormatGridRows } from '../../utils/Messages';

const AttachmentList = ({  componentId,  ownerId,row }:
    { componentId: any,ownerId:any,row:any }) => {
    const { run, data: rows, isLoading, isIdle, isError, isSuccess } = useAsync(
    null,
  )
  const loadData = () =>
    axios
      .get(`/attachment/v1/api/master-grid/fetch/${Number(componentId)}/${Number(row.masterId)}`)
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
  
  function readFile(file: File) {
        const fileURL = window.URL.createObjectURL(new Blob([file]));
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = file.name;
        alink.click();
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
         (isLoading || isIdle)?<Root1><GridLoader color="#36d7b7" /></Root1>:
        <Root>
         <Grid columns={columns} rows={rows} addRowNumber={true} removeDelete={true} enableFilters={true} deleteEdit={true} customAction={customAction} />
        </Root>
    );
}

export default AttachmentList;

const Root = styled('div')(({ theme }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    
}));

const Root1 = styled('div')(({ theme }: any) => ({
     display: 'flex',
    width: "100%",
    height:"300px",
    gap: '0.2rem',
    justifyContent: 'center',
    alignItems:'center'
}));
