import { Box, useTheme } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Grid from '../../components/grid/Grid'
import Modals from './Modals'
import AttachmentModal from '../AttachmentModal'
import useConfirmDialog from '../ConfirmDialog/UseConfirmDialog'
import { error } from 'console'
import { getServerError } from '../../utils/axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'

export default function TabGrid(props: any) {
  const {
    fields,
    submitPath,
    tabValue,
    setTabValue,
    setType,
    sectionId,
    masterParentId,
    masterId,
    componentName,
    componentId,
    hasAttachment,
    sectionCaption
  } = props

  const [open, setOpen] = React.useState(false)
  const [entity, setEntity] = React.useState()
  const columns = getGridColumns(fields)
  const [initialData, setInitialData] = useState({})
  const [rows, setRows] = React.useState([])
  const url = '/gts/v1/api/component-data/fetch'
  const { id: idparam }: any = useParams()
   const { confirm } = useConfirmDialog();
   const { user  } = useAuth()
  const UserValue= user as any;
  const fetchData = async () => {
    if (sectionId != undefined) {
      axios
        .post(url, {
          componentId: sectionId,
          masterId: masterId,
          masterParentId: masterParentId,
          userId:UserValue?.id 
        })
        .then((response) => {
          const data = response.data.result as any
          setInitialData(data)
          setRows(data)
        })
    }
  }

  React.useEffect(() => {
    if (sectionId != undefined) {
      axios
        .post(url, {
          componentId: sectionId,
          masterId: masterId,
          masterParentId: masterParentId,
          userId:UserValue?.id 
        })
        .then((response) => {
          const data = response.data.result as any
          setInitialData(data)
          setRows(data)
        })
    }
  }, [sectionId])
  const openModal = (entity: any) => {
    
    setEntity(entity)
    setOpen(true)
  }
  const [tabControl, setControl] = useState(false)
  const handleCloseModal = () => {
    setOpen(false)
    fetchData()
  }

  const onAdd = () => {
    openModal(fields)
  }
  const theme = useTheme()

  const onEdit = (rowEntity: any) => {
     console.log('rowEntity',rowEntity)
    openModal(rowEntity)
  }
  const onDelete = (row: any) => {
    confirm(`آیااز حذف این اطلاعات مطمئن هستید؟`).then(
      (isConfirmed) => {
        if (isConfirmed) {
          return  axios
      .delete(`/gts/v1/api/component-data/remove/${sectionId}/${row.masterId}`)
      .then((res) => {
        fetchData()
      })
        }
      },
    )
  }
      const [rowEntity,setRowEntity]=useState()
  const [openAttachment, setOpenAttachment] = React.useState(false);
  const onAttachmentTabGrid = (row: any) => {
    setRowEntity(row)
    setOpenAttachment(true)
  }
const [selectedFiles, setSelectedFiles] = useState();
const handleClose = () => setOpenAttachment(false);
  return (
    <Box padding={2} sx={{ width: '100%' }}>
      <Grid
        columns={columns}
        rows={rows}
        onEdit={onEdit}
        onAdd={onAdd}
        onDelete={onDelete}
        hasAttachment={true}
        onAttachmentTabGrid={onAttachmentTabGrid}
        addRowNumber={true}
      />
      {open && (
        <Modals
          open={open}
          entity={entity}
          onClose={handleCloseModal}
          setOpen={setOpen}
          sectionId={sectionId}
          subId={sectionId.subSystemId}
          setControl={setControl}
          fields={fields}
          masterId={masterId}
          masterParentId={masterParentId}
          idparam={idparam}
          componentName={componentName}
        
        />
      )}
        <AttachmentModal open={openAttachment} row={rowEntity} onSubmit={handleClose} onClose={handleClose} fileUploadProps={{
                value: selectedFiles,
                onChange: setSelectedFiles,
                componentId: sectionId,
                ownerId:idparam,
                componentName:sectionCaption
            }} />
    </Box>
  )
}
function getGridColumns(fields: any) {
  const columns = fields
    ?.filter((field: any) => field.isVisible === true)
    ?.map((field: any) => {
      const colInfo: any = {
        accessorKey: field.aliasName,
        header: field.fieldCaption,
      }
      if (field.uiComponentType == 'CheckBox') {
        colInfo.meta = {
          type: 'boolean',
        }
      } else if (field.uiComponentType == 'DatePicker') {
        colInfo.meta = {
          type: 'date',
        }
      } else if (field.uiComponentType == 'TimePicker') {
        colInfo.meta = {
          type: 'time',
        }
      }
      return colInfo
    })
    .sort((a: any, b: any) => {
      return a['fieldSortOrder'] - b['fieldSortOrder']
    })
  return columns
}
