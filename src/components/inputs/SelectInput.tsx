import React, { useEffect, useState } from 'react'
import { Control, Controller, ControllerProps } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

type SelectInputProps = {
  control: Control<any>
  name: string
  label: string
  options: any[]
  rules?: ControllerProps['rules']
  required?: boolean
  helperText?: string
  error?: boolean
  variant?: 'filled' | 'outlined' | 'standard'
  disabled?: boolean
  setFilterValue?: (value: any) => void
  getOptionLabel?: (option: any) => string
  getOptionValue?: (option: any) => any
}

const SelectInput = ({
  control,
  name,
  label,
  options,
  rules,
  required,
  variant,
  disabled,
  setFilterValue,
  getOptionLabel = (option: any) => option.name || option.label || option.title || '',
  getOptionValue = (option: any) => option.id || option.value
}: SelectInputProps) => {

  const validationRules: ControllerProps['rules'] = {
    ...rules,
    ...(required && {
      required: 'این فیلد الزامی است'
    })
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {

        const [selectedOption, setSelectedOption] = useState<any | null>(null)

        useEffect(() => {
          if (value != null && options?.length) {
            const found = options.find(
              (o: any) => getOptionValue(o) == value
            )
            setSelectedOption(found || null)
          } else {
            setSelectedOption(null)
          }
        }, [value, options])

        const handleChange = (event: any, newValue: any | null) => {
          setSelectedOption(newValue)

          const newVal = newValue ? getOptionValue(newValue) : null

          if (setFilterValue) {
            setFilterValue(newVal)
          }

          onChange(newVal)
        }

        return (
          <Autocomplete
            value={selectedOption}
            onChange={handleChange}
            options={options || []}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) =>
              getOptionValue(option) === getOptionValue(value)
            }
            fullWidth
            size="small"
            disabled={disabled}
            noOptionsText="موردی یافت نشد."
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                variant={variant || 'standard'}
                required={required}
                error={!!error}
                helperText={error ? error.message : ''}
              />
            )}
          />
        )
      }}
    />
  )
}

export default SelectInput  ;
