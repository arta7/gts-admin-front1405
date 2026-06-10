import { styled } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

const StepperButton = (props:ButtonProps) => {
  return (
    <StyledStepperButton {...props} variant={'contained'}>{props.children}</StyledStepperButton>
  )
}

export default StepperButton 

const StyledStepperButton = styled(Button)(({ theme: any }) => ({
    backgroundColor: '#ffe3ae',
    '&:hover': { backgroundColor: '#ffe3ae' },
    borderRadius: '3rem'
}));