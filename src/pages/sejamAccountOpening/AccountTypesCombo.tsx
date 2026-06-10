import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { sejamAccountTypes } from '../../staticData/StaticData';
import { Box, Typography } from '@mui/material';
import { SejamAccountType } from '../sejamConfirmation/Types';

const options = sejamAccountTypes;

export default function AccountTypesCombo({ value, onChange }: { value: SejamAccountType | null, onChange: (selectedAccount: SejamAccountType | null) => any }) {
    return (
        <Box  sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Autocomplete
                getOptionLabel={(option) => option.title}
                value={value}
                onChange={(event: any, newValue: SejamAccountType | null) => {
                    onChange(newValue);
                }}
                id="accountTypeDemo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="گروه حساب سرمایه گذاری" />}
            />
            {
                value && <>
                    <Typography>
                        <b>{'دوره سرمایه گذاری : '}</b>{` ${value.investmentDuration} ساله`}
                    </Typography>
                    <Typography>
                        <b>{'درصد کارمزد ثابت : '}</b>{` ${value.fixedCommissionPercentage}`}
                    </Typography>
                    <Typography>
                        <b>{'درصد کارمزد متغیر: '}</b>{` ${value.variableCommissionPercentage}`}
                    </Typography>
                </>
            }
        </Box>
    );
}