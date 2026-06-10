import React, { useEffect, useState } from 'react'
import { Button, Dialog, DialogContent, DialogActions, Grid } from '@mui/material';
import axios from '../../utils/axios';
import PermissionsManager from './PermissionsManager';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { TreeNode } from "../../components/tree/TreeNode";
const getTreeApi = '/gts/v1/api/various-data/fetch'

const PermissionManagerModal = ({ onClose, open, entity, webService }: any) => {
    const editPermissionsService = webService + '/componnent/change/';
    const createPermissionsService = webService + '/componnent/create';
    const DeletePermissionsService = webService + '/component/Delete';

    const getWorkGroupPermissions = () => {
        let value = { DataKey: "SelectedWorkgroupComponentIds", workgroupId: entity.id }
        console.log('entity.id =>', entity.id)
        return axios.post(`${getTreeApi}`, {
            //    "json": "[{DataKey:SelectedWorkgroupComponentIds,workgroupId:" + entity.id + "}]"
            "json": `${JSON.stringify(value)}`

        }
        ).then(response => {
            console.log('response', response.data)
            if (response.data.result.length
                // && response.data.result[0].componentIds
            ) {
                return response.data.result
                //[0].componentIds.map((id: any) => id.toString());
            }
            return [];
        }).catch((e) => {
            console.log('error', e)
            // toast.error("خطا در خواندن دسترسی های گروه کاربری ")
        })
    }

    const { handleSubmit } = useForm({
        defaultValues: entity
    })





    const [permissions, setPermissions] = useState<Array<string>>([]);
    useEffect(() => {
        var dataCheck: string[] = [];
        getWorkGroupPermissions().then((data) => {
            // console.log('data', data[0]?.componentIds)
            let Value = []
            for (let i = 0; i < data[0]?.componentIds?.length; i++) {
                Value.push(data[0]?.componentIds[i]?.toString())
            }
            console.log('Value permission', Value)
            setPermissions(Value)


        })
    }, [])

    // const editPermissions = () => {
    //     return axios.put(`${DeletePermissionsService}${entity.id}`, {
    //         componentIds: permissions
    //     })
    // }

    const createPermissions = () => {
        console.log('permission:', permissions)
        return axios.post(`${createPermissionsService}`, {
            workgroupId: entity.id,
            componentIds: permissions
        })
    }

    const DeletePermissions = () => {
        console.log('permission:', permissions)
        return axios.post(`${DeletePermissionsService}`, {
            workgroupId: entity.id
        })
    }



    const onSubmit = () => {
        let promise = DeletePermissions();
        promise.then((response) => {
            console.log('response', response)
            let pro = createPermissions()
            pro.then((response1) => {
                onClose(true);
                toast.success('اطلاعات پرونده با موفقیت ثبت شد')
            });

        });
    }
    const onCancel = () => {
        onClose()
    }
    return (
        <Dialog open={open} maxWidth={'lg'} onClose={onClose} fullWidth={true}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate={true}>
                <DialogContent>
                    <PermissionsManager onChange={setPermissions} defaultValue={permissions} entity={entity} />
                </DialogContent>

                <DialogActions>
                    <Button type="submit">{'ثبت'}</Button>
                    <Button onClick={onCancel}>{'انصراف'}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default PermissionManagerModal
