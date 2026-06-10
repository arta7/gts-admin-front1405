import { Box, Paper, styled } from '@mui/material';
export const Root = styled(Box)(({ theme }) => ({
    padding: '1rem',
    overflowY: 'auto',
    height: 'calc(100% - 64px)'
}));

export const StepContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    margin: '1.5rem 3rem 0rem 3rem',
    gap: '1rem'
}));

export const StepperContent = styled(Paper)(({ theme }) => ({
    padding: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem'
}));