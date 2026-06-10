import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';


import QuestionBox, { QuestionInfo } from './sejamExam/QuestionBox';

import { Button, Checkbox, FormControlLabel, TextareaAutosize, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { RiskTestActionKind, SejamRiskTestState } from '../reducers/SejamRiskTestReducer';
import StepperButton from '../pages/sejamConfirmation/StepperButton';
const agrementCheckBoxLabel = 'اینجانب کلیه پرسش های موجود در فرم ها و پرسش نامه را به دقت مطالعه نموده و به آنها پاسخ داده ام. ضمناً، تعهد مینمایم در صورت وقوع هرگونه اتفاقی که به نحوی موجب تغییر بااهمیت در اطلاعات موجود در این فرم ها و پرسش نامه شود، مراتب را به سبدگردان خود اطلاع دهم.'

const SejamRiskTestStep = ({ dispatch, questions, state }: { questions: Array<any>, state: SejamRiskTestState, dispatch: (param: { type: RiskTestActionKind, payload: any }) => any }) => {
  const { agreeTest, moreInfo, answers } = state;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const unAnsweredQuestions = answers.filter(a => a == undefined);
  const [startTest, setStartTest] = React.useState(unAnsweredQuestions.length != questions.length);

  const containerStyle = { display: 'flex', flexDirection: 'column', gap: '2rem' };

  const onChange = (question: number, answer: number) => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
    dispatch({
      type: RiskTestActionKind.answer, payload: {
        question: question,
        answer: answer
      }
    })
  }

  const handleQuestionChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentQuestion(value);
  }

  const handleTestAgreement = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: RiskTestActionKind.agreeTest, payload: e.target.checked });
  };

  const handleMoreInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({ type: RiskTestActionKind.setDescription, payload: e.target.value });
  };

  return (
    <>
      {
        startTest ? <Box sx={containerStyle}>
          <Typography fontSize={'1.5rem'} alignSelf='end' fontWeight={500}>{`سوال ${currentQuestion + 1} از ${questions.length}`}</Typography>
          {questions.map((item: QuestionInfo, index: number) => {
            return <QuestionBox show={currentQuestion == index} id={index} key={index} question={item} onChange={onChange} value={answers[index] as any} />
          })}

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <Button onClick={(e) => handleQuestionChange(e, currentQuestion - 1)} disabled={currentQuestion == 0} sx={{ borderRadius: '3rem' }} size='large' variant='contained' startIcon={<ArrowForwardIosIcon />}>قبلی</Button>
            <Button onClick={(e) => handleQuestionChange(e, currentQuestion + 1)} disabled={currentQuestion == questions.length - 1 || answers[currentQuestion] == undefined} sx={{ borderRadius: '3rem' }} size='large' variant='contained' endIcon={<ArrowBackIosIcon />}>بعدی</Button>
          </Box>
        </Box>
          :
          <Box sx={{ ...containerStyle, alignItems: 'center' }}>
            <Typography fontSize={'1.3rem'}>
              آزمون سنجش ریسک امکانی است که شما با کمک آن میتوانید مناسب ترین حساب سرمایه گذاری را با توجه به ریسک پذیری خود انتخاب کنید. آزمون ریسک سنجی شما توسط متخصصین و تحلیل گران شرکت بررسی شده و متناسب با آن، بهترین حساب سرمایه گذاری به شما پیشنهاد می شود. لذا خواهشمنداست به تمامی سوالات با دقت پاسخ دهید.
            </Typography>
            <div>
              <StepperButton size={'large'} sx={{ borderRadius: '50%', padding: '1.5rem' }} onClick={() => setStartTest(true)}>شروع</StepperButton>
            </div>
          </Box>
      }
      {
        unAnsweredQuestions.length == 0 && <Box sx={{ ...containerStyle, marginTop: '3rem' }}>
          <Typography>
            هرگونه اطلاعات بیشتری را که فکر می کنید در ارزیابی وضعیت مالی شما توسط سبدگردان مفید خواهد بود، توضیح دهید.
          </Typography>
          <TextareaAutosize value={moreInfo} onChange={handleMoreInfoChange} id={'moreInfo'} minRows={3} style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontFamily: 'vazirmatn' }} />
          <FormControlLabel control={<Checkbox onChange={handleTestAgreement} checked={agreeTest} />} label={agrementCheckBoxLabel} />
        </Box>
      }
    </>
  )
}

export default SejamRiskTestStep