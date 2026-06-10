import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useAxios } from '../../hooks/useAxios'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

interface Film {
  title: string
  year: number
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}
export default function MultiAutocompleteInput(props: any) {
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

  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const url = 'base/v1/api/component/get-dropdown-data'
  const [api, setnewApi] = useState(`${url}?uiComponentId=${uiComponentId}`)
  const { loading, get, data: response, error } = useAxios()
  useEffect(() => {
    if (masterFieldId && getValues(masterFieldAliasName)) {
      setnewApi(
        `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${
          getValues(masterFieldAliasName)?.value
        }`,
      )
    } else setnewApi(`${url}?uiComponentId=${uiComponentId}`)
  }, [getValues()])
  useEffect(() => {
    get(api)
  }, [api])
  useEffect(() => {
    if (!loading) {
      if (response) {
        const { data }: any = response
        if (data.result && data.result.length) {
          let newarray = data.result.map((i: any) => {
            return { label: i.name, value: i.id }
          })
          //@ts-ignore
          setOptions([...newarray])
        }
      }
    } else if (error) {
      console.log('error :',error)
    }
  }, [loading])

  return (
    <Grid item  xs={12} sm={6} md={6} lg={4} xl={4}>
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            filterSelectedOptions
            open={open}
            onOpen={() => {
              setOpen(true)
            }}
            onClose={() => {
              setOpen(false)
            }}
            readOnly={isReadOnly}
            disabled={isReadOnly}
            size="small"
            getOptionLabel={(option: any) => option.label}
            options={options}
            loading={loading}
            onChange={(event: any, data: any) => {
              if (
                masterFieldId &&
                getValues(masterFieldAliasName) != undefined
              ) {
                setValue(aliasName, undefined)
              }
              setValue(aliasName, data)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                label={fieldCaption}
                variant="outlined"
                disabled={isReadOnly}
                required={isMandatory}
                focused={errors && errors[aliasName]}
                helperText={
                  errors && errors[aliasName] && `${errors[aliasName].message}`
                }
                error={errors && errors[aliasName]}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        )}
        rules={{
          required: isMandatory,
          maxLength: maxLen,
          minLength: minLen,
        }}
        name={aliasName}
        control={control}
      />
    </Grid>
  )
}
