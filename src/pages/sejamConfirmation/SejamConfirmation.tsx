import { Box } from '@mui/material';
import React from 'react';
import step1 from "../../assets/step-sejam1.png";
import step2 from "../../assets/step-sejam2.png";
import step3 from "../../assets/step-sejam3.png";
import ImageStepper from '../../components/stepper/ImageStepper';
import { Root, StepContainer, StepperContent } from '../../components/stepper/StyledComponents';
import SejamConfirmationStep from './SejamConfirmationStep';
import SejamInfoCompletionStep from './SejamInfoCompletionStep';
import SejamRegistrationStep from './SejamRegistrationStep';
import StepperButton from './StepperButton';

const icons: { [index: string]: string } = {
  1: step1,
  2: step2,
  3: step3
};

const steps = [
  { id: 1, label: 'ثبت نام سجام', description: SejamRegistrationStep },
  { id: 2, label: 'تاییدیه سجام', description: SejamConfirmationStep },
  { id: 3, label: 'اطلاعات تکمیلی', description: SejamInfoCompletionStep }
]

const SejamConfirmation = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [sejamUserInfo, setSejamUserInfo] = React.useState();
  const handleNext = () => {
    if (activeStep < 2) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleGetUserSuccess = (info: any) => {
    setSejamUserInfo(info);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const Description = steps[activeStep].description;

  const stepProps = {
    user: sejamUserInfo
  } as any;
  if (activeStep == 1) {
    stepProps.onSuccess = handleGetUserSuccess;
  }

  let disableNextStep = false;
  if (activeStep == 1 && !sejamUserInfo) {
    disableNextStep = true;
  }

  return (
    <Root>
      <ImageStepper steps={steps} activeStep={activeStep} icons={icons} />

      <StepContainer>
        <StepperContent>
          <Description {...stepProps} />
        </StepperContent>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          {activeStep !== 0 && <StepperButton onClick={handleBack} sx={{ mr: 1 }}>
            {'مرحله قبلی'}
          </StepperButton>
          }
          <StepperButton onClick={handleNext} disabled={disableNextStep}>
            {activeStep === steps.length - 1 ? 'تکمیل فرآیند ثبت نام' : 'مرحله بعدی'}
          </StepperButton>
        </Box>
      </StepContainer>
    </Root>
  )
}

export default SejamConfirmation;