import { Controller } from 'react-hook-form'
import { Box, Grid, TextField } from '@mui/material'
import { DatePicker, TimePicker } from '@mui/x-date-pickers'
import { TextFieldProps } from '@mui/material'
const TimePickerComp = (props: any) => {
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
  } = props

  return (
    <Grid item xs={4} sm={4} md={4}>
      <Controller
        name={aliasName}
        control={control}
        rules={{
          validate: needToValidate && validationRule,
          required: isMandatory,
          maxLength: maxLen,
          minLength: minLen,
          deps: [masterFieldAliasName],
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TimePicker
            //@ts-ignore
            label={fieldCaption}
             //@ts-ignore
            value={value&&new Date(value)}
             //@ts-ignore
            onChange={(
              newValue: Date | null,
              keyboardInputValue: string | undefined,
            ) => {
              onChange(newValue)
            }}
            renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => {
              return (
                <TextField
                  {...params}
                  sx={{ display: 'flex' }}
                  size={'small'}
                  disabled={isReadOnly}
                  required={isMandatory}
                  focused={errors && errors[aliasName]}
                  onBlur={onBlur}
                  helperText={
                    errors &&
                    errors[aliasName] &&
                    `${errors[aliasName].message}`
                  }
                  error={errors && errors[aliasName]}
                  inputProps={{ ...params.inputProps, dir: 'ltr' }}
                />
              )
            }}
          />
        )}
      />
    </Grid>
  )
}
export default TimePickerComp
