import React from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import TasksSummary from '../TasksSummary';
import Chart from './Chart';

const Charts = () => {
    return (
        <Root>
             <Grid container flexDirection='row' alignItems={'center'} justifyContent={'center'}>
                <Grid item xs={6}>
                    <Chart />
                     <Chart/>
                </Grid>
                <Grid item xs={6}>
                    <Chart />
                     <Chart/>
                </Grid>
               
                
             </Grid>
        </Root>
    )
}

export default Charts;


const Root = styled(Paper)(({ theme }) => ({
    gridArea: 'chart',
    overflow: 'auto',
       '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '50%',
  },
  '&::-webkit-scrollbar-track': {
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    maxHeight: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));