import { Box, Grid, Stack, Typography } from "@mui/material";
import { Box1, ChartSuccess } from "iconsax-react";
import DounatChart from "../../../components/DounatChart";

export default function Chart() {
    const states = ['فعال', 'شروع نشده', 'تمام شده', ' عقب افتاده'];
    const data = [15, 12, 10, 3];
    const chartData = {
        labels:states,
        datasets: [
            {
                data: data,
                backgroundColor: [
                    'rgba(1, 147, 168)',
                    'rgba(225, 227, 234)',
                    'rgba(80, 205, 137)',
                    'rgba(241, 76, 65)',
                ]
            },
        ]
    };

    return <Box>
        <Grid container flexDirection='row' alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={4}>
                <Box sx={{p:'1rem'}}>
                    {
                        states.map((item: any, index: number) => {
                            return <Typography key={index} variant="subtitle2">
                                {item} : {data[index]}
                            </Typography>
                        })
                    }
                </Box>
            </Grid>
            <Grid item xs={4} justifySelf={'end'}>
                <DounatChart data={chartData}/>
            </Grid>
        </Grid>
    </Box>
}