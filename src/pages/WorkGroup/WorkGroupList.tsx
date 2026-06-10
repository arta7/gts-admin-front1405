import { Box } from "@mui/material";
import axios from "axios";
import { SecurityUser } from "iconsax-react";
import React from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import useConfirmDialog from "../../components/ConfirmDialog/UseConfirmDialog";
import Grid, { CustomAction } from "../../components/grid/Grid";
import PermissionManagerModal from "./PermissionManagerModal";
import WorkGroupEditForm from "./WorkGroupEditForm";

export type WorkGroup = {
    id: number,
    name: string,
    isManager: boolean,
    isActive: boolean
}

export const workgroupWebService = '/base/v1/api/workgroup';

const createWorkGroup = () => ({ name: '', isActive: false, isManager: false}) as WorkGroup;

export const loader = () => {
    console.log("WorkGrouploader")
    return axios.get(`${workgroupWebService}/inquiry`).then(response => {
        console.log('rows : ',response.data.result)
        return response.data.result;
    })
}

export default function WorkgroupList() {
    const [open, setOpen] = React.useState(false);
    const [openPermissionManager, setOpenPermissionManager] = React.useState(false);
    const [entity, setEntity] = React.useState<WorkGroup>();
    const { confirm } = useConfirmDialog();
    let revalidator = useRevalidator();

    const reloadData = () => revalidator.revalidate();

    const rows = useLoaderData();

    const openModal = (entity: WorkGroup) => {
        console.log('entity',entity)
        setEntity(entity);
        setOpen(true);
    };
    const handleCloseModal = (submit: any) => {
        setOpen(false);
        if (submit) {
            reloadData();
        }
    };
    const onAdd = () => {
        openModal(createWorkGroup());
    }

    const columns = [
        {
            accessorKey: 'name',
            header: 'نام'
        },
        {
            accessorKey: 'isManager',
            header: 'مدیریت',
            type: 'boolean',
            meta: {
                type: 'boolean'
            }
        },
        {
            accessorKey: 'isActive',
            header: 'فعال',
            meta: {
                type: 'boolean'
            }
        }
    ];

    const customAction: CustomAction = {
        method: (row: WorkGroup) => {
            openPermissionManagerModal(row);
        },
        icon: <SecurityUser />,
        tooltip: 'تعیین دسترسی'
    }

    const onEdit = (rowEntity: WorkGroup) => {
        console.log('rowentity',rowEntity)
        openModal(rowEntity);
    };

    const onDelete = (entity: WorkGroup) => {
        confirm(`آیا میخواهید گروه کاری ${entity.name} را حذف کنید؟`).then((isConfirmed) => {
            if (isConfirmed) {
                return axios.delete(`${workgroupWebService}/remove/${entity.id}`).then(() => {
                    reloadData();
                });
            }
        })
    }

    const openPermissionManagerModal = (entity: WorkGroup) => {
        setEntity(entity);
        setOpenPermissionManager(true);
    };

    

    const handleClosePermissionManagerModal = (submit: any) => {
        setOpenPermissionManager(false);

        if (submit) {
            reloadData() ;
        }
    };

    return <Box padding={2} sx={{ width: '60%' }}>
        <Box sx={{ height: '700px', overflowY: 'auto' }} paddingBottom={10}>
        ‍<Grid columns={columns} rows={rows} customAction={customAction} onEdit={onEdit} onAdd={onAdd} onDelete={onDelete} />
        </Box>
        {
            open && <WorkGroupEditForm open={open} entity={entity} onClose={handleCloseModal} webService={workgroupWebService} />
        }
        {
            openPermissionManager && <PermissionManagerModal open={openPermissionManager} entity={entity}
             onClose={handleClosePermissionManagerModal} webService={workgroupWebService} />
        }
    </Box>
}