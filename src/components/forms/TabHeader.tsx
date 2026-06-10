import { Box, Grid, Skeleton, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { theme } from '../../contexts/ThemeContext'
import { toast } from 'react-toastify'
import { getServerError } from '../../utils/axios'
import { useAuth } from '../../contexts/AuthContext'

export const TabHeader = (props: any) => {
  const { fields, sectionId, subId } = props
  const url = '/gts/v1/api/component-data/fetch'

  const [headerData, setHeaderData] = useState()
  let [loading, setLoading] = useState(true)
  const { id: idparam }: any = useParams();
  const { user  } = useAuth()
  const UserValue= user as any;
  React.useEffect(() => {
    if (idparam != 0) {
      if (sectionId != undefined) {
        axios
          .post(url, {
            componentId: `${sectionId}`,
            masterParentId:`${idparam}`,
            userId:UserValue?.id 
          })
          .then((response) => {
            const data = response.data.result as any
            setHeaderData(data?.find((i: any) => i.masterId === idparam))
            setLoading(false)
          })
      }
    }
  }, [sectionId])
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '4px',
        marginBottom: '1rem',
        marginLeft: '0.01px',
        paddingBottom: '1rem',
      }}
    >
      {fields
        ?.filter((fi: any) => fi.isVisible === true)
        ?.map((field: any) => {
          let value = headerData ? headerData[field.aliasName] : ''
          return (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              key={field.aliasName}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.dark,
                fontWeight: 'bold',
              }}
            >
              <Typography>{field.fieldCaption} : </Typography>

              <Typography sx={{ color: "#323643" }}>
                {value}
              </Typography>
            </Grid>
          )
        })}
    </Grid>
  )
}
