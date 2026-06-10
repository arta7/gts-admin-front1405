import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import 'react-slideshow-image/dist/styles.css'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useAuth } from '../../contexts/AuthContext'
import { Alert, IconButton, Modal, OutlinedInput } from '@mui/material'
import Captcha, { captchaList } from '../Captcha'
import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone'
import baseUrl from '../../utils/Util'
import { toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUp from './SignUp'
import { LoginConfig } from '../../pages/auth/LoginConfigForm'

export default function SignIn(props: {setState:any,config:LoginConfig}) {
  //@ts-ignore
  const { setState,config} = props
  const [open, setOpen] = useState(false)
  let { signIn } = useAuth()
  const [value, setValue] = React.useState(captchaList[getRandomNumber()])
  const [error, setError] = React.useState('')
  const [loginConfig ] = useState<LoginConfig>();
  const handleCloseModal = () => {
    setOpen(false)
  }


  useEffect(()=>{
    console.log('loginConfig',loginConfig)
  },[])

  const resetError = () => {
    setError('')
  }
  function getRandomNumber() {
    return Math.floor(Math.random() * 10)
  }

  return (
    <Formik
      initialValues={{
        userName: '',
        password: '',
        captcha: '',
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        //@ts-ignore
        userName: Yup.string()
          .max(255)
          .required('وارد کردن نام کاربری الزامیست'),
        password: Yup.string().max(255).required('واردکردن رمز عبور الزامیست'),
        captcha: Yup.string().max(255).required('وارد کردن متن تصویر الزامیست'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        if (values.captcha == value) {
          try {
            //@ts-ignore
            await signIn({
              userName: values.userName,
              password: values.password,
            })
          } catch (error) {
            //@ts-ignore
            const message = error.response.data.result.message || 'خطای غیر منتظره'
            console.log('error.response.data.result.message',message)
            toast.error(message)
            setStatus({ success: false })
            setErrors({ submit: message })
            setSubmitting(false)
          }
        } else {
          setError('کد امنیتی وارد شده صحیح نمی باشد')
          setValue(captchaList[getRandomNumber()])
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            helperText={!!touched.userName && errors.userName}
            required
            fullWidth
            value={values.userName}
            label="نام کاربری"
            name="userName"
            type="text"
            id="userName"
            size="small"
            autoComplete="userName"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            helperText={!!touched.password && errors.password}
            name="password"
            value={values.password}
            label="رمز عبور"
            type="password"
            id="password"
            autoComplete="current-password"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FormControlLabel
            style={{ fontSize: '1rem' }}
            control={<Checkbox value="remember" size="small" color="primary" />}
            label="من را بخاطر بسپار"
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              marginTop: '1rem',
            }}
          >
            <Box sx={{ marginRight: '1rem' }}>
              <img
                src={`${baseUrl}/images/captcha/${value}.jpg`}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <IconButton
              color="primary"
              aria-label="reloadCaptcha"
              onClick={() => {
                setValue(captchaList[getRandomNumber()])
              }}
            >
              <CachedTwoToneIcon />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box>
                <OutlinedInput
                  sx={{ paddingRight: 0, fontFamily: 'sans-serif' }}
                  name="captcha"
                  value={values.captcha}
                  placeholder="کد امنیتی"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={error != ''}
                  size="small"
                  required
                />
              </Box>
              <Typography
                component={'div'}
                variant="caption"
                sx={{ color: (theme) => theme.palette.error.main }}
              >
                {error}
              </Typography>
            </Box>
          </Box>
          <Grid
            item
            xs
            style={{
              display: 'flex',
              // flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
           {config.showForgetPasswordLink &&  <Button variant="text" onClick={() => {}}>
              بازیابی رمز عبور
            </Button>}
            {/* { config.showSignUpLink &&  config.showForgetPasswordLink && <>{'/'}</>} */}
            {/* {
              config.showSignUpLink && 
              <Button
                variant="text"
                onClick={() => {
                  setOpen(true)
                }}
              >
                ثبت نام نمایید
              </Button>
            } */}
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              mt: 1,
              mb: 1,
            }}
          >
            <Button
              sx={{ width: '150px', padding: '0.6rem' }}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              <Typography sx={{ fontSize: '1rem' }}> ورود به سامانه</Typography>
            </Button>
            
           { 
           config.showSignUpLink && 
            <Button
                // variant="text"
                onClick={() => {
                  setOpen(true)
                }}
                sx={{ width: '150px', padding: '0.6rem',marginRight:5,marginLeft:5 }}
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                ثبت نام 
              </Button>
         }
              
          </Grid>
          {open && (
          
            <SignUp open={open} onClose={handleCloseModal} setOpen={setOpen} />
          
          )}
        </Box>
      )}
    </Formik>
  )
}
