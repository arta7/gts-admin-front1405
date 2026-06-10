import { InputAdornment, InputBase, TextField } from "@mui/material"
import React from "react";
import { Clear } from '@mui/icons-material';

type InputProps = {
  value: any
  onChange: (value: any) => void
  debounce?: number,
  placeholder?: string,
  inputProps?: any
  label?: string
  type?:string,
  min?:Date,
  max?:Date
}

export function DebounceDateInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: InputProps) {
  const inputRef = React.useRef() as any;
  const [firstLoad, setFirstLoad] = React.useState(true)
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    inputRef.current.focus();
  }, [])

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    if (!firstLoad) {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)

      return () => clearTimeout(timeout)
    }
    else {
      setFirstLoad(false);
    }
  }, [value])

  const inputIcon= value && <Clear fontSize="small" />;
  return (
    <TextField inputRef={inputRef} size="small" margin="dense" sx={{backgroundColor:'white'}}
     {...props} value={value} onChange={e => setValue(e.target.value)}
      InputProps={{
        endAdornment: value && props.type=='date' && <InputAdornment position="end" onClick={() => { setValue('') }}>
          {inputIcon}
        </InputAdornment>
      }} />
  )
}