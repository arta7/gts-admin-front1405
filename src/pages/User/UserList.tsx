import { Group, Apartment } from "@mui/icons-material";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import useConfirmDialog from "../../components/ConfirmDialog/UseConfirmDialog";
import Grid, { CustomAction, UnitAction } from "../../components/grid/Grid";
import UserEditForm from "./UserEditForm";
import UnitGroupEditForm from "./../WorkGroup/UnitGroupEditForm";
import PermissionManagerModal from "./../WorkGroup/PermissionManagerModal";
import UserUnitGroupEditForm from "../WorkGroup/UserUnitGroupEditForm";

export type User = {
    id: number | null,
    userName: string,
    password: string,
    rePassword: string,
    firstName: string,
    lastName: string,
    nationalCode: string,
    personelCode: string,
    cellPhoneNumber: string,
    email: string,
    address: string,
    isActive: boolean
};

export type WorkGroup = {
    id: number,
    name: string,
    isManager: boolean,
    isActive: boolean
}

const createUser: () => User = () => ({
    id: null,
    userName: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: '',
    nationalCode: '',
    personelCode: '',
    cellPhoneNumber: '',
    email: '',
    address: '',
    isActive: true,
    UnitId: ''
});

const uiComponentId = 28270;
export const workgroupWebService = '/base/v1/api/workgroup';

export const UserWorkGroupService = '/user/v1/api/updateOrganization';

export const UserWorkUnitsService = '/user/v1/api/updateUnits';

const createWorkGroup = () => ({ name: '', isActive: false, isManager: false }) as WorkGroup;

const webService = '/user/v1/api';

export function loader() {
    // console.log("WorkGrouploader")
    return axios.get(`${webService}/inquiry`).then(response => {
         console.log('rows UserList : ',response.data.result)
        return response.data.result;
    })
};



export default function UserList() {
    const [open, setOpen] = React.useState(false);
    const[currentUser,setCurrentUser] = React.useState(0);
    const [openUnitList, setopenUnitList] = React.useState(false);
    const [entity, setEntity] = React.useState<User>();
    const [entity2, setEntity2] = React.useState<WorkGroup>();
    const [UserUnitList, setUserUnitList] = React.useState();
    const [openPermissionManager, setOpenPermissionManager] = React.useState(false);
    const rows = useLoaderData()
    let revalidator = useRevalidator();
    const { confirm } = useConfirmDialog();

    const reloadData = () => revalidator.revalidate();

    const openModal = (entity: User) => {
        setEntity(entity);
        setOpen(true);
    };

    let Loader2 = () => {
        console.log("WorkGrouploader")
        return axios.get(`${workgroupWebService}/inquiry`).then(response => {
            console.log('rows2 : ', response.data.result)
            return setEntity2(response.data.result);
        })
    }

    let UserUnitLoader = () => {

        return axios.get(`base/v1/api/component/get-dropdown-data?uiComponentId=${uiComponentId}`).then(response => {
            console.log('rows2 : ', response.data.result)
            return setUserUnitList(response.data.result);
        })
    }

    useEffect(() => {
        Loader2()
        UserUnitLoader()
    }, [])



    const handleCloseModal = (submit: any) => {
        setOpen(false);
        if (submit) {
            reloadData();
        }
    };

    const onAdd = () => {
        openModal(createUser());

    }
    const onEdit = (rowEntity: User) => {
        openModal(rowEntity);
    };

    const customAction: CustomAction = {

        method: (row: User) => {
            setCurrentUser((prevId) => (row?.id ? row.id : prevId))
            openPermissionManagerModal(createWorkGroup())

            console.log("SetWorkGroup ", row?.id);
            // openPermissionManagerModal(row)
        },
        icon: <Group />,
        tooltip: 'تعیین گروه کاری'
    }

    const UnitAction: UnitAction = {
        method: (row: User) => {
            setCurrentUser((prevId) => (row?.id ? row.id : prevId))
            setopenUnitList(true)
            console.log("SetUnitGroup ", row?.id);
        },
        icon: <Apartment />,
        tooltip: 'تعیین واحد'
    }

    const columns = [
       
        {
            accessorKey: 'firstName',
            header: 'نام'
        },
        {
            accessorKey: 'lastName',
            header: 'نام خانوادگی'
        },
        {
            accessorKey: 'userName',
            header: 'نام کاربری'
        },
        {
            accessorKey: 'nationalCode',
            header: 'کد ملی'
        },
        {
            accessorKey: 'personelCode',
            header: 'کد پرسنلی'
        },
        {
            accessorKey: 'cellPhoneNumber',
            header: 'شماره همراه'
        },
        {
            accessorKey: 'email',
            header: 'ایمیل'
        },
        {
            accessorKey: 'WorkGroupName',
            header: 'گروه کاری'
        },
        {
            accessorKey: 'isActive',
            header: 'فعال',
            meta: {
                type: 'boolean'
            }
        }
    ]

    const openPermissionManagerModal = (entity: WorkGroup) => {
        setOpenPermissionManager(true);
        console.log('entity : =>', entity)
    };

    const handleClosePermissionManagerModal = (submit: any) => {
        setOpenPermissionManager(false);
    };

    const handleCloseUnitModal = (submit: any) => {
        setopenUnitList(false);
    };

    const onDelete = (entity: User) => {
        confirm(`آیا میخواهید کاربر ${entity.userName} را حذف کنید؟`).then((isConfirmed) => {
            if (isConfirmed) {
                axios.delete(`${webService}/remove/${entity.id}`).then(() => {
                    reloadData();
                });
            }
        })
    }

    return <Box padding={2}>
      
        <Grid columns={columns} rows={rows} addRowNumber={true} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete}
          paging={true} enableFilters={true} UnitAction={UnitAction} />
        
        {
            open && <UserEditForm open={open} entity={entity} onClose={handleCloseModal} webService={webService}  />
        }
        {/* {
            openPermissionManager && <UnitGroupEditForm open={openPermissionManager} entity={entity2}
                onClose={handleClosePermissionManagerModal} webService={UserWorkGroupService}  UserId={currentUser}/>
        } */}

        {
            openUnitList && <UserUnitGroupEditForm open={openUnitList} entity={UserUnitList}
                onClose={handleCloseUnitModal} webService={UserWorkUnitsService} UserId={currentUser} />
        }
    </Box>
}