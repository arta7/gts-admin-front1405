import TextField from '@mui/material/TextField';
import {
  DatePicker
} from '@mui/x-date-pickers/DatePicker';
import {
  Controller
} from 'react-hook-form';
import { FieldValues } from 'react-hook-form/dist/types/fields';


export default function DatePickerElement<TFieldValues extends FieldValues>({
  name,
  required,
  validation = {},
  inputProps,
  control,
  textReadOnly,
  slotProps,
  ...rest
}: any): JSX.Element {
  if (required && !validation.required) {
    validation.required = '*'
  }

  const mask = "____/__/__";
  const placeholder = `سال/ماه/روز`;


  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      defaultValue={null as any}
      render={({ field, fieldState: { error } }) => {
        if (field?.value && typeof field?.value === 'string') {
          
          field.value = new Date(field.value) as any 
          // need to see if this works for all localization adaptors
        }

        return (
          <DatePicker
            {...rest}
            {...field}
            mask={mask}
            ref={(r) => {
              field.ref(r?.querySelector('input'))
            }}
            onClose={(...args: any) => {
              field.onBlur()
              if (rest.onClose) {
                rest.onClose(...args)
              }
            }}
            onChange={(v: any, keyboardInputValue: any) => {
            
              field.onChange(v, keyboardInputValue)
              if (typeof rest.onChange === 'function') {
                rest.onChange(v, keyboardInputValue)
              }
            }}
            slotProps={{
              textField: {
                dir: "ltr",
                error: !!error,
                helperText: error ? error.message : inputProps?.helperText || rest.helperText,
                required: required,
                size: rest.size || 'small'

              }
            }}
          />
        )
      }}
    />
  )
}