import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogContent, IconButton, Tooltip } from '@mui/material';
import { useEffect, useRef } from 'react';
import { DialogTitle } from '../definition/DialogTitle';

const ImageViewerModal = ({ image, name, open, onClose, onDelete }: { image: any, open: boolean, onClose: any, name: string, onDelete: any }) => {
  const ref: any = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.appendChild(image);
      }
    })
  }, [image, ref.current])
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle onClose={() => onClose()} />
      <DialogContent sx={{ p: '2rem', display: 'flex', gap: '.2rem', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div id={`imageViewerContainer`} ref={ref}>
        
        </div>
        <Tooltip title={'حذف تصویر'}>
            <IconButton color='error' aria-label="delete" onClick={() => {
              onDelete(name);
              onClose()
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
      </DialogContent>
    </Dialog>
  )
}

export default ImageViewerModal