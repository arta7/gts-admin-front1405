import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { Stack } from 'react-bootstrap';

const FileUploadList = ({ value, onDelete, onShow }: { value: any[], onDelete: (file: any, index: number) => void, onShow: (file: any, index: number) => void }) => {
    return <List dense={true}>
        {value.map((file, index) => <ListItem
            secondaryAction={<Stack direction='horizontal'>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(file, index)}>
                    <DeleteIcon />
                </IconButton>
                <IconButton edge="end" aria-label="show">
                    <VisibilityIcon onClick={() => onShow(file, index)} />
                </IconButton>
            </Stack>}
        >
            <ListItemText primary={file.name} secondary={`حجم: ${file.size}`} />
        </ListItem>
        )}
    </List>;
}

export default FileUploadList;