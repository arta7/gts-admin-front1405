import { FormProvider, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getFromObject, setInObject } from '../../utils/helpers'
import { Grid, Button } from '@mui/material'
import { Input } from '../inputs/TextField'
import { useAxios } from '../../hooks/useAxios'
import { useParams } from 'react-router-dom'
import React from 'react'
//@ts-ignore
import { toast } from 'react-toastify'
import { Dropdown } from 'react-bootstrap';
import { serverError } from "../../utils/Messages";
import { useAuth } from '../../contexts/AuthContext'
const getServerError=(error:any)=>`${serverError} (${error.code})`;
const FormSection = (props: any) => {
  const {
    fields,
    subId,
    sectionId,
    tabValue,
    setTabValue,
    setControl,
    setParentId,
    setId,
    masterParentId,
    masterId,
    componentName,
    // setType,
    // getType
  } = props
  const [initialData, setInitialData] = useState({})
  const [initialState, setInitialState] = useState({})
  const url = '/gts/v1/api/component-data/fetch'
  const createUrl = '/gts/v1/api/component-data/create'
  const { user  } = useAuth()
  const UserValue= user as any;
  useEffect(() => {
    if (fields?.length) {
      fields?.forEach((fi: any) => {
        if (fi.uiComponentType === 'MultiSelectDropDown') {
          const _v: any =
            initialData && Object.keys(initialData).length
              ? getFromObject(initialData, fi.aliasName)
              : []
          const valueSelectMulti = _v?.map((item: any) => {
            return item[fi.valueIndicator || 'value']
          })
          setInObject(initialState, fi.aliasName, {
            value: valueSelectMulti,
          })
        } else {
          const _v: any =
            initialData && Object.keys(initialData).length
              ? getFromObject(initialData, fi.aliasName)
              : ''
          setInObject(initialState, fi.aliasName, _v)
        }
      })
    }
  }, [initialData])
  const {
    register,
    watch,
    formState,
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    // setType,
    // getType,
    ...methods
  } = useForm({ defaultValues: initialState })
  const { id: idparam }: any = useParams()
  React.useEffect(() => {
    if (idparam != 0) {
      if (sectionId != undefined) {
        axios
          .post(url, {
            componentId: sectionId,
            masterId: idparam,
            userId:UserValue?.id 
          })
          .then((response) => {
            const data = response.data.result as any
            setId(data[0].masterId)
            setParentId(data[0].masterId)
            setInitialData(data[0])
            reset(data[0])
          })
      }
    }
  }, [sectionId])
  const watchAllFields = watch()
  const [watchField, setWatchField]: any = useState()
  useEffect(() => {
    let count = 0
    const subscription = watch((value, { name, type }) => {
      setControl(name && true);
      setWatchField(fields?.find((i: any) => i.aliasName === name))
    }
    )
  }, [watch])
  useEffect(() => {
    if (watchField) {
      if (watchField.uiComponentType === Dropdown && watchField.masterFieldId) {
        //@ts-ignore
        setValue(watchField?.aliasName, "")
      }
    }
  }, [watchField])
  //@ts-ignore
  const onSubmit = (data: any) => {
    let state = {}
    fields
      ?.filter((i: any) => i.useInSaveMethod === true)
      ?.forEach((fi: any) => {
        if (fi.aliasName.includes('subSystemId')) {
          setInObject(state, fi.aliasName, subId)
        } else if (fi.aliasName.includes('componentId')) {
          setInObject(state, fi.aliasName, sectionId)
        } else if (fi.uiComponentType === 'MultiSelectDropDown') {
          const _v: any =
            data && Object.keys(data).length
              ? getFromObject(data, fi.aliasName)
              : []
          const valueSelectMulti = _v?.map((item: any) => {
            return item[fi.valueIndicator || 'value']
          })
          setInObject(state, fi.aliasName, {
            value: valueSelectMulti,
          })
        } else if (fi.uiComponentType === 'DropDown') {
          const _v: any =
            data && Object.keys(data).length
              ? getFromObject(data, fi.aliasName) === ''
                ? null
                : getFromObject(data, fi.aliasName).value
              : null

          setInObject(state, fi.aliasName, _v)
        } else if (fi.uiComponentType === 'CheckBox') {
            const _v: any =
            data && Object.keys(data).length
              ? getFromObject(data, fi.aliasName) === ''
                ? false
                : getFromObject(data, fi.aliasName)
              : false
          setInObject(state, fi.aliasName, _v)
        } else {
         
          const _v: any =
            data && Object.keys(data).length
              ? getFromObject(data, fi.aliasName) === ''
                ? null
                : getFromObject(data, fi.aliasName)
              : null

          setInObject(state, fi.aliasName, _v)
        }
      })
      console.log('state 2',state)
    if (idparam == 0) {
      if (
        Object.keys(state).length ===
        fields.filter((i: any) => i.useInSaveMethod === true).length
      ) {
        console.log('state',{
          componentId: sectionId,
          json: `${JSON.stringify(state)}`,
          UserId:UserValue?.id 
        })
        axios
          .post(createUrl, {
            componentId: sectionId,
            json: `${JSON.stringify(state)}`,
            UserId:UserValue?.id 
          })
          .then((res: any) => {
            console.log('res',res)
            if (res.data.detail) {
              toast.success(res.data.detail.success)
            } else if (res.status === 201) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            } else if (res.status === 200) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            } else if (res.status === 204) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            }
            setParentId(res.data.result[0].masterParentId)
            setId(res.data.result[0].masterId)
            setTabValue(tabValue + 1)
            setControl(false)
          }).catch((error)=>{
            console.log('error insert',error)
          })
      }
    } else if (idparam != 0) {
      if (
        Object.keys(state).length ===
        fields.filter((i: any) => i.useInSaveMethod === true).length
      ) {
        console.log('user Id = > ',JSON.stringify(state) )
        axios
          .post(createUrl, {
            componentId: sectionId,
            json: `${JSON.stringify(state)}`,
            UserId:UserValue?.id 
          })
          .then((res: any) => {
            if (res.data.detail) {
              toast.success(res.data.detail.success)
            } else if (res.status === 201) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            } else if (res.status === 200) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            } else if (res.status === 204) {
              toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            } 
            setTabValue(tabValue + 1)
            setControl(false)
          }).catch((error)=>{
            console.log('error update',error)
          })
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
        }}
      >
        {fields?.map((field: any) => {
          const Component = field?.Component ? field?.Component : Input
          return (
            <Component
              {...field}
              masterFieldAliasName={field.S00_field[0]?.masterFieldAliasName}
              control={control}
              key={field?.aliasName}
              defaultValues={initialData}
              formState={formState}
              componentName={componentName}
              setValue={setValue}
              getValues={getValues}
              // getType={getType}
              // setType={setType}
              errors={formState.errors}
              register={register}
              isReadOnly={field?.isReadOnly}
            />
          )
        })}
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{ direction: 'rtl', marginRight: 3, marginTop: 8 }}
      >
        <Button type="submit" size="large" variant="contained" color="primary">
          ثبت اطلاعات
        </Button>
      </Grid>
    </form>
  )
}
export default FormSection
