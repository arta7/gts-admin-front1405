import { Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material'
import DragDropFileUploadDownload from './fileUpload/DragDropFileUploadDownload'
import { FileUploadDragDropTitle, FileUploadInputTitle } from '../utils/Messages'
import AttachmentForm from './fileUpload/Attachmnet'
import FileUploadTable from './fileUpload/FileUploadTable'
import { CloseTwoTone } from '@mui/icons-material'
import AttachmentList from './fileUpload/AttachmentList'

const AttachmentModal = ({ open, onClose, onSubmit, fileUploadProps, row, componentName }: any) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth={'md'} fullWidth={true}>
            <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseTwoTone />
        </IconButton>
            <DialogContent>
          {componentName === 'Grid' ? <AttachmentList {...fileUploadProps} row={row} /> :
            <AttachmentForm title={FileUploadDragDropTitle} fileUploadButtonTitle={FileUploadInputTitle} {...fileUploadProps} row={row} />}
            </DialogContent>
        </Dialog>
    )
}

export default AttachmentModal