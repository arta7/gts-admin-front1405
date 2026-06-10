import React from 'react';
import { styled } from '@mui/material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import StepIcon from './StepIcon';

export type Step={
  id:number,
  label:string,
  description:any
}

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ImageStepper = ({ steps, activeStep, icons }: { steps: Array<Step>, activeStep: number, icons: any }) => {
  return (
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
      {steps.map((step: { id: number, label: string }) => (
        <Step key={step.id}>
          <StepLabel StepIconComponent={StepIcon} StepIconProps={{
            icon: icons[String(step.id)]
          }}>{step.label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

export default ImageStepper
