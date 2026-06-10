import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export default function AlertDialog(props: any) {
  const { control, text, title, setisConfirmed } = props
  const [open, setOpen] = React.useState(control)
  const handleClose = () => {
    setOpen(false)
  }
  const handleClick = () => {
    setisConfirmed(true)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>خیر</Button>
        <Button onClick={handleClick} autoFocus>
          بله
        </Button>
      </DialogActions>
    </Dialog>
  )
}
