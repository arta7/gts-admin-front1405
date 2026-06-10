import { Column, Table } from "@tanstack/react-table";
import React,{useEffect, useState} from "react";
import { DebouncedInput } from "./DebounceInput";
import DateInput from "./DateInput";
import Datepicker from "../DatePicker/DatePicker";


interface ColumnMeta<TData, TValue> {
    meta: {
      type?: string; // Optional string property
    };
  }

export default function ClientFilter({
    column,
    table,
    onClose,
    onClearFilter
}: {
    column: Column<any, unknown>;
    table: Table<any>;
    onClose:any,
    onClearFilter:any
}) {
    
    

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    const firstValue = table
        .getPreFilteredRowModel()
        .flatRows[0]?.getValue(column.id);

        var TypeValue =  typeof firstValue; 
        var columntype = (column.columnDef?.meta as any)?.type;
        const handleStartDateChange = (event:any) => {
            console.log('event : ',event)
            setStartDate(event.toISOString());
          };
        
          const handleEndDateChange = (event:any) => {
            setEndDate(event.toISOString());
          };
        
          const applyDateRangeFilter = () => {

            if(startDate != "" && endDate!="")
            {
            column.setFilterValue({"StartDate" : new Date(startDate).toISOString(),"EndDate":new Date(endDate).toDateString()})
                onClose()
            }
            else 
            {
                alert('لطفا تاریخ شروع و پایان را انتخاب کنید')
            }
          }


          const RemoveFilter=()=>{
            onClearFilter()
            onClose()
          }
     
    const columnFilterValue = column.getFilterValue();
   
 useEffect(()=>{
    var x = '2024-01-20T20:30:00.000';

    setStartDate(new Date(x).toString() )
    console.log('column : : : > ', new Date(x).toString()  )
    if(typeof(columnFilterValue) == 'object' && columnFilterValue!= null )
    {
        // console.log('columnFilterValue.StartDate',new Date(columnFilterValue?.StartDate))
        var newStartDate =  new Date((columnFilterValue as any)?.StartDate);
        var newEndDate =  new Date((columnFilterValue as any)?.EndDate);

      setStartDate(newStartDate.toString())
       setEndDate(newEndDate.toString())
    }

 },[])

    return ( TypeValue=== "number" ? (
        <div>
            <div className="flex space-x-2">
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[0] ?? ""}
                    onChange={(value: number) =>
                        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
                    }
                    placeholder={`بزرگتر ${column.getFacetedMinMaxValues()?.[0]
                        ? `(${column.getFacetedMinMaxValues()?.[0]})`
                        : ""
                        }`}
                />
                <DebouncedInput
                    type="number"
                    min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
                    max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
                    value={(columnFilterValue as [number, number])?.[1] ?? ""}
                    onChange={(value: number) =>
                        column.setFilterValue((old: [number, number]) => [old?.[0], value])
                    }
                    placeholder={`کوچکتر ${column.getFacetedMinMaxValues()?.[1]
                        ? `(${column.getFacetedMinMaxValues()?.[1]})`
                        : ""
                        }`}
                />
            </div>
        </div>
    ) 
    : (columntype  === "date") ?  (
        
        <div>
      <DateInput  
        value={columnFilterValue!= null ? new Date((columnFilterValue as any)?.StartDate) : startDate}
        onChange={handleStartDateChange}
        placeholder='تاریخ شروع'
        
        />
        <DateInput  
        value={columnFilterValue != null ? new Date((columnFilterValue as any)?.EndDate) : endDate}
        onChange={handleEndDateChange}
        placeholder='تاریخ پایان'/>
        <div>
        <button onClick={applyDateRangeFilter}>تایید</button>
        <button style={{marginLeft:2,marginRight:2}} onClick={RemoveFilter}>حذف فیلتر</button>
        </div>
    
    </div>   
    ) 
    :
     (
        <DebouncedInput
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={(value) => {
                 console.log('value 2 ',table
                 .getPreFilteredRowModel()
                 .flatRows[0]?.getValue)
                column.setFilterValue(value)
            }}
            placeholder={`جستجو...`}
        />
    )
    )
}