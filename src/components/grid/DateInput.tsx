import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import Datepicker from '../DatePicker/DatePicker';
type InputProps = {
  value: any
  onChange: (value: any) => void
  debounce?: number,
  placeholder?: string,
  inputProps?: any
  label?: string
  type?:string,
  min?:number,
  max?:number
}
export default function DateInput({
  value:initialValue,
  onChange,
  debounce = 500,
  ...props
}: InputProps) {
  const [value, setValue] = React.useState(initialValue)
  return (
      <DemoContainer components={['DateRangePicker']}>
          {/* <StaticDatePicker
      //@ts-ignore
      displayStaticWrapperAs={"desktop"}
      // openTo="year"
       //@ts-ignore
      value={value}
       //@ts-ignore
      // onChange={(newValue: React.SetStateAction<Date | null>) => {
        
      // }}
      onChange={onChange}
       //@ts-ignore
      renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } 
        & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} />} /> */}

        <Datepicker value={value}  onChange={onChange} label={props.placeholder?.toString()} />
      </DemoContainer>
  );
}