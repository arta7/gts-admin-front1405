import { Grid, Hidden, TextField } from '@mui/material'
import axios from 'axios'
import { type } from 'os'
import { Controller } from 'react-hook-form'
import { setValidation } from './setValidations'
import { setValidationPattern } from './setValidationPattern'

export function TextAreaInput(props: any) {
  const {
    Component,
    control,
    state,
    fieldId,
    tableName,
    fieldName,
    aliasName,
    fieldType,
    fieldSortOrder,
    fieldCaption,
    isReadOnly,
    isVisible,
    isMandatory,
    isUnique,
    uniquenessCheckAPI,
    needToValidate,
    validationRule,
    maxLen,
    minLen,
    masterFieldAliasName,
    useInSaveMethod,
    masterFieldId,
    getValues,
    errors,
    isInteger,
    canBeZero,
    canBeNegative,
    min,
    max,
    acceptAllChars,
    acceptPersianLetters,
    acceptEnglishLetters,
    acceptNumbers,
  } = props
  return (
    <Grid item  xs={12} sm={12} md={12} lg={12} xl={12}>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            multiline
            rows={3}
             type={validationRule==="Numeric"?'number':'text'}
            disabled={isReadOnly}
            size={'small'}
            label={fieldCaption}
            variant="outlined"
            sx={{ display: 'flex', fontSize: '0.7rem' }}
            autoComplete="off"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            required={isMandatory}
            focused={(errors && errors[aliasName]) || value ? true : false}
            helperText={errors[aliasName]?.message}
            error={errors && errors[aliasName]? true : false}
          />
        )}
        rules={{
          pattern: setValidationPattern(isInteger,canBeZero,canBeNegative,acceptAllChars,acceptPersianLetters,acceptEnglishLetters,acceptNumbers,needToValidate,validationRule,getValues(aliasName)),
          required: isMandatory,
          maxLength: maxLen,
          minLength: minLen,
          min:min,
          max: max,
          deps: [masterFieldAliasName],
        }}
        name={aliasName}
        control={control}
      />
    </Grid>
  )
}
