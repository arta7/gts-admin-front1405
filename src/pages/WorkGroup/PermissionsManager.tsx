import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { TreeNode } from "../../components/tree/TreeNode";
import { Tree } from "../../components/tree/Tree";
import GridLoader from "react-spinners/GridLoader";

const getTreeApi = '/gts/v1/api/various-data/fetch'

const PermissionsManager = ({ onChange, defaultValue }: any,entity:any) => {
    const [permissionTree, setPermissionTree] = React.useState<Array<TreeNode>>();

    const getPermissionTree = () => {
       
        return axios.post(`${getTreeApi}`, {
             json: "{\"DataKey\":\"SusbsystemsListForWorkgroup\"}"
     
        }).then(response => {
            console.log('response tree :=>',response)
            return response.data.result;
        }).catch((e) => {
            console.log('error',e)
            // toast.error("خطا در خواندن دسترسی های گروه کاربری ")
        })
    }



    useEffect(() => {
        if (!permissionTree) {
            getPermissionTree().then((res) => {
                const normalizedItems = res.map((item: TreeNode) => {
                    item.nodeId = item.systemId;
                    if (item.subSystems) {
                        item.children = item.subSystems.map((subSystem, index) => {
                            subSystem.nodeId = subSystem.subSystemId;
                            if (subSystem?.children) {
                                console.log('subSystem',subSystem)
                                subSystem.children = subSystem.children?.map(c => {
                                   
                                    console.log('c.id',c.id)
                                    c.nodeId = c ?  c.id.toString() : 0 ;
                                    return c;
                                });
                            }
                            return subSystem;
                        });
                    }
                    return item;
                })
               // setPermissionTree(dataCheck)
               console.log('res',res)
                 setPermissionTree(res);
        
            });
        }
    }, []);

    const handleTreeChange = (checkedItems: Array<string>) => {
        console.log('checked item : ',checkedItems)
        onChange(checkedItems.map(id => parseInt(id)));
    }

    return (<Box>
        {
            permissionTree ?
                <Box sx={{ maxWidth: '100%' }}>
                    <Tree items={permissionTree} onChange={handleTreeChange} defaultValue={defaultValue}/>
                </Box> : <Box sx={{ display: 'flex', justifyContent: 'center' }}><GridLoader color="#36d7b7" /></Box>
        }
    </Box>
    )
}

export default PermissionsManager
