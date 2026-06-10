import { Send } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { forwardRef, useImperativeHandle } from "react";
import baseUrl from "../utils/Util";
import refreshCaptcha from '../assets/captcha.png'

export const captchaList = ["00906", "00090", "00184", "00211", "00277", "00437", "00532", "00557", "00694", "00786",
    "02788", "02838", "02908", "02958", "03206", "03298", "03418", "03486", "03538", "03576", "03605", "03648", "03671",
    "03790", "04003", "04018", "04043", "04163", "04283", "04393", "04632", "04700", "04742", "04885", "05005", "05115"
    , "05230", "05235", "05258", "05300", "05350", "05377", "05420", "05837", "05929", "05997", "06049", "06090", "06117", "06237"];

function Captcha(props: any, ref: any) {
    const [value, setValue] = React.useState(captchaList[getRandomNumber()]);
    const [inputValue, setInputValue] = React.useState('');
    const [error, setError] = React.useState("");

    function getRandomNumber() {
        return (Math.floor(Math.random() * 50));
    }

    useImperativeHandle(ref, () => {
        return {
            handleSubmit: handleSubmit,
            refresh:onRefresh
        };
    }, [inputValue, value, error]);

    const handleSubmit = (e: any) => {
        if (inputValue == value) {
            return true;
        }
        setError("کد امنیتی وارد شده صحیح نمی باشد");
        return false;
    }

    const onInputChange = (e: any) => {
        setInputValue(e.target.value);
        if (error) {
            resetError();
        }
    }

    const resetError = () => {
        setError('')
    }

    const onRefresh = () => {
        const newValue = captchaList[getRandomNumber()];
        setValue(newValue);
        resetError();
        setInputValue('');
    }

    return <Box sx={{ display: 'flex', flexDirection: 'column', width: '200px', padding: '.5rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2px' }}>
            <img src={refreshCaptcha} style={{ width: '20%', height: '100%' }} onClick={onRefresh} />
            <img src={`${baseUrl}/images/captcha/${value}.jpg`} style={{ width: '80%', height: '100%' }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box>
                <OutlinedInput value={inputValue} onChange={onInputChange} sx={{ paddingRight: 0 }} name="value" placeholder="کد امنیتی" error={error != ""} size="small" />
            </Box>
            <Typography component={'div'} variant="caption" sx={{ color: (theme) => theme.palette.error.main }}>{error}</Typography>
        </Box>
    </Box>
}

export default forwardRef(Captcha);