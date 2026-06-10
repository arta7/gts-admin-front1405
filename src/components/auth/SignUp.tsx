import { useForm, Controller } from 'react-hook-form'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../../utils/Util'
import { useState, useEffect } from 'react'
import { theme } from '../../contexts/ThemeContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'
import OtpModal from '../../pages/sejamConfirmation/OtpModal'
import SignUpMessageConfirm from './SignupMessageConfirm'
import useCountdown from '../../hooks/useCountDown'
import { Dropdown } from 'react-bootstrap';
import AsyncComboInput from '../inputs/AsyncComboInput'
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 10,
  borderRadius: '5px',
  pt: 1,
  px: 2,
  pb: 1,
}



const SignUp = (props: any) => {
  const { setState, onClose, open, setOpen } = props
  const { signUp } = useAuth()
  const [openOtpModal, setOpenOtpModal] = useState<boolean>(false)
  const [confirm, setConfirm] = useState(false)
  const [editNum, setEditNum] = useState(false)
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   userName: '',
    //   email: '',
    //   // password: '',
    //   // rePassword: '',
    // }
    
  })
  const [formData,setFormData]=useState()
  const [swalOpen, setSwalOpen] = useState(false)
  const [tabControl, setControl] = useState(false)
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setControl(name ? true : false)
      setSwalOpen(tabControl)
    })
  }, [watch])

  const onCancel = () => {
    setSwalOpen(false)
  }

  const handleCloseOtpModal = () => {
    if (confirm) {
      setOpenOtpModal(false)
    }
     if (editNum) {
      setOpenOtpModal(false)
    }
  }

  const onSubmit = (data: any) => {
    data = Object.assign({}, data, {isActive: true})
    data = Object.assign({}, data, {password:data.userName,rePassword:data.userName,'UnitId':data.LicenseType == 1 ?  Number('41') : Number('42')})
    
       console.log('data',data)
    if (!confirm){
     
      setOpenOtpModal(true)
      setFormData(data)
     }
  }
  const signup = async () => {
      if (confirm && formData) {
       try {
        //@ts-ignore 
        // await signUp(formData).then(()=>{
          setOpen(false)
        onClose()
      // )
      } catch (error) {
        //@ts-ignore
        const message = error.response.data.result.message || 'خطای غیر منتظره'
        toast.error(message)
      }
    } 
  }

  const UserValue = [{id:1,name:'حقیقی'},{id:2,name:'حقوقی'}]




  useEffect(() => {
  
     signup()
},[confirm])
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Grid
        container
        component={Paper}
        square
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
        }}
      >
        <Box
          sx={{
            paddingX: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            fontWeight="800"
            m={3}
            color={theme.palette.text.primary}
          >
            فرم ثبت نام
          </Typography>
        </Box>
        <form
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate={true}
        >
          <Grid
            container
            spacing={2}
            sx={{
              width: '80%',
              padding: '1rem 1rem 1rem 1.5rem',
            }}
          >
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="firstName"
                rules={{
                  required:  { value: true, message: `وارد کردن نام الزامیست` },
                  minLength: { value: 3, message: "نام نمیتواند کمتر از سه حرف باشد." }
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="نام"
                    size={'small'}
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', marginRight: '1rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    focused={errors.firstName || value ? true : false}
                    // helperText={errors?.firstName?.message}
                    error={errors && errors.firstName ? true : false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{
                  required:  { value: true, message: `وارد کردن نام خانوادگی  الزامیست` },
                  minLength: { value: 3, message: "نام خانوادگی نمیتواند کمتر از سه حرف باشد." }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="نام خانوادگی"
                    size={'small'}
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: '0.7rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    focused={errors.lastName || value ? true : false}
                    //  helperText={errors?.lastName?.message}
                    error={errors && errors.lastName ? true : false}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="userName"
                rules={{
                  required: { value: true, message: `وارد کردن شماره همراه الزامیست` },
                  
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    type="tel"
                    label="شماره همراه"
                    size={'small'}
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', marginRight: '1rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    //  helperText={errors?.userName?.message}
                    focused={errors.userName || value ? true : false}
                    error={errors && errors.userName ? true : false}


                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6}>
              
            <AsyncComboInput
           control={control}  name={'LicenseType'} label='نوع شرکت' 
           url={""}
            //  url={`/gts/v1/api/component/get-dropdown-data?uiComponentId=28342`}
            getOptionLabel={(option: any) => option.name}
            variant='outlined'
            UserValue={UserValue}
                     // setFilterValue={setValue}
                      
          />
        </Grid> */}
            {/* <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="userName"
                rules={{
                  required:  { value: true, message: `وارد کردن نام کاربری الزامیست` },
                  minLength: { value: 3, message: "نام کاربری نمیتواند کمتر از سه حرف باشد." }
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="نام کاربری"
                    size={'small'}
                    variant="outlined"
                    fullWidth
                    sx={{ fontSize: '0.7rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    helperText={errors?.userName?.message}
                    focused={errors.userName || value ? true : false}
                    error={errors && errors.userName ? true : false}
                  />
                )}
              />
            </Grid> */}
           <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="email"
                control={control}
                rules={{
                  minLength: 3,
                  pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="ایمیل"
                    size={'small'}
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    focused={errors.email || value ? true : false}
                    error={errors && errors.email ? true : false}
                    // helperText={errors.email && 'فرمت ایمیل صحیح نمی باشد '}
                  />
                )}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="password"
                rules={{
                  required: true,
                  minLength: 3,
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="رمز عبور"
                    type="password"
                    size={'small'}
                    fullWidth
                    variant="outlined"
                    sx={{ fontSize: '0.7rem', marginRight: '1rem' }}
                    autoComplete="off"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    focused={errors.password || value ? true : false}
                    error={errors && errors.password ? true : false}
                    helperText={
                      errors.password && `وارد کردن رمز عبور الزامیست`
                    }
                  />
                )}
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6} md={6}>
              <Controller
                name="rePassword"
                rules={{
                  required: true,
                  minLength: 3,
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return 'مقدار رمز عبور برابر نیست '
                    }
                  },
                }}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    label="تکرار رمز عبور"
                    type="password"
                    fullWidth
                    size={'small'}
                    variant="outlined"
                    sx={{ fontSize: '0.7rem' }}
                    autoComplete="off"
                    error={errors && errors.password ? true : false}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </Grid> */}
            <Grid
              xs={12}
              sm={12}
              md={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '3rem',
              }}
            >
              <Button
                sx={{ marginRight: '1rem', width: '160px' }}
                type="submit"
                variant="contained"
                size="medium"
              >
                {'ثبت'}
              </Button>
              <SignUpMessageConfirm
                open={openOtpModal}
                onClose={handleCloseOtpModal}
                setConfirm={setConfirm}
                setEditNum={setEditNum}
                phoneNumber={getValues('userName')}
                formData={formData}
              />
              <Button
                sx={{ width: '160px' }}
                variant="outlined"
                onClick={() => {
                  setSwalOpen(true)
                }}
                size="medium"
              >
                {'انصراف'}
              </Button>
              <Modal hideBackdrop open={swalOpen} onClose={onCancel}>
                <Box sx={{ ...style }}>
                  <Typography variant="h6" mb="0.5rem">
                    آیا مطمئن هستید؟
                  </Typography>
                  <Typography fontSize="0.8rem" mb="0.5rem">
                    اطلاعات فرم تغییر یافته، در صورت خروج اطلاعات شما ذخیره نمی
                    شود!
                  </Typography>
                  <DialogActions sx={{ marginBottom: '0.5rem' }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setSwalOpen(false)
                        setOpen(false)
                      }}
                    >
                      بله
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        setSwalOpen(false)
                      }}
                    >
                      خیر
                    </Button>
                  </DialogActions>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </form>
      </Grid>
     </Dialog>
  )
}
export default SignUp
function onFinishCountdown() {
  throw new Error('Function not implemented.')
}
