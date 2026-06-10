import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, styled, Tooltip } from '@mui/material';
import { useEffect, useRef } from 'react';
import { base64ToImage } from '../../utils/Util';
import DrageDropImageUploader from './DragDropImageUploader';


const DragDropImageUpload = ({ title, fileUploadButtonTitle, value, onChange }: { title: string, fileUploadButtonTitle: string, value: Array<any>, onChange: (val: Array<any>) => any }) => {
    const ref: any = useRef();

    useEffect(() => {
        if (ref.current && ref.current.children.length) {
            value.map((base64Image: any, index: number) => {
                base64ToImage(base64Image).then((image) => {
                    ref.current.querySelector(`#imageViewer${index}`).innerHTML = '';
                    ref.current.querySelector(`#imageViewer${index}`).appendChild(image);
                })
            })
        }
    }, [value])

    function deleteImage(index: number): void {
        const _files = [...value];
        _files.splice(index, 1);
        onChange(_files);
    }

    const handleChange = (files: any) => {
        onChange(files)
    }

    return (
        <Root>
            <DrageDropImageUploader title={title} fileUploadButtonTitle={fileUploadButtonTitle} value={value} onChange={handleChange} />
            <FileInfoContainer>
                <Thumbnails id={`imageViewerContainer`} ref={ref}>
                    {
                        value.map((image: any, index: number) => {
                            return <Box sx={{ padding: '.5rem', display: 'flex', gap: '.2rem', border: '1px dashed gray', borderRadius: '.3rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div id={`imageViewer${index}`} className="imageViewer">

                                </div>
                                <Tooltip title={'حذف تصویر'}>
                                    <IconButton color='error' aria-label="delete" onClick={() => { deleteImage(index) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        })
                    }
                </Thumbnails>
            </FileInfoContainer>
        </Root>
    );
}

export default DragDropImageUpload;

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

const Thumbnails = styled('div')(({ theme }: any) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: '.5rem',
    '& .imageViewer > img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    '& .imageViewer': {
        width: '150px',
        height: '150px'
    }
}));



