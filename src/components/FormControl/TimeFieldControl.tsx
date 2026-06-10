import TextField from '@mui/material/TextField';
import { TimeField } from '@mui/x-date-pickers/TimeField'
import React from 'react'
import { Controller } from 'react-hook-form'

const TimeFieldControl = ({ control, name, label, errors, rules = {}, type, ...rest }: any) => {

    let errorMessage = '';
    let hasError = false;
    if (rest.required) {
        rules.required = "*";
    }
    if (errors && errors[name]) {
        errorMessage = errors[name].message;
        hasError = Boolean(errors[name])
    }
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { value, onChange, onBlur, ref }}) => (
                <TimeField
                    format="HH:mm"
                    value={value}
                    label={label} id={name} variant="outlined" fullWidth {...rest}
                    helperText={errorMessage} error={hasError} size={rest.size || 'small'}
                    onChange={(newValue) => onChange(newValue)}
                    slotProps={{ textField: { placeholder:'ساعت : دقیقه',dir:'ltr' } }} 
                />
            )}
        />
    )
}

export default TimeFieldControl


