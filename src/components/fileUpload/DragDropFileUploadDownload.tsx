import { Box, styled } from '@mui/material';
import { useState } from 'react';
import DrageDropFileUpload from './DragDropFileUpload';
import FileUploadList from './FileUploadList';

const DragDropImageUploadDownload = ({ title, fileUploadButtonTitle, value, onChange }: { title: string, fileUploadButtonTitle: string, value: Array<any>, onChange: (val: Array<any>) => any }) => {
    function readFile(file: File) {
        const fileURL = window.URL.createObjectURL(new Blob([file]));
        let alink = document.createElement('a');
        alink.href = fileURL;
        alink.download = file.name;
        alink.click();
    }

    function showImage(file: any, index: number): void {
        readFile(file);
    }

    function deleteImage(file: any, index: number): void {
        const _files = [...value];
        _files.splice(index, 1);
        onChange(_files);
       
    }

    return (
        <Root>
            <DrageDropFileUpload title={title} fileUploadButtonTitle={fileUploadButtonTitle} value={value} onChange={onChange} />
            <FileInfoContainer>
                <Box sx={{ minWidth: '400px' }}>
                   <FileUploadList value={value} onDelete={deleteImage } onShow={showImage}/>
                </Box>
            </FileInfoContainer>
        </Root>
    );
}

export default DragDropImageUploadDownload;

const Root = styled('div')(({ theme }: any) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '.5rem'
}));

const FileInfoContainer = styled('div')(({ theme }: any) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '.2rem'
}));