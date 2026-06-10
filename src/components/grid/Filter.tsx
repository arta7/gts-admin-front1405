import {
  Column,
  Table as ReactTable
} from '@tanstack/react-table'
import { DebouncedInput } from './DebounceInput'


export function Filter({ column, table }: {
  column: Column<any, any>,
  table: ReactTable<any>
}) {


  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)
    column.getFilterFn
  const columnFilterValue = column.getFilterValue()
 
   return <DebouncedInput
    type='text'
    value={(columnFilterValue ?? '') as string}
    onChange={(value) => {
      //console.log('firstValue',firstValue)
      column.setFilterValue(value)}}
    placeholder={`جستجو...`}
    inputProps={{ 'aria-label': 'search' }}
    debounce={1000}
  /> 
  

}