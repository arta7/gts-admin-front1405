import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import DragDropImageUploadDownload from '../../components/fileUpload/DragDropImageUpload'
import { FileUploadDragDropTitle, FileUploadInputTitle } from '../../utils/Messages'

const ImageUploadModal = ({ open, onClose, fileUploadProps }: any) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullWidth={true}>
            <DialogContent>
                <DragDropImageUploadDownload title={FileUploadDragDropTitle} fileUploadButtonTitle={FileUploadInputTitle} {...fileUploadProps} />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>{'بستن'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ImageUploadModal