import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, styled, Typography } from '@mui/material';
import OtpInput from '../../components/inputs/OtpInput';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';


const OtpModal = ({ open, onClose, timer, resetTimer, disableResetTimer, validCodeTimer }: { open: boolean, onClose: (code?: string) => any, timer: string, resetTimer: any, disableResetTimer: boolean, validCodeTimer: string }) => {
    const { user: { cellPhoneNumber } }: any = useAuth();
    const otpLength = 5;
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const onOtpChange = (value: string) => setOtp(value);
    const handleSubmit = () => {
        if (otp.length != otpLength) {
            toast.error('کد وارد شده صحیح نمی باشد!')
        }
        else {
            onClose(otp);
        }
    };
    const handleClose = () => {
        onClose();
    }

    const handleResetTimer = () => {
        resetTimer();
        setOtp('');
    }

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogContent>
                <RootContent>
                    <Typography variant='h6'>{`لطفا کد ارسال شده به شماره `} <Typography component={'span'} 
                    sx={{ direction: 'rtl', color: 'red' }} dir='ltr' variant='subtitle2'>{` (${cellPhoneNumber.substring(0, 5)}****${cellPhoneNumber.substring(9)}) `}</Typography>{' را وارد کنید'}</Typography>
                    <Typography>
                        {`زمان اعتبار کد ${validCodeTimer}`}
                    </Typography>
                    <OtpInput valueLength={otpLength} value={otp} onChange={onOtpChange} />
                    <Typography component={Link} to={'/UserAccount/AccountInformation/MyProfile'} state={{ redirectTo: location }} sx={{ textDecoration: 'none' }}>ویرایش شماره همراه</Typography>
                    <Button disabled={disableResetTimer} onClick={handleResetTimer}>
                        {disableResetTimer ? `ارسال مجدد پس از ${timer}` : 'ارسال مجدد'}
                    </Button>
                </RootContent>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' disabled={validCodeTimer == "00:00"} onClick={handleSubmit}>{'ارسال'}</Button>
                <Button variant='outlined' onClick={handleClose}>{'انصراف'}</Button>
            </DialogActions>

        </Dialog>
    )
}

export default OtpModal;

const RootContent = styled('div')(({ theme }) => ({
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '1.5rem 3rem 0rem 3rem',
    gap: '1rem'
}));