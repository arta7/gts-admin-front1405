import { Controller } from 'react-hook-form'
import { Box, Grid, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { TextFieldProps } from '@mui/material'
const DatePickerComp = (props: any) => {
  const {
    control,
    aliasName,
    fieldCaption,
    fieldDescription,
    fieldId,
    fieldName,
    fieldSortOrder,
    isEnabled,
    isMandatory,
    isReadOnly,
    isUnique,
    isVisible,
    masterFieldAliasName,
    masterFieldId,
    maxLen,
    minLen,
    needToValidate,
    neverVisible,
    tableName,
    uiComponentId,
    uiComponentType,
    uniquenessCheckAPI,
    useInSaveMethod,
    validationRule,
    errors,
    defaultValue,
    getValues,
    setValue,
    acceptFuture,
    acceptToday,
    acceptPast,
    min,
    max,

  } = props

  const mask = '____/__/__'
  const placeholder = `سال/ماه/روز`
  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Controller
        name={aliasName}
        control={control}
        rules={{
          validate: needToValidate && validationRule,
          required: isMandatory,
          maxLength: maxLen,
          minLength: minLen,
          min: min,
          max: max,
          deps: [masterFieldAliasName],
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <DatePicker
            label={fieldCaption}
            value={
              value
              &&
              new Date(value)
            }
            onChange={(
              newValue: Date | null
            ) => {
              // var valuenew = new Date(newValue?.setHours(newValue?.getHours()+4))
              // console.log('set Date :: ', new Date(newValue.setHours(newValue.getHours()+4)))
              if (newValue instanceof Date) {
                onChange(new Date(newValue.setHours(newValue.getHours() + 4)));
              } else {
                onChange(newValue)
                console.error("newValue is not a valid Date");
              }
             
            }}
            slotProps={{
              textField: {
                size: 'small',
                required: isMandatory,
                focused: errors && errors[aliasName],
                onBlur: onBlur,
                helperText: errors && errors[aliasName] && `${errors[aliasName].message}`,
                error: errors && errors[aliasName],
                inputProps: { placeholder: placeholder, dir: 'ltr' }
              }
            }}
          />
        )}
      />
    </Grid>
  )
}
export default DatePickerComp
