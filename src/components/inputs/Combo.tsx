import {
    Autocomplete, TextField
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
    Controller,
    ControllerProps
} from 'react-hook-form';

export default function Combo({
    textFieldProps,
    autocompleteProps,
    name,
    control,
    options,
    loading,
    rules,
    required,
    matchId,
    label,
}: any) {
    const validationRules: ControllerProps['rules'] = {
        ...rules,
        ...(required && {
            required: rules?.required || 'انتخاب مقدار اجباریست',
        }),
    }

    return (
        <Controller
            name={name}
            control={control}
            rules={validationRules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                let currentValue = value || null
                if (matchId) {
                    currentValue = options.find((i:any) => (i.id || i) === value) || null
                }
                return (
                    <Autocomplete
                        {...autocompleteProps}
                        value={currentValue}
                        loading={loading}
                        options={options}
                        isOptionEqualToValue={
                            autocompleteProps?.isOptionEqualToValue ? autocompleteProps.isOptionEqualToValue : (option:any, value:any) => {
                                return value ? option.id === (value?.id || value) : false
                            }
                        }
                        getOptionLabel={
                            autocompleteProps?.getOptionLabel
                                ? autocompleteProps.getOptionLabel
                                : (option:any) => {
                                    return `${option?.label || option}`
                                }
                        }
                        onChange={(event, value:any, reason, details) => {
                            let changedVal = value
                            if (matchId) {
                                changedVal = value?.id || value;
                            }
                            onChange(changedVal)
                            if (autocompleteProps?.onChange) {
                                autocompleteProps.onChange(event, value, reason, details)
                            }
                        }}
                        renderOption={autocompleteProps?.renderOption ?? undefined}
                        onBlur={(event) => {
                            onBlur()
                            if (typeof autocompleteProps?.onBlur === 'function') {
                                autocompleteProps.onBlur(event)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                name={name}
                                required={rules?.required ? true : required}
                                label={label}
                                {...textFieldProps}
                                {...params}
                                error={!!error}
                                InputLabelProps={{
                                    ...params.InputLabelProps,
                                    ...textFieldProps?.InputLabelProps,
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {loading ? (
                                                <CircularProgress color="inherit" size={20} />
                                            ) : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                    ...textFieldProps?.InputProps,
                                }}
                                inputProps={{
                                    ...params.inputProps,
                                    ...textFieldProps?.inputProps,
                                }}
                                helperText={
                                    error ? error.message : textFieldProps?.helperText
                                }
                            />
                        )}
                    />
                )
            }}
        />
    )
}