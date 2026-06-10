import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  styled,
  Typography,
} from '@mui/material'
import OtpInput from '../../components/inputs/OtpInput'
import { Link } from 'react-router-dom'
import useCountdown from '../../hooks/useCountDown'
import { toast } from 'react-toastify'
import Timer from '../../utils/Timer'
import axios from 'axios'

const webService = '/user/v1/api';

const SignUpMessageConfirm = ({
  open,
  onClose,
  phoneNumber,
  setConfirm,
  setEditNum,
  formData
}: {
  open: boolean
  onClose: any
  phoneNumber: any
  setConfirm: any
  setEditNum: any,
  formData: any
}) => {
  const token = window.localStorage.getItem('accessToken')
  const getSubmitCode = async () => {

    try {
      const response = await axios.post(`messageing/v1/api/submit`, {
        cellPhoneNumber: phoneNumber.toString()
      }
        // ,{ headers: { authorization: `bearer ${token}` } }
      )

      console.log('response message', response)
    } catch (error) {
      //@ts-ignore
      // const message = error.response.data.result.message || 'خطای غیر منتظره'
      // toast.error(message)
    }
  }
  const getConfirmCode = async () => {
    try {
      const response = await axios.post('messageing/v1/api/confirm', {
        cellPhoneNumber: (phoneNumber.toString()),
        code: otp.toString()
      })
      setConfirm(true)
    } catch (error) {
      //@ts-ignore
      const message = error.response.data.result.message || 'خطای غیر منتظره'
      toast.error(message)
    }
  }
  useEffect(() => {
    if (open) {
      //@ts-ignore
      getSubmitCode()
    }
  }, [open])
  const otpLength = 5
  const [otp, setOtp] = useState('')
  const onOtpChange = (value: string) => setOtp(value)
  const handleSubmit = () => {
    // console.log('otp 1',otp.length,otpLength)
    if (otp.length != otpLength) {
      toast.error('کد وارد شده صحیح نمی باشد!')
    } else {
      // console.log('otp',otp.toString())
      // const response = axios.post('messageing/v1/api/confirm', {
      //   'cellPhoneNumber': phoneNumber.toString(),
      //   'code':otp.toString()
      // })

      // console.log('response verify',response)

      getConfirmCode()
        .then(() => {
          let promise;
          const entityToSave = formData;
          {
            console.log('tets2', entityToSave)
            promise = axios.post(`${webService}/register`, entityToSave);
          }
          promise.then((response) => {
            console.log('response', response)
            const message = 'ثبت نام با موفقیت انجام گردید.'
            toast.error(message)
            onClose()
            setConfirm(true)
          }).catch((error) => {
            console.log('error', error)
          });

        })





    }
  }
  const handleClose = () => {
    setEditNum(true)
    onClose()
  }

  const handleResetTimer = () => {
    const response = axios.post('messageing/v1/api/submit', {
      cellPhoneNumber: (phoneNumber.toString()),
    }
      //,{ headers: { authorization: `bearer ${token}` } }
    )

  }

  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogContent>
        <RootContent>
          <Typography variant="h6">
            {`لطفا کد ارسال شده به شماره `}{' '}
            <Typography
              component={'span'}
              sx={{ direction: 'rtl', color: 'red' }}
              dir="ltr"
              variant="subtitle2"
            >{` (${phoneNumber?.substring(0, 5)}****${phoneNumber?.substring(
              9,
            )}) `}</Typography>
            {' را وارد کنید'}
          </Typography>
          <Typography>
            {`زمان اعتبار کد `}
            <Timer />
          </Typography>
          <OtpInput
            valueLength={otpLength}
            value={otp}
            onChange={onOtpChange}
          />
          <div style={{ display: 'flex' }}>
            <Button onClick={handleClose}>ویرایش شماره همراه</Button>
            <Button onClick={handleResetTimer}>ارسال مجدد</Button>
          </div>
        </RootContent>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {'ارسال'}
        </Button>
        <Button variant="outlined" onClick={handleClose}>
          {'انصراف'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SignUpMessageConfirm

const RootContent = styled('div')(({ theme }) => ({
  padding: '1rem',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '1.5rem 3rem 0rem 3rem',
  gap: '1rem',
}))
