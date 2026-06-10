import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { Warning2 } from 'iconsax-react';
import React from 'react';
import { createPortal } from 'react-dom';
import useConfirm from './UseConfirmDialog';

const ConfirmDialog = () => {
    const { onConfirm, onCancel, confirmState } = useConfirm();

    const portalElement = document.getElementById('portal') as any;
    const component = <Dialog open={confirmState.show}>
        <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    <Warning2
                        size="64"
                        color="#f47373"
                        variant="Bulk"
                    />
                </div>
                <div>
                    <Typography variant='h6'>
                        {confirmState.text}
                    </Typography>
                </div>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onConfirm} variant={'contained'}>بله</Button>
            <Button onClick={onCancel} variant={'contained'}>خیر</Button>
        </DialogActions>
    </Dialog>
    return createPortal(component, portalElement);
};
export default ConfirmDialog;