import { Button, IconButton, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import FormSection from './FormSection'
import { useAxios } from '../../hooks/useAxios'
import TabGrid from './TabGrid'
import { getStructure } from './getStructure'
import HRMSwal from '../../utils/Swal'
import { TabHeader } from './TabHeader'
import Spinner from '../spinner/Spinner'
import { useNavigate } from 'react-router-dom'
import { theme } from '../../contexts/ThemeContext'
import { useParams } from 'react-router-dom'
import { ArrowCircleLeft } from '@mui/icons-material'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{
        width: '90%',
        borderRadius: '3px',
        height: `calc(100vh - 150px)`,
        overflowY: 'auto',
        backgroundColor: '#fff',
        padding: '1rem',
        marginLeft: '1rem',
      }}
    >
      {value === index && (
        <Box
          sx={{
            p: 0.5,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

const GTSForm = (props: any) => {
  const { formStructure } = props
  let [structure, setStructure] = useState([])
  const [currentPage, setCurrentPage] = useState()
  const [tabControl, setControl] = useState(false)
  let [header, setHeader]: any = useState()
  const { id }: any = useParams()
  const [masterParentId, setParentId] = useState(0)
  const [masterId, setId] = useState()
  const [Type, setType] = React.useState(3)
  useEffect(() => {
  
    if (id != 0) {
      setParentId(id)
    }
    if (formStructure?.length) {
      setStructure(getStructure(formStructure))
      if (structure?.length) {
        setCurrentPage(structure[0])
      }
    }
  }, [])
  useEffect(() => {
    if (structure?.length) {
      console.log('structure = > ',structure)
      setHeader(structure?.find((i: any) => i.componentName === 'Header'))
    }
  }, [structure])
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0)
 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (!tabControl) {
      console.log('new value',newValue)
      setValue(newValue)

    } else if (tabControl) {
      HRMSwal.warning({
        title: `<span style='font-family:Vazirmatn UI FD;font-size:18px;'>آیا مطمئن هستید؟</span>`,
        html: `<span style='font-family:Vazirmatn UI FD;font-size:16px;'>اطلاعات فرم تغییر یافته، در صورت خروج اطلاعات شما ذخیره نمی شود!</span>`,
      }).then((result: any) => {
        if (result.isConfirmed) {
          setValue(newValue)
          setControl(false)
        }
      })
    }
  } //@ts-ignore
  if (!structure?.length) {
    return <Spinner />
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          direction: 'rtl',
          mt: 1,
          mr: 2,
        }}
      >
        <Button
          sx={{
            display: 'flex',
            bgcolor: '#fff',
          }}
          aria-label="back"
          size="large"
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          <ArrowCircleLeft fontSize="medium" />
          <Typography p={1}>بازگشت به صفحه قبل</Typography>
        </Button>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: theme.palette.primary.light,
          display: 'flex',
          justifyContent: 'flex-start',
          p: 2,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          indicatorColor="secondary"
          sx={{
            backgroundColor: '#fff',
            height: `calc(100vh - 150px)`,
            overflow: 'auto',
            '&..MuiTabList-root': {
              height: '0.5rem',
              padding: '0',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#F79489',
            },
            borderRadius: '3px',
            minWidth: '150px',
            maxWidth: '190px',
          }}
        >
          {structure
            ?.filter((i: any, ind) => i.componentName !== 'Header')
            ?.map((section: any, index: any) => (
              <Tab
                disabled={index != 0 && !masterParentId && true}
                label={section.caption}
                {...a11yProps(index)}
                sx={{
                  '&.MuiTab-root': {
                    minHeight: '1.5rem',
                    padding: '1.2rem',
                    alignItems: 'flex-start',
                  },
                  whiteSpace: 'nowrap',
                  height: '10px',
                  '&.Mui-selected': {
                    boxShadow: `0px 1px 1px -1px rgb(0 0 0 / 10%), 0px 2px 3px 0px rgb(0 0 0 / 10%), 0px 1px 5px 0px rgb(0 0 0 / 10%)`,
                    color: '#F79489',
                    fontWeight: 500,
                    backgroundColor: '#FFF0DF',
                  },
                }}
                key={section.id}
                onClick={(e) => {
                  setCurrentPage(structure[index])
                }}
              />
            ))}
        </Tabs>
        {structure
          ?.filter((i: any, ind) => i.componentName !== 'Header')
          ?.map((section: any, index: any) => {
            return (
              <TabPanel value={value} index={index} key={section.id}>
                {header && (
                  <TabHeader
                    fields={header?.fields}
                    sectionId={header?.id}
                    subId={header.parentId}
                  />
                )}
                {section?.componentName === 'TabGrid' ? (
                  <TabGrid
                    key={section?.id}
                    tabValue={value}
                    hasAttachment={section?.hasAttachment}
                    setTabValue={setValue}
                    setType={setType}
                    fields={section?.fields}
                    setControl={setControl}
                    sectionId={section?.id}
                    subId={section?.subSystemId}
                    masterParentId={masterParentId}
                    masterId={masterId}
                    setParentId={setParentId}
                    setId={setId}
                    sectionCaption={section?.caption}
                    componentName={section?.componentName}
                  />
                ) 
                : (   
                  <FormSection
                    key={section?.id}
                    tabValue={value}
                    setTabValue={setValue}
                    setControl={setControl}
                    // setType={setType}
                    // getType={getType}
                    fields={section?.fields}
                    sectionId={section?.id}
                    subId={section?.subSystemId}
                    masterParentId={masterParentId}
                    masterId={masterId}
                    setParentId={setParentId}
                    setId={setId}
                    componentName={section?.componentName}
                  />
                )
                }
              </TabPanel>
            )
          })}
      </Box>
    </>
  )
}
export default GTSForm
