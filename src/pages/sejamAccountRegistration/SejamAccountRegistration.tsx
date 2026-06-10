import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import React, { useReducer } from 'react'
import ImageStepper from '../../components/stepper/ImageStepper';
import { Root, StepContainer, StepperContent } from '../../components/stepper/StyledComponents';
import step1 from "../../assets/step-sejam3.png";
import step2 from "../../assets/step-hesab.png";
import step3 from "../../assets/step-gharardad.png";
import StepperButton from '../sejamConfirmation/StepperButton';
import SejamRiskTestStep from '../../components/SejamRiskTestStep';
import SejamSuggestAccount from '../../components/SejamSuggestAccount';
import SejamAccountContractStep from './SejamAccountContractStep';
import { initialRiskTestState, RiskTestActionKind, riskTestReducer } from '../../reducers/SejamRiskTestReducer';

import AlertModal from '../../components/AlertModal';
import { sejamAnswerKeys, sejamRiskTestQuestions } from '../../staticData/StaticData';
import { isTestCompleted } from '../../utils/SejamUtils';
import { AgreeTestAlert } from '../../components/SejamAlerts';

const SejamAccountRegistration = () => {
    const [state, dispatch] = useReducer(riskTestReducer, initialRiskTestState);

    const { agreeTest, moreInfo, suggestedAccount, answers, riskLevel } = state;

    const [showAgreeTestAlert, setShowAgreeTestAlert] = React.useState(false);
    const [accountRequiredAlert, setAccountRequiredAlert] = React.useState(false);

    const [activeStep, setActiveStep] = React.useState(0);

    const icons: { [index: string]: string } = {
        1: step1,
        2: step2,
        3: step3
    };

    const steps = [
        { id: 1, label: 'سنجش ریسک', description: SejamRiskTestStep },
        { id: 2, label: 'انتخاب حساب', description: SejamSuggestAccount },
        { id: 3, label: 'قرارداد حساب', description: SejamAccountContractStep }
    ]

    const Description = steps[activeStep].description;

    const handleNext = () => {
        if (activeStep == 0) {
            if (!agreeTest) {
                setShowAgreeTestAlert(true);
                return;
            }
            else {
                dispatch({ type: RiskTestActionKind.getTestResult, payload: sejamAnswerKeys })
            }
        }
        if (activeStep < 2) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepProps: any = {};
    if (activeStep == 0) {
        stepProps.state = state;
        stepProps.questions = sejamRiskTestQuestions;
        stepProps.dispatch = dispatch;
    }
    if (activeStep == 1) {
        stepProps.suggestedAccount = suggestedAccount;
        stepProps.riskLevel = riskLevel;
    }

    const disableNext = () => {
        if (activeStep == 0) {
            return !isTestCompleted(answers);
        }
        return false;
    }

    return (
        <Root>
            <ImageStepper steps={steps} activeStep={activeStep} icons={icons} />
            <StepContainer>
                <StepperContent>
                    <Description {...stepProps} />
                </StepperContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {activeStep !== 0 && <StepperButton onClick={handleBack} sx={{ mr: 1 }}
                    >
                        {'مرحله قبلی'}
                    </StepperButton>
                    }
                    <StepperButton onClick={handleNext} disabled={disableNext()}>
                        {activeStep === steps.length - 1 ? 'پایان و ثبت اطلاعات' : 'مرحله بعدی'}
                    </StepperButton>
                </Box>
            </StepContainer>
            <AgreeTestAlert open={showAgreeTestAlert} onClose={() => setShowAgreeTestAlert(false)} />
            <AlertModal open={accountRequiredAlert} onClose={() => setAccountRequiredAlert(false)}>
                <Typography variant='h6'>
                    {'لطفا حساب سرمایه گذاری مورد نظر را انتخاب کنید.'}
                </Typography>
            </AlertModal>
        </Root>
    )
}

export default SejamAccountRegistration