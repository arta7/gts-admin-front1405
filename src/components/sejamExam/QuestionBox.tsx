import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

export type QuestionInfo = {
    question: string,
    answers: Array<string>
}

const answerLabels = ['الف', 'ب', 'ج', 'د'];

const QuestionBox = ({ question: questionInfo, value, onChange, id, show }: { id: number, question: QuestionInfo, value: number, show: boolean, onChange: (question: number, answer: number) => any }) => {
    const { question, answers } = questionInfo
    const radioGroupId = `radio-buttons-group-${id}`;
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(id, (event.target as HTMLInputElement).value as any);
    };

    return (
        <FormControl sx={{ display: show ? 'block' : 'none' }}>
            <FormLabel id={radioGroupId}>
                <Typography fontWeight={'bold'} fontSize={'1.2rem'}>{`${id + 1} . ${question}`}</Typography>
            </FormLabel>
            <RadioGroup
                aria-labelledby={radioGroupId}
                name={radioGroupId}
                value={value}
                onChange={handleChange}
            >
                {
                    answers.map((answer: string, answerIndex: number) => {
                        if (answers.length > 4) {
                            return <FormControlLabel value={answerIndex} control={<Radio />} label={answer} />
                        }
                        return <FormControlLabel value={answerIndex} control={<Radio />} label={`${answerLabels[answerIndex]} - ${answer}`} />
                    })
                }
            </RadioGroup>
        </FormControl>
    )
};

export default QuestionBox