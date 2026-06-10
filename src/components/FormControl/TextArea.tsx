import { TextareaAutosize } from '@mui/material'
import { Control, Controller, ControllerProps, FieldError, Path, } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { CSSProperties } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

export default function TextareaAutosizeControl({
    validation = {},
    parseError,
    required,
    name,
    control,
    rows,
    resizeStyle,
    ...rest
}: any): JSX.Element {
    if (required && !validation.required) {
        validation.required = '*'
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validation}
            render={({
                field: { value, onChange, onBlur, ref },
                fieldState: { error },
            }) => (
                <TextField
                    fullWidth
                    {...rest}
                    name={name}
                    value={value ?? ''}
                    onChange={(ev: any) => {
                        onChange(ev.target.value)
                        if (typeof rest.onChange === 'function') {
                            rest.onChange(ev)
                        }
                    }}
                    onBlur={onBlur}
                    required={required}
                    error={!!error}
                    helperText={error ? error.message : rest.helperText}
                    inputRef={ref}
                    multiline
                    InputProps={{
                        inputComponent: TextareaAutosize,
                        inputProps: {
                            minRows: rows,
                            style: {
                                resize: resizeStyle || 'both',
                            },
                        },
                    }}
                />
            )}
        />
    )
}