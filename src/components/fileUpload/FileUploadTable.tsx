import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Stack } from 'react-bootstrap';
import Grid, { CustomAction } from '../grid/Grid';
import { DownloadForOfflineTwoTone } from '@mui/icons-material';

const FileUploadTable = () => {
    
    const customAction: CustomAction = {
        method: () => {
            onShow;
        },
        icon: <DownloadForOfflineTwoTone />,
        tooltip: "نمایش"
    }
    const rows = [{
        title: "دادخواست",
        attachmentType: "کیفری",
        file: "test.pdf",
        fileK:11233,
        date:new Date()
    }, {
        title: "دادخواست",
        attachmentType: "کیفری",
        file: "test.pdf",
         fileK:11233,
        date:new Date()
    }]
    const columns = [
        {
            accessorKey:"title",
            header:'موضوع'
        },
        {
            accessorKey:'attachmentType' ,
            header: 'نوع ضمائم'
        },
        {
            accessorKey: 'file',
            header:'فایل'
        },
          {
            accessorKey: 'fileK',
            header:"حجم فایل"
        },
        {
            accessorKey: 'date',
            header: 'تاریخ',
            meta: {
                type:'date'
            }
        },
       
    ]
  function readFile(file: File) {
        const fileURL = window.URL.createObjectURL(new Blob([file]));
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = file.name;
        alink.click();
    }

    function onShow(row: any): void {
       
    }

    function onDelete(row:any): void {
     
       
    }

    return <Grid columns={columns} rows={rows} addRowNumber={true}  onDelete={onDelete} deleteEdit={true} customAction={customAction}  enableFilters={true}/>
}

export default FileUploadTable;