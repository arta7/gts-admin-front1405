import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DounatChart({data}:any) {
    return <Box sx={{ width: '80%', height: '80%' }}>
        <Doughnut data={data} options={{
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }} />
    </Box>;
}