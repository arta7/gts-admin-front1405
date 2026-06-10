import { Box } from "@mui/material";

export default function ImageIcon({ image, sx = {}, boxShadow = 0, size = 50 }: { image: any, size?: number, sx?: any, boxShadow?: number }) {
    const defaultStyles = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%', margin: 'auto',
        padding: '3px'
    };
    return <Box boxShadow={boxShadow} sx={{ ...defaultStyles, ...sx }} className={'imgIconRoot'}>
        <img src={image} style={{ width: '100%', height: '100%' }} />
    </Box>
}