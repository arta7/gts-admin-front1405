import React from 'react';
import { Box, Grid, Paper, styled } from '@mui/material'
import TimeSheet from './TimeSheet';
import Personel from './Personel';
import Charts from './Charts';


const HumanCapitalDashboard = () => {
  return (
    <Root>
      <Charts />
      <TimeSheet />
      <Personel />
    </Root>
  )
}

export default HumanCapitalDashboard;

const Root = styled('div')(({ theme }) => ({
  height: 'calc(100vh - 65px)',
  display: 'grid',
  gridGap: '1rem',
  gridTemplateAreas: `"chart chart"
                      "chart chart"
                      "timesheet personel"`,
  gridTemplateRows: '50% 1fr',
  boxSizing: 'border-box',
  padding: '1rem',
}))

