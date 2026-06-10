import { Close } from "@mui/icons-material";
import { DialogTitle as MuiDialogTitle, IconButton} from "@mui/material";

export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose: () => void;
}
  
export function DialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;
  
    return (
      <MuiDialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
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
            <Close />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  }