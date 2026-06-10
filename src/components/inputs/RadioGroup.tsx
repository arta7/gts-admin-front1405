import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { Controller } from 'react-hook-form'

export function RadioInput(props: any) {
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
    <Controller
      render={({ field }) => (
        <RadioGroup aria-label="gender" {...field}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
        </RadioGroup>
      )}
      name={aliasName}
      control={control}
    />
  )
}
