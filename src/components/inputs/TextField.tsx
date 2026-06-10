import { Grid, Hidden, TextField } from '@mui/material'
import axios from 'axios'
import { type } from 'os'
import { Controller } from 'react-hook-form'
import { setValidation } from './setValidations'
import { setValidationPattern } from './setValidationPattern'

let SumValue=0;
export function Input(props: any) {
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
    FieldSum
  } = props
  return (
    <Grid item  xs={12} sm={6} md={6} lg={4} xl={4}>
      <Controller
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            type={validationRule==="Numeric"?'number':'text'}
            inputProps={
              { readOnly: isReadOnly || (validationRule==="Numeric" && FieldSum ==1 ? true:false),
              maxLength : maxLen

              }
          }
            size={'small'}
            label={fieldCaption}
            variant="outlined"
            sx={{ display: 'flex', fontSize: '0.7rem' }}
            autoComplete="off"
            onBlur={onBlur}
            onChange={(onChange)}
            value={value}
            required={isMandatory}
            focused={(errors && errors[aliasName]) || value ? true : false}
            helperText={errors[aliasName]?.message}
            error={errors && errors[aliasName]? true : false}
            
          />
        )}
        rules={{
          pattern: setValidationPattern(isInteger,canBeZero,canBeNegative,acceptAllChars,acceptPersianLetters,acceptEnglishLetters,acceptNumbers,needToValidate,validationRule
            ,getValues(aliasName)
            ),
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
