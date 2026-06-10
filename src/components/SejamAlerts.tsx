import Typography from "@mui/material/Typography"
import AlertModal from "./AlertModal"

export const AgreeTestAlert = ({ open, onClose }: any) => {
   return <AlertModal open={open} onClose={() => onClose(false)}>
        <Typography variant='h6'>
            {'جهت مشاهده نتیجه لطفا موافقت با آزمون سنجش ریسک را تیک بزنید.'}
        </Typography>
    </AlertModal>
}