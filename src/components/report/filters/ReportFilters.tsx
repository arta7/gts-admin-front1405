import { Controller, useForm } from 'react-hook-form'
import { Box, Button,Grid, TextField } from '@mui/material'
import AsyncComboInput from '../../inputs/AsyncComboInput'
import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';



const ReportFilters = ({systemId,onSubmit}:any) => {
  const url = 'base/v1/api/component/get-dropdown-data'
  const uiComponentId = 28270 ;
    const { handleSubmit, control,setValue} = useForm({});
    const { user } = useAuth()
    const [subValue, setSubValue] = useState()
    const [componentIdValue,setIdValue]=useState()
    const [bodyJson,setBodyJson] = useState({})
  useEffect(() => {
    console.log('subValue',user)
        if (subValue && componentIdValue) {
            setBodyJson ( {
                json: `{"DataKey":"StatisticsReportCategory","componentId":${componentIdValue},"subSystemId":${subValue}}`,
                //@ts-ignore 
                // userId: user && user?.id,
                //@ts-ignore 
               // workgroupId: user && user?.workgroups[0]?.workgroupId,
                //@ts-ignore 
              //  organizationId: user && user?.workgroups[0]?.organizations[0]?.organizationId,
                //@ts-ignore 
               // isManager: user && user?.workgroups[0]?.isManager,
                PageSize: 0,
                PageNumber: 0
            })

      

        }
    },[subValue,componentIdValue])
    
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate={true}
      style={{
        padding: '1rem'}}>
         
     <Grid
        container
        spacing={3}
        sx={{
          width: '100%',
          alignItems: 'center',
        
        }}
      >
       
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <AsyncComboInput control={control}
            name={'subSystemId'} label='بخش اصلی' required={true}
            url={`/report/v1/api/get-component/${systemId}/-1`}
            getOptionLabel={(option: any) => option.caption}
                      variant='outlined'
                      setFilterValue={setSubValue}
                      UserValue={null}

          />
      
              </Grid>
               <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <AsyncComboInput control={control}
            name={'componentId'} label="بخش فرعی" 
            url={`/report/v1/api/get-component/${systemId}/${subValue}`}
            getOptionLabel={(option: any) => option.caption}
            variant='outlined'
            setFilterValue={setIdValue}
                      required={true}
             disabled={subValue?false:true}     
             UserValue={null}    
          />
      
        </Grid>
  
        
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <AsyncComboInput control={control}
            name={"specificReportId"} label="دسته بندی" 
            url={`/gts/v1/api/various-data/fetch`}
            body={bodyJson}
            loadDataByPostMethod={true}
            getOptionLabel={(option: any) => option.caption}
            variant='outlined'
                      required={true}
                       disabled={(subValue&&componentIdValue)?false:true}
                       UserValue={null}
          />

        </Grid>
         <Grid item  xs={12} sm={4} md={4} lg={4} xl={4}>
          <Controller
            name={'year'}
            rules={{
              maxLength:4,
              minLength:4
            }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
            size={'small'}
            label={'سال'}
            variant='outlined'
            sx={{ display: 'flex', fontSize: '0.7rem' }}
            autoComplete="off"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            type='number'
              
          />
        )}
        control={control}
      />
    </Grid>
     <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <AsyncComboInput
            control={control} name={'organizationId'} label='واحد'
            url={`base/v1/api/component/get-dropdown-data?uiComponentId=${uiComponentId}`}
            getOptionLabel={(option: any) => option.name}
            variant='outlined'
                      setFilterValue={setValue}
                      UserValue={null}
                      
          />
        </Grid>
        <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
          <Button type="submit" size="medium" variant="contained" color="primary">
          نمایش گزارش
          </Button>
          </Grid>
          
      </Grid>
      </form>
  );
}

export default ReportFilters
