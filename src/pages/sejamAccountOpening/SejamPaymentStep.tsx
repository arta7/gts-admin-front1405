import { Autocomplete, AutocompleteRenderInputParams, Box, Button, TextField, Typography } from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { TextFieldProps } from '@mui/material/TextField'
import Grid from '@mui/system/Unstable_Grid'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form'
import Fieldset from '../../components/Fieldset'
import FileUploadButton from '../../components/fileUpload/FileUploadButton'
import DatePickerControl from '../../components/FormControl/DatePickerControl'
import TextareaAutosizeControl from '../../components/FormControl/TextArea'
import { TextFieldControl } from '../../components/FormControl/TextFieldControl'
import { paymentTypes } from '../../staticData/StaticData'
import { SejamAccountType } from '../sejamConfirmation/Types'

type PaymentInfo = {
  paymentDate?: Date
}

const SejamPaymentStep = ({ selectedAccount }: { selectedAccount: SejamAccountType }, ref: any) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      paymentDate: new Date()
    }
  });
  const [open, setOpen] = React.useState(false);
  const [paymentType, setPaymentType] = useState<number>();
  const [selectedFiles, setSelectedFiles] = useState<Array<any>>([]);
  const getFileUploadLabel = (fileCount: number) => {
    if (!fileCount) {
      return '';
    }
    return `${fileCount} فایل ضمیمه شد`;
  }
  const handleOpen = () => setOpen(true);

  useImperativeHandle(ref, () => {
    return {
      handleSubmit: onSubmit,
    };
  }, []);

  const onSubmit = (data: PaymentInfo) => {
    console.log('data', data)
  }

  const containerStyle = { display: 'flex', flexDirection: 'column', gap: '2rem' };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Box sx={{ marginBottom: '2rem' }}>
          <Typography variant='h6'>{'ملاحظات پرداخت'}</Typography>
          <Typography>
            {`واریز مبلغ 10 میلیون جهت عقد قرارداد و دریافت کد PRX الزامی می باشد. با توجه به اینکه حداقل مبلغ سرمایه گذاری در سبد اختصاصی ${selectedAccount.title} که انتخاب نموده اید، ................ ریال می باشد، لذا بعد از تکمیل مراحل ثبت نام و صدور کد سبدگردانی (PRX) نسبت به افزایش سرمایه خود اقدام نمایید. دقت داشته باشید مبلغ واریزی باید از حساب بانکی شخص سرمایه گذار به حساب های شرکت سبدگردان هدف واریز شود و انتقال از حساب سایر اشخاص قابل پذیرش نمی باشد. برای سرمایه گذارانی که به سن قانونی نرسیده اند نیز این الزام وجود دارد. تاریخ افتتاح حساب شما بر اساس زمان واریز وجه می باشد لذا دقت نمایید در تاریخی که مبلغ سرمایه گذاری خود را به حساب شرکت واریز کردید، اقدام به افتتاح حساب نمایید.`}
          </Typography>
        </Box>
        <Box sx={containerStyle}>
          <Box id={"paymentWay"} sx={{ ...containerStyle, gap: '1rem' }}>
            <Typography variant='h6'>{'پرداخت وجه'}</Typography>
            <Typography>
              لطفا شماره فیش/ شماره پیگیری را به صورت کامل وارد نمایید.
            </Typography>
            <Grid container>
              <Grid xs={12} sm={3}>
                <Autocomplete disableClearable
                  options={paymentTypes}
                  onChange={(event, value) => setPaymentType(value.id)}
                  renderInput={(params: AutocompleteRenderInputParams) =>
                    <TextField {...params} label="روش پرداخت" />} />
                {(paymentType == 1) && <Button startIcon={<CreditCardIcon />}>{' برو به درگاه پرداخت '}</Button>}
              </Grid>
            </Grid>
          </Box>

          {(paymentType == 2) && <Grid container gap={'1rem'}>
            <Grid xs={12} sm={3}>
              <TextFieldControl size="medium" label='مبلغ واریزی (ریال)' name={'depositAmount'} control={control} />
            </Grid>
            <Grid xs={12} sm={3}>
              <TextFieldControl size="medium" label='شماره پیگیری فیش واریزی' name={'depositeSlipIssueTracking'} control={control} />
            </Grid>
            <Grid xs={12} sm={3}>
              <DatePickerControl size="medium" name={'paymentDate'} control={control} label={'تاریخ پرداخت'} />
            </Grid>
            <Grid xs={12} sm={3}>
              <FileUploadButton onClick={handleOpen} label='تصویر فیش واریزی' value={getFileUploadLabel(selectedFiles.length)} />
            </Grid>
            <Grid xs={12}>
              <TextareaAutosizeControl xs={12} name={'description'} label={'توضیحات'} control={control} />
            </Grid>
          </Grid>
          }
        </Box>
      </Box>
    </form>
  )
}

export default forwardRef(SejamPaymentStep)
