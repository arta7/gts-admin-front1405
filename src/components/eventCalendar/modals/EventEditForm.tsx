import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Grid from '@mui/system/Unstable_Grid'
import { format } from 'date-fns-jalali'
import { useForm } from 'react-hook-form'
import { CheckboxControl } from '../../FormControl/CheckBoxControl'
import DatePickerElement from '../../FormControl/DatePickerControl'
import { TextFieldControl } from '../../FormControl/TextFieldControl'
import TimeFieldControl from '../../FormControl/TimeFieldControl'
import { CalendarEvent } from '../types';
import { setEventToFullDay } from '../Utils'

const EventEditForm = ({ onClose, open, entity }: any) => {
  const editMode = entity.id != null;
  console.log("start: ", format(entity.start, "yyyy/MM/dd HH:mm"))
  console.log("end: ", format(entity.end, "yyyy/MM/dd HH:mm"))
  const { handleSubmit, getValues, formState: { errors }, control, watch } = useForm({
    defaultValues: {
      ...entity
    },
  });

  const onCancel = () => {
    onClose()
  }

  const onSubmit = () => {
    let formValues = getValues();

    if (formValues.allDay) {
      formValues = setEventToFullDay(formValues)
    }

    const calendarEvent: CalendarEvent = {
      ...formValues,
      id: entity.id
    };
    console.log("Submit: " + format(calendarEvent.start, "yyyy/MM/dd hh:mm") + " " + format(calendarEvent.end!, "yyyy/MM/dd hh:mm"))

    let promise = new Promise(res => res(true))

    promise.then((response) => {
      onClose(calendarEvent, editMode);
    });
  }
  return (
    <Dialog open={open} maxWidth={'md'} onClose={onClose} fullWidth={true}>
      <DialogContent>
        <Grid container gap={2}>
          <Grid md={12} sm={12}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '.4rem', padding: 1, fontSize: '1.5rem', textAlign: 'center', color: '#BCBCC6' }}>
              <Typography>{`تاریخ انتخاب شده : `}</Typography> <Typography fontWeight={500} sx={{ dir: 'ltr' }}>{` ${format(entity.start, 'EEEE dd MMMM')}`}</Typography>
            </Box>
          </Grid>
          <Grid md={5} sm={12}>
            <TextFieldControl name='title' label='عنوان' control={control} fullWidth={true} required={true} errors={errors} />
          </Grid>
          <Grid md={5} sm={12}>
            <CheckboxControl name='allDay' label='کل روز' control={control} fullWidth={true} errors={errors} />
          </Grid>
          <Grid lg={2} md={3} sm={12}>
            <TimeFieldControl name='start' label="ساعت شروع" control={control} fullWidth={true} errors={errors} sx={{ display: watch("allDay") ? 'none' : 'block' }} />
          </Grid>
          <Grid lg={2} md={3} sm={12}>
            <TimeFieldControl name="end" label={'ساعت پایان'} control={control} fullWidth={true} errors={errors} sx={{ display: watch("allDay") ? 'none' : 'block' }} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit(onSubmit)}>{'ثبت'}</Button>
        <Button onClick={() => onCancel()}>{'انصراف'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventEditForm
