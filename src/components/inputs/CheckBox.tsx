import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export function CheckInput(props: any) {
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
    getValues,
    setValue,
  } = props
  return (
     <Grid item xs={12} sm={6} md={6} lg={4} xl={4} >
      <FormControlLabel
        control={
          <Controller
            render={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                size="small"
                onChange={(e) => onChange(e.target.checked)}
                checked={value}
                disabled={isReadOnly}
                onBlur={onBlur}
                required={isMandatory}
              />
            )}
            rules={{
              required: { value: isMandatory, message: '* ' },
              maxLength: maxLen,
              minLength: minLen,
              validate: needToValidate && validationRule,
              deps: [masterFieldAliasName],
            }}
            name={aliasName}
            control={control}
          />
        }
        label={fieldCaption}
      />
      {errors && errors[aliasName] && (
        <span style={{ color: 'red' }}>{errors[aliasName].message}</span>
      )}
    </Grid>
  )
}
