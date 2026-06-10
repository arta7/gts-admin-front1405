import { Box, Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAxios } from '../hooks/useAxios'
import MasterGrid from './MasterGrid'
import GridLoader from "react-spinners/GridLoader";
import { useAsync } from '../hooks/useAsync'

export default function DynamicComponent({ info }: any) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { run, data, isLoading, isIdle, isError, isSuccess } = useAsync(null);
  const componentInfo = data || [];

  const { id } = useParams()

  const getStructure = () => axios.get(`base/v1/api/component/structure/find?subId=${info.subSystemId}&componentId=${info.id}`)
    .then((response) => {
      console.log('response return mastergrid ',response)
      return response.data.result
    });

  React.useEffect(() => {

    console.log('info.subSystemId',componentInfo)
    run(getStructure());


  }, [info]);


  useEffect(() => {
    console.log('componentinfo', info)
  }, [])




  if (isLoading || isIdle) {
    return <GridLoader color="#36d7b7" />
  }
  else if (isError) {
    return null
  }
  else if (isSuccess && componentInfo.length && componentInfo[0].componentName === 'Grid') {
    return (
      <Box padding={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <MasterGrid structure={componentInfo} SubjectCaption={info.caption} />
      </Box>
    )
  }
  return (
    <Box padding={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      unknown
    </Box>
  )
}
