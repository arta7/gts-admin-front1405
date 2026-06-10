import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GridLoader from 'react-spinners/GridLoader'
import { toast } from 'react-toastify'
import { useAsync } from '../hooks/useAsync'
import { inValidResponseFormatGridRows } from '../utils/Messages'
import Grid from './grid/Grid'
import useConfirmDialog from './ConfirmDialog/UseConfirmDialog'
import AttachmentModal from './AttachmentModal';
import { useAuth } from './../contexts/AuthContext';

export default function MasterGrid({ structure,SubjectCaption }: any) {
  const hasAttachment = structure?.hasAttachment||true;
  const componentInfo = structure[0]
  const _columns = getGridColumns(componentInfo.fields)
  const [columns, setColumns] = React.useState(() => _columns)
  const [
    defaultColumnVisibilityState,
    setDefaultColumnVisibilityState,
  ] = React.useState(getHiddenColumnsDictionary(componentInfo.fields))
  const { run, data: rows, isLoading, isIdle, isError, isSuccess } = useAsync(
    null,
  )
  const { confirm } = useConfirmDialog();
  const url = '/gts/v1/api/component-data/fetch'
  const navigate = useNavigate()
  const { user  } = useAuth()
  const UserValue= user as any;
  const loadData = () => 
   
    axios
      .post(url, {
        componentId: componentInfo.id,
        userId:UserValue?.id 
      })
      .then((response: any) => {
         console.log('response.data.result => ',response)
       
        if (!response.data.result) {
          toast.error(inValidResponseFormatGridRows)
          return []
        }
        console.log('response.data.result grid',response.data.result)
        return response.data.result
      })
    
    

  React.useEffect(() => {
    console.log('componentInfo.fields',componentInfo)
    run(loadData())
  }, [componentInfo])

  const onAdd = () => {
    navigate(
      `0?subId=${componentInfo.subSystemId}&componentId=${componentInfo.id}`,
    )
  }

  const onEdit = (row: any) => {
    navigate(
      `${row.masterId}?subId=${componentInfo.subSystemId}&componentId=${componentInfo.id}`,
    )
  }
    const onDelete = (row: any) => {
    confirm(`آیااز حذف این اطلاعات مطمئن هستید؟`).then(
      (isConfirmed) => {
        if (isConfirmed) {
          return   axios
      .delete(
        `/gts/v1/api/component-data/remove/${componentInfo.id}/${row.masterId}`,
      )
      .then((res) => {
        run(loadData())
      })
        }
      },
    )
  }
  // const onDelete = (row: any) => {
  //   axios
  //     .delete(
  //       `/gts/v1/api/component-data/remove/${componentInfo.id}/${row.masterId}`,
  //     )
  //     .then((res) => {
  //       run(loadData())
  //     })
  // }
  const [rowEntity, setRowEntity] = useState({})
  let ownerId: any;
  const [open, setOpen] = React.useState(false);
  const onAttachment = (row: any) => {
    setRowEntity(row)
    ownerId = row.masterId;
    setOpen(true);
  }
const [selectedFiles, setSelectedFiles] = useState();
const handleClose = () => setOpen(false);
 
  if (isLoading || isIdle) {
    return <GridLoader color="#36d7b7" />
  } else if (isError) {
    return null
  }
  return (
    <React.Fragment>
    <Grid
      id={componentInfo.id}
      columns={columns}
      rows={rows}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      hasAttachment={hasAttachment}
      onAttachmnet={onAttachment}
      getDataParams={{ subId: 3 }}
      columnVisibility={true}
      defaultColumnVisibilityState={defaultColumnVisibilityState}
      showRowsCount={true}
      enableFilters={true}
      exportable={true}
      paging={true}
      addRowNumber={true}
      grouping={true}
      SubjectCaption={SubjectCaption}
      />
      <AttachmentModal componentName={componentInfo.componentName} open={open} row={rowEntity} onSubmit={handleClose} onClose={handleClose} fileUploadProps={{
                value: selectedFiles,
        onChange: setSelectedFiles,
         componentId: componentInfo?.id,
         componentName:componentInfo?.caption
            }} />
      </React.Fragment>
  )
}

export function getGridColumns(fields: any) {
  const columns = fields?.filter((field: any) => !field.neverVisible)
    .map((field: any) => {
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
      }
      return colInfo
    })
    .sort((a: any, b: any) => {
      return a['fieldSortOrder'] - b['fieldSortOrder']
    })
  return columns
}

function getHiddenColumnsDictionary(columns: Array<any>) {
  const hiddenColumnsArray = columns.filter(
    (column: any) => !column.isVisibleInGrid,
  )
  const state: any = {}
  hiddenColumnsArray.forEach((column) => {
    state[column.aliasName] = false
  })
  return state
}
