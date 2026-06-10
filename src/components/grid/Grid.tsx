import {
  Box,
  Checkbox,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableFooter,
  TableHead,

  TablePagination,
  TableRow as MuiTableRow,
  Tooltip,
} from '@mui/material'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  TableOptions,
  ColumnFiltersState,
  Row,
  Column,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  GroupingState,
  filterFns,

} from '@tanstack/react-table'
import { format } from 'date-fns-jalali'
import axios from 'axios'
import { Edit, Trash } from 'iconsax-react'
import React, { ReactNode, useEffect, useState } from 'react'
import TablePaginationActions from './Actions'
import GridSettings from './GridSettings'
import { HeaderCell } from './HeaderCell'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AttachFile, AttachFileTwoTone } from '@mui/icons-material'
import moment from 'jalali-moment';
import { ExcelMediaType } from '../../utils/Util';
type GridOptions = {
  filters?: Array<any>
  sorting?: Array<any>
  PageNumber: Number
  PageSize: Number,

}

export type CustomAction = {
  method: (row: any) => any
  icon: ReactNode
  tooltip: string
}

export type UnitAction = {
  method: (row: any) => any
  icon: ReactNode
  tooltip: string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}))

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export default function Grid({
  columns: cols,
  enableFilters,
  rows,
  url,
  onDelete,
  onEdit,
  onAdd,
  hasAttachment,
  deleteEdit,
  removeDelete,
  addRowNumber,
  onAttachmnet,
  onAttachmentTabGrid,
  customAction,
  getDataParams,
  columnVisibility,
  defaultColumnVisibilityState,
  showRowsCount: _showRowsCount,
  id,
  onRowClick,
  exportable: _exportable,
  grouping: enableGrouping,
  paging = false,
  exportToExcel,
  pageSize: customPageSize,
  SubjectCaption: SubjectCaption,
  UnitAction
  // isDataStale,
  // setIsDataStale
}: any) {
  const hasEdit = deleteEdit ? false : true;
  const hasDelete = removeDelete ? false : true;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [loadDataErrorMessage, setLoadDataErrorMessage] = React.useState<
    string
  >('')
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  const [grouping, setGrouping] = React.useState<GroupingState>([])

  const serverSideGrid = url != null

  const enablePaging = serverSideGrid || paging

  let exportable = _exportable
  if (_exportable == undefined) {
    exportable = serverSideGrid
  }

  const enableColumnVisibility = serverSideGrid || columnVisibility
  const showRowsCount = serverSideGrid || _showRowsCount
  const [data, setData] = React.useState<{
    rows: any[]
    pageCount: number
  } | null>()

  const [rowsCount, setRowsCount] = React.useState<number>(0);


  useEffect(() => {
    
   console.log('rows',rows)
  }, [])

  const columns = React.useMemo<ColumnDef<any>[]>(() => {
    const _columns = [...cols].map((col: any) => {

      col.aggregationFn = col.aggregationFn || null;
      if (col.meta) {
        if (col.meta.type == 'boolean') {
          col.cell = ({ getValue }: any) =>
            getValue() ? (
              <Checkbox disabled checked sx={{ p: 0 }} />
            ) : (
              <Checkbox disabled sx={{ p: 0 }} />
            )
        } else if (col.meta.type == 'date') {
          col.filterFn = (row: any, id: any, value: any) => {
            var fDate, lDate, cDate;
            fDate = Date.parse(value["StartDate"]);
            lDate = Date.parse(value["EndDate"]);
            cDate = Date.parse(row.getValue(id));
            return (cDate <= lDate && cDate >= fDate)
          },
            col.cell = ({ getValue }: any) =>
              getValue() ? moment(getValue().toString().substring(0, 10), 'yyyy/MM/DD').locale('fa').format('YYYY/MM/DD') : '';
        } else if (col.meta.type == 'time') {
          col.cell = ({ getValue }: any) =>
            getValue() ? format(new Date(getValue()), 'hh:mm') : ''
        }
      }
      return col
    })

    if (addRowNumber) {
      _columns.unshift({
        id: 'rowNumber',
        header: 'ردیف',
        cell: ({ row }: any) => {
          return row.index + 1
        },
        aggregationFn: null
      })
    }
    if (onEdit || onDelete || customAction || UnitAction) {
      _columns.push({
        id: 'actions',
        header: '',
        cell: ({ row }: { row: Row<any> }) => {
          return (
            <Stack spacing={2} direction={'row'}>
              {hasEdit
                && <Tooltip title={'ویرایش'}>
                  <IconButton
                    sx={{ p: 0 }}
                    color="primary"
                    aria-label="edit"
                    onClick={() => {
                      console.log('data edit ', row.original)
                      onEdit(row.original)
                    }}
                  >
                    <Edit size="24" variant="TwoTone" />
                  </IconButton>
                </Tooltip>}
              {hasAttachment && (
                <Tooltip title={'مستندات'}>
                  <IconButton
                    sx={{ p: 0 }}
                    color="primary"
                    onClick={() => {
                      console.log('row.original ', onAttachmentTabGrid)
                      if (onAttachmentTabGrid) {
                        onAttachmentTabGrid(row.original)
                      } else if (onAttachmnet) {
                        onAttachmnet(row.original)
                      }

                    }}
                  >
                    <AttachFileTwoTone />
                  </IconButton>
                </Tooltip>
              )}
              {hasDelete && <Tooltip title={'حذف'}>
                <IconButton
                  sx={{ p: 0 }}
                  color="primary"
                  aria-label="delete"
                  onClick={() => onDelete(row.original)}
                >
                  <Trash size="24" variant="TwoTone" />
                </IconButton>
              </Tooltip>}
              {customAction && (
                <Tooltip title={customAction.tooltip}>
                  <IconButton
                    sx={{ p: 0 }}
                    color="primary"
                    aria-label="delete"
                    onClick={() => customAction.method(row.original)}
                  >
                    {customAction.icon}
                  </IconButton>
                </Tooltip>
              )}

              {UnitAction && (
                <Tooltip title={UnitAction.tooltip}>
                  <IconButton
                    sx={{ p: 0 }}
                    color="primary"
                    aria-label="delete"
                    onClick={() => UnitAction.method(row.original)}
                  >
                    {UnitAction.icon}
                  </IconButton>
                </Tooltip>
              )}

            </Stack>
          )
        },
      })
    }

    return _columns
  }, [cols])

  const fetchData = (options: GridOptions) => {
    console.log('gridOptions',options)
    setIsFetching(true)
    setLoadDataErrorMessage('')
    let gridOptions: GridOptions = {
      PageNumber: pageIndex,
      PageSize: pageSize,
    }
    if (filters?.length) {

      gridOptions.filters = options.filters
    }
    if (sorting?.length) {
      gridOptions.sorting = options.sorting
    }

    if (getDataParams) {
      gridOptions = { ...gridOptions, ...getDataParams }
    }
  
    return axios
      .post(url, gridOptions)
      .then((response) => {
        const data: Array<any> = response.data.result;
        setIsFetching(false);
        // setIsDataStale(false);
        let rows: Array<any> = [];
        let pageCount = 0;
        let rowsCount = 0;
        if (data?.length) {
          rows = data;
          pageCount = Math.ceil(data[0].RowsCount / pageSize);
          rowsCount = data[0].RowsCount;
        }
        setRowsCount(rowsCount);
        return {
          rows: rows,
          pageCount: pageCount,
        }
      })
      .catch((error: Error) => {
        setIsFetching(false)
        setLoadDataErrorMessage('بارگذاری سطرها با خطا مواجه شد.')
      })
  }

  const defaultData = React.useMemo(() => rows || [], [rows])

  const options: TableOptions<any> = {
    enableFilters: false,
    enableGrouping: false,
    data: data?.rows || defaultData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  }
  options.initialState = {}

  if (enableColumnVisibility) {
    // let initialColumnVisbilityState = {};
    // const initialColumnVisbilityState_ls = localStorage.getItem(`columnVisibilityState_${id}`);
    // if (initialColumnVisbilityState_ls) {
    //     initialColumnVisbilityState = JSON.parse(initialColumnVisbilityState_ls);
    // }
    // options.initialState.columnVisibility = initialColumnVisbilityState;
    if (defaultColumnVisibilityState) {
      options.initialState.columnVisibility = defaultColumnVisibilityState
    }
  }

  options.state = {};
  if (enableFilters) {
    options.enableFilters = true
    options.enableSorting = true
    options.state.columnFilters = columnFilters
    options.onColumnFiltersChange = (filterValue: any) => {
      console.log('filter value : ', (filterValue))
      table.setPageIndex(0)
      if (filterValue()?.length > 0) {
        if (typeof (filterValue()[0].value) != 'object') {
          setColumnFilters(filterValue)
        }
        else {

          console.log('test object', filterValue()[0].value.StartDate)
          setColumnFilters(filterValue)
        }
      }
      else {
        setColumnFilters(filterValue)
      }
    }
  }
  if (enablePaging) {
    options.initialState.pagination = {
      pageSize: customPageSize || 10,
    }
  }
  if (enableGrouping) {
    options.enableGrouping = true;
    options.state.grouping = grouping;
  }

  if (serverSideGrid) {
    options.manualSorting = true
    options.manualPagination = true
    options.pageCount = data?.pageCount ?? -1
    if (enableFilters) {
      options.manualFiltering = true
    }
  } else {
    if (paging) {
      options.getPaginationRowModel = getPaginationRowModel()
    }
    if (enableFilters) {
      options.getSortedRowModel = getSortedRowModel()
      options.getFilteredRowModel = getFilteredRowModel()
    }
    if (enableGrouping) {
      options.onGroupingChange = setGrouping;
      options.getExpandedRowModel = getExpandedRowModel();
      options.getGroupedRowModel = getGroupedRowModel();
    }
  }

  const table = useReactTable(options)

  const filters = table.getState().columnFilters
  const sorting = table.getState().sorting
  const { pageSize, pageIndex } = table.getState().pagination
  const fetchDataOptions = { PageNumber: pageIndex, PageSize: pageSize, filters, sorting }

  React.useEffect(() => {
    console.log('filters options : ', serverSideGrid,'fetchDataOptions',fetchDataOptions)
    if (serverSideGrid) {
      fetchData(fetchDataOptions).then((data: any) => {
        console.log('test data', data)
        setData(data);
      }).catch((error)=>{
        console.log('error data', error)
      })
    }
  }, [pageSize, pageIndex, filters, sorting]);

  // useEffect(() => {
  //   if (serverSideGrid && isDataStale) {
  //     table.setPageIndex(0);
  //   }
  // }, [isDataStale])

  let columnCount = table.getAllFlatColumns()?.length + 1
  if (addRowNumber) {
    columnCount += 1
  }

  const handleCellClicked = (e: any, cell: any): void => {
    console.log('click',onRowClick)
    const { column, row } = cell;
    if (column?.id == "actions") {
      return;
    }
    if (onRowClick) {
      onRowClick(row?.original, row?.index);
    }
  }

  return (
    <Box sx={{ width: '100%', paddingY: 2, whiteSpace: 'nowrap' }}>
      {(serverSideGrid || onAdd || paging || exportable) && (
        <GridSettings
          gridId={id}
          table={table}
          onAdd={onAdd}
          enableColumnVisibility={enableColumnVisibility}
          showRowsCount={showRowsCount}
          exportable={exportable}
          rowsCount={serverSideGrid ? rowsCount : rows?.length}
          exportToExcel={exportToExcel}
          SubjectCaption={SubjectCaption}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <MuiTableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <HeaderCell
                      key={header.id}
                      header={header}
                      table={table}
                      serverSideGrid={serverSideGrid}

                    />
                  )
                })}
              </MuiTableRow>
            ))}
          </TableHead>
          <TableBody>
            {isFetching && (
              <TableRow>
                <TableCell colSpan={columnCount}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {!isFetching &&
              !loadDataErrorMessage &&
              table.getRowModel().rows?.length == 0 && (
                <TableRow>
                  <TableCell colSpan={columnCount}>
                    {'رکوردی وجود ندارد'}
                  </TableCell>
                </TableRow>
              )}
            {loadDataErrorMessage ? (
              <TableRow>
                <TableCell colSpan={columnCount}>
                  {loadDataErrorMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id} onClick={(e) => handleCellClicked(e, cell)} 
                        sx={{ textAlign: 'right',alignItems: 'center', justifyContent: 'center' }}
                        >
                          {cell.getIsGrouped() ? (
                            <>
                              <IconButton onClick={row.getToggleExpandedHandler()} color="primary" sx={{ p: 0 }}>
                                {
                                  row.getIsExpanded() ?
                                    <KeyboardArrowDownIcon /> :
                                    <KeyboardArrowLeftIcon />
                                }
                              </IconButton>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}{' '}
                              ({row.subRows?.length})
                            </>
                          ) : cell.getIsPlaceholder() ? null : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
        <TableFooter component={'div'}>
          {enablePaging && !loadDataErrorMessage && (
            <TablePagination
              rowsPerPageOptions={[6]}
              component="div"
              count={serverSideGrid ? rowsCount : rows ? (table.getPageCount() * pageSize) : -1}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={(_, page) => {
                table.setPageIndex(page)
              }}
              onRowsPerPageChange={(e) => {
                const size = e.target.value ? Number(e.target.value) : 10
                table.setPageSize(size)
              }}
              ActionsComponent={TablePaginationActions}
            />
          )}
        </TableFooter>
      </TableContainer>
    </Box>
  )
}
