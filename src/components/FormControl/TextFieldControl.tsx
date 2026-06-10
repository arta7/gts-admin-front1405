import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export function TextFieldControl({ control, name, label, errors, rules = {}, type, ...rest }: any) {
  let errorMessage = '';
  let hasError = false;
  if (rest.required) {
    rules.required = "*";
  }
  if (errors && errors[name]) {
    errorMessage = errors[name].message;
    hasError = Boolean(errors[name])
  }

  const configProps: any = {};
  if (type === 'email' && !rules.pattern) {
    rules.pattern = {
      value:
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'مقدار ایمیل صحیح نیست'
    }
  }
  if (type == 'mobileNumber') {
    rules.validate = {
      mobileNumber: (value: any) => {
        return (value.length == 11 && value.toString().indexOf("09") == 0) || 'شماره همراه صحیح نیست'
      },
    }
  }


  const numberStyles = type == "mobileNumber" ? {
    textAlign: 'center',
    'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
      '-webkit-appearance': ' none',
      margin: 0,
      '-moz-appearance': 'textfield',
    },
  } : null;

  return <Controller name={name} control={control} rules={rules}
    render={({ field }) =>
      <TextField {...field} type={(type == "mobileNumber") ? "text" : type} label={label} id={name} variant="outlined" fullWidth {...rest}
        helperText={errorMessage} error={hasError} size={rest.size || 'small'} sx={(type == "mobileNumber") && numberStyles} />} />;
}