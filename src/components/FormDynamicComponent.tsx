import { Box, Button, Skeleton } from '@mui/material'
import axios from 'axios'
import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import GTSForm from './forms/GTSForm'
import Spinner from './spinner/Spinner'
import GridLoader from 'react-spinners/GridLoader'

export default function FormDynamicComponent({ info }: any) {
  const [componentInfo, setComponentInfo] = React.useState<any>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { id } = useParams()
  React.useEffect(() => {
    axios
      .get(
        `base/v1/api/component/structure/find?subId=${searchParams.get(
          'subId',
        )}&componentId=${searchParams.get('componentId')}`,
      )
      .then((response) => {
        
        console.log('check data  : ',`${searchParams.get(
          'subId',
        )}&componentId=${searchParams.get('componentId')}`)
        setComponentInfo(response.data.result)
      })
  }, [])

  if (!componentInfo) {
    return <GridLoader color="#36d7b7" />
  }

  if (componentInfo?.length >= 0) {
    return <GTSForm formStructure={componentInfo} />
  }
  return (
    <Box padding={2} sx={{ display: 'flex', flexDirection: 'column' }}>
      unknown
    </Box>
  )
}
