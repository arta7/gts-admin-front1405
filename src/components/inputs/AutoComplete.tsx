import { Autocomplete, Grid, TextField, TextFieldProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useAxios } from '../../hooks/useAxios'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'
import { useParams } from 'react-router-dom'
import {forEach} from "react-bootstrap/ElementChildren";
import { any } from '@amcharts/amcharts5/.internal/core/util/Array'
import { toast } from 'react-toastify'

export default function AutocompleteInput(props: any) {
  const {
    componentName,
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
    masterId,
    masterParentId,
    isUnique,
    isVisible,
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
    formState,
    attachedField,
    masterFieldAliasName,
    setValue,
    getValues,
    register,
    errors,
    setType,
    getType
  } = props

  const [open, setOpen] = useState(false)
  const [options, setOptions]: any = useState([])
  const { id: idparam } = useParams()
 const url = 'base/v1/api/component/get-dropdown-data'
 let _attachedField = getValues(attachedField)
 let _defaultValues =props.defaultValues
 let _fieldValue = masterFieldId ?!getValues(masterFieldAliasName)?null:(options.length?options.length===1&&isMandatory?options[0]: options.find((i: any) => i.value === _attachedField): null):(options.length?options.length===1&&isMandatory?options[0]: options.find((i: any) => i.value === _attachedField): null)
       
  const [api, setnewApi]: any = useState( )

 
  const { loading, get, data: response, error } = useAxios()
  useEffect(() => {
    // console.log('masterFieldAliasName',uiComponentId,componentName)
    if (componentName == 'Tab') {
      if (masterFieldId) {
        if (getValues(masterFieldAliasName)) {
          if (typeof getValues(masterFieldAliasName) !== 'object') {
            console.log('1')
            setnewApi(`${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)) ? Number(getValues(masterFieldAliasName)) : 0}`)
          } else if (typeof getValues(masterFieldAliasName) === 'object') {
            console.log('2')
            setnewApi(`${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)?.value) ? Number(getValues(masterFieldAliasName)?.value) : 0}`)
          }
        } else if (!getValues(masterFieldAliasName)&&!Number(idparam)) {
          console.log('3')
          setnewApi(`${url}?uiComponentId=${uiComponentId}`)
        }
      } else
      {
        console.log('4')
        setnewApi(`${url}?uiComponentId=${uiComponentId}`)
      }
    } else if (componentName != 'Tab') {
        // console.log('componentName',componentName)
      if (masterId) {
     
        if (masterFieldId) {
       
          if (getValues(masterFieldAliasName)) {
            if (typeof getValues(masterFieldAliasName) !== 'object') {
              setnewApi(
                `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)) ? Number(getValues(masterFieldAliasName)) : 0}&masterId=${masterId}&masterParentId=${masterParentId}`
              )
            } else if (typeof getValues(masterFieldAliasName) === 'object') {
              setnewApi(
                `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)?.value) ? Number(getValues(masterFieldAliasName)?.value) : 0
                }&masterId=${masterId}&masterParentId=${masterParentId}`
              )
            }
          } else if (!getValues(masterFieldAliasName)) {
            setnewApi(
              `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${0}&masterId=${masterId}&masterParentId=${masterParentId}`
            )
          }
        } else
        {
       
          setnewApi(
            `${url}?uiComponentId=${uiComponentId}&masterId=${masterId}&masterParentId=${masterParentId}`
          )
          console.log('master')
        }
          
      } else if (!masterId) {
        if (masterFieldId) {
          if (getValues(masterFieldAliasName)) {
            if (typeof getValues(masterFieldAliasName) !== 'object') {
              setnewApi(
               `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)) ? Number(getValues(masterFieldAliasName)) : 0}&masterParentId=${masterParentId}`
              )
            } else if (typeof getValues(masterFieldAliasName) === 'object') {
              setnewApi(
               `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${Number(getValues(masterFieldAliasName)?.value) ? Number(getValues(masterFieldAliasName)?.value) : 0
                  }&masterParentId=${masterParentId}`
              )
            }
          } else if (!getValues(masterFieldAliasName)) {
            setnewApi(
               `${url}?uiComponentId=${uiComponentId}&masterSelecteItemId=${0}&masterParentId=${masterParentId}`
            )
          }
        } else
          setnewApi(`${url}?uiComponentId=${uiComponentId}&masterParentId=${masterParentId}`)
      }
    }
  }, [getValues()])
  useEffect(() => {
    if (api) {
      console.log('api',api)
      get(api)
    }
  }, [api])
  
  useEffect(() => {
    console.log('response',response)
    if (!loading && response) {
        const { data }: any = response
      if (data.result && data.result.length) {
        let newarray = data.result.map((i: any) => {
          return { label: i.name , value: i.id ,type:i?.type !=null ? i.type : 3}
        })
      setOptions([...newarray])
      }
    } else if (error) {
      //@ts-ignore
    if (error && error?.response?.status === 400) {
      let errors;
        //@ts-ignore
        errors = error?.response?.data.result.message
        toast.error(errors);
      }
      toast.error(getServerError(error));
    }
  }, [loading])


  // let defaultValue =options.length &&  getValues(aliasName)  ?
  //     options.find((i: any) => i.value === getValues(attachedField)) :
  //     (options.length && getValues(aliasName) ? options[0] : null)


  useEffect(() => {
    if (masterFieldId) {
      if (!_fieldValue||!getValues(masterFieldAliasName)) {
        _fieldValue = null
        setValue(aliasName, null)
          if (attachedField) {setValue(attachedField, null) }
      }
    }
    if (options.length === 1 && isMandatory) {
      if (masterFieldId) {
        if (getValues(masterFieldAliasName)) {
             setValue(aliasName, options[0])
          if (attachedField) setValue(attachedField, options[0].value)
         }
      }
       if (!masterFieldId) {
             setValue(aliasName, options[0])
          if (attachedField) setValue(attachedField, options[0].value)
       }
    }
    // if (options.length === 1) {
    //   if (attachedField) setValue(attachedField, options[0].value)
    //   setValue(aliasName, options[0])
    // } else {
    //   defaultValue = options.length &&  getValues(aliasName) != null && getValues(masterFieldAliasName)?
    //         options.find((i: any) => i.value === getValues(attachedField)) :
    //         (options.length && getValues(aliasName) ? options[0] : null)
  
    //   defaultValue =  options.length && aliasName != undefined ?
    //       options.find((i: any) => i.value === getValues(attachedField)) :null 
  
    // }
  
  }, [options,_fieldValue])

      

  return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
             //@ts-ignore
            open={open}
            
            onOpen={() => {
              setOpen(true)
            }}
            onClose={() => {
              setOpen(false)
            }}

            // value={options.length && typeof getValues(aliasName) === 'string' ?
            //        options.find((i: any) => i.value === getValues(attachedField)) :
            //       (options.length && typeof getValues(aliasName) === 'object' ?field.value : null)}

            value={masterFieldId ?!getValues(masterFieldAliasName)?null:(options.length?options.length===1&&isMandatory?options[0]: options.find((i: any) => i.value === _attachedField): _fieldValue):(options.length?options.length===1&&isMandatory?options[0]: options.find((i: any) => i.value === _attachedField): _fieldValue) }
           
            readOnly={isReadOnly}
            disabled={masterFieldId ?!getValues(masterFieldAliasName)&&true:false}
            
            size="small"
            getOptionLabel={(option: any) => option.label}
            options={options}
            loading={loading}
            onChange={(event: any, data: any) => {
              console.log('onchange event data',data,masterFieldId,aliasName)
              if (masterFieldId && !getValues(masterFieldAliasName)) {
                setValue(aliasName, '')
              }
              else if (!masterFieldId ) {
                setValue(aliasName, data)
                 if (attachedField) setValue(attachedField, data?.value)
              }else if (masterFieldId && getValues(masterFieldAliasName)) {
                setValue(aliasName, data)
                 if (attachedField) setValue(attachedField, data?.value)
              }

              // if (data?.type !== undefined && data?.type !== 3) {
              //   setType(data.type);
              // }

            }}
            
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                label={fieldCaption}
                disabled={isReadOnly||(masterFieldId&&!getValues(masterFieldAliasName))}
                required={isMandatory}
                focused={errors && errors[aliasName]}
                helperText={
                  errors && errors[aliasName] && `${errors[aliasName].message}`
                }
                error={errors && errors[aliasName] }
                variant="outlined"
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
          validate: needToValidate && validationRule,
          required: isMandatory,
          maxLength: maxLen,
          minLength: minLen,
          deps: [masterFieldAliasName],
        }}
        name={aliasName}
        control={control}
        
      />
    </Grid>
  )
}
function getServerError(error: never): any {
  throw new Error('Function not implemented.')
}

