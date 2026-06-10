
import axios from "axios"
import React from "react"
import Grid from "./components/grid/Grid"
// import * as people from './people.json'

const columns = [
    {
        accessorKey: 'firstName',
        header: 'نام',
    },
    {
        accessorKey: 'lastName',
        header: 'نام خانوادگی',
    },
    {
        accessorKey: 'age',
        header: 'سن',
    },
    {
        accessorKey: 'status',
        header: 'موقعیت',
    },
    {
        accessorKey: 'visits',
        header: 'مراجعات'
    },
    {
        accessorKey: 'progress',
        header: 'پیشرفت',
    },
    {
        accessorKey: 'country',
        header: 'کشور',
    },
    {
        accessorKey: 'city',
        header: 'شهر',
    },
    {
        accessorKey: 'phone',
        header: 'شماره تماس',
    },
    {
        accessorKey: 'birthDate',
        header: 'تاریخ تولد',
    },
    {
        accessorKey: 'certificateNo',
        header: 'شماره شناسنامه',
    },
    {
        accessorKey: 'desc',
        header: 'توضیحات',
    }
]



export function ServerSideGrid() {
    const onDelete = (row: any) => {
        console.log("Delete ", row);
    }
    const onEdit = (row: any) => {
        console.log("Edit ", row);
    }
    const onAdd = () => {
        console.log('Add')
    }
    return <Grid columns={columns} enableFilters={true} url='people.json' onDelete={onDelete} onEdit={onEdit} onAdd={onAdd} />
}

export function ClientSidePaingGrid() {
    const onDelete = (row: any) => {
        console.log("Delete ", row);
    }
    const onEdit = (row: any) => {
        console.log("Edit ", row);
    }
    const onAdd = () => {
        console.log('Add')
    }
    const [rows, setRows] = React.useState([])
    React.useEffect(() => {
       setTimeout(()=>{
        //@ts-ignore
        setRows(people.default);
       },1000)
    }, [])
    return <Grid columns={columns} rows={rows} onDelete={onDelete} onEdit={onEdit} onAdd={onAdd} paging={true} enableFilters={true}/>
}