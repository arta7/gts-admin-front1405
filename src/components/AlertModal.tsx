import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { Warning2 } from 'iconsax-react'
import React from 'react'

const AlertModal = ({ open, onClose, children }: any) => {
    return (
        <Dialog open={open}>
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
                        {children}
                    </div>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} variant={'contained'}>متوجه شدم</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertModal;
