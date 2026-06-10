import { Button, Dialog, DialogActions, DialogContent } from '@mui/material'
import DragDropFileUploadDownload from '../../components/fileUpload/DragDropFileUploadDownload'
import { FileUploadDragDropTitle, FileUploadInputTitle } from '../../utils/Messages'

const FileUploadModal = ({ open, onClose, onSubmit, fileUploadProps }: any) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={'lg'} fullWidth={true}>
            <DialogContent>
                <DragDropFileUploadDownload title={FileUploadDragDropTitle} fileUploadButtonTitle={FileUploadInputTitle} {...fileUploadProps} />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={onSubmit}>{'ارسال'}</Button>
                <Button variant='outlined' onClick={onClose}>{'انصراف'}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default FileUploadModal