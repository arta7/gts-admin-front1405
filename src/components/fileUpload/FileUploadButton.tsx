import Chip from '@mui/material/Chip'
import React from 'react';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { Box, InputAdornment, styled, TextField } from '@mui/material';

const FileUploadButton = ({ onClick, value, label }: { onClick: () => any, label: string, value: string }) => {
    return (
        <TextField
            fullWidth={true}
            label={label}
            value={value}
            sx={{
                '&	.MuiOutlinedInput-root': {
                    paddingRight: 0,
                    borderRadius: '30px'
                }
            }}
            InputProps={{
                endAdornment: <InputIcon onClick={onClick} position="start">{<AttachmentIcon />}</InputIcon>,
            }}
        />
    )
}

const InputIcon = styled(InputAdornment)(({ theme }: any) => ({
    backgroundColor: theme.palette.divider,
    padding: '27.5px 30px',
    borderTopRightRadius: 30 + 'px',
    borderBottomRightRadius: 30 + 'px',
    marginRight: 0
}));

export default FileUploadButton
