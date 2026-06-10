
import * as React from 'react';
 //@ts-ignore
import TextField, { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextFieldVariants } from '@mui/material/TextField';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
 //@ts-ignore
import { JSX } from 'react/jsx-runtime';

export default function Calendar() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <StaticDatePicker
      //@ts-ignore
      displayStaticWrapperAs={"desktop"}
      // openTo="year"
       //@ts-ignore
      value={value}
       //@ts-ignore
      onChange={(newValue: React.SetStateAction<Date | null>) => {
        setValue(newValue);
      }}
       //@ts-ignore
      renderInput={(params: JSX.IntrinsicAttributes & { variant?: TextFieldVariants | undefined; } 
        & Omit<FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps, "variant">) => <TextField {...params} />} />
  );
}