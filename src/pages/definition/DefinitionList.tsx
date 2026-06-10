import { Clear, SearchRounded } from "@mui/icons-material";
import { Autocomplete, Box, Button, InputAdornment, makeStyles, Paper, TextField, useTheme } from "@mui/material";
import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import useConfirmDialog from "../../components/ConfirmDialog/UseConfirmDialog";
// import { useLoaderData, useRevalidator } from "react-router-dom";
import DraggableList, { Item } from "../../components/draggableList/DraggbleList";
import { reorder } from "../../components/draggableList/Helper";
import Grid, { CustomAction } from "../../components/grid/Grid"
import List from "../../components/list/List";
import DefinitionEditForm from "./DefinitionEditForm";
import { SubSystem } from "./SubSystemList";

export type BaseType = {
    id: number,
    valueType: string,
    title: string,
    code: number
}

type Definition = {
    id?: number,
    baseDefinitionType: number,
    name: string,
    sortOrder?: number;
    subSystems?: Array<number>
}

const baseTypeWebService = '/base/v1/api/base-type';
const definitionWebService = '/base/v1/api/definition';
const subSystemsWebService = '/base/v1/api/sub-system/base-type/find';

const createDefinition = (baseTypeId: number) => ({ name: '', baseDefinitionType: baseTypeId });

export const loader = () => {
    console.log("DefinitionLoader");
    return axios.get(`${baseTypeWebService}/inquiry`).then(response => {
        return response.data.result
    });
}

function loadDefinitions() {
    return axios.get(`${definitionWebService}/inquiry`).then(response => {
        return response.data.result;
    });
}

function loadSubSystemsByBasedType(baseTypeId: number) {
    return axios.get(`${subSystemsWebService}/${baseTypeId}`).then(response => {
        const _subSystems = response.data.result;
        const defaultSubSystems = [
            {
                "id": 1,
                "caption": "دبیرخانه",
            },
            {
                "id": 2,
                "caption": "کارتابل",
            }
        ];
        return defaultSubSystems;
    })
}

export default function DefinitionList() {
    const baseTypes = useLoaderData() as Array<BaseType>;
    const [selected, setSelected] = React.useState<any>(baseTypes.length ? baseTypes[0] : null);
    const [definitions, setDefinitions] = React.useState([]);
    const [subSystems, setSubSystems] = React.useState<Array<SubSystem>>([]);

    const [open, setOpen] = React.useState(false);
    const [entity, setEntity] = React.useState<Definition>();
    const { confirm } = useConfirmDialog();

    React.useEffect(() => {
        getDefinitions();
        loadSubSystemsByBasedType(selected.id).then((data) => {
            setSubSystems(data);
        });
    }, [selected]);

    const openModal = (entity: Definition) => {
        setEntity(entity);
        setOpen(true);
    };
    const handleCloseModal = (submit: any) => {
        setOpen(false);
        if (submit) {
            getDefinitions();
        }
    };
    const onAdd = () => {
        openModal(createDefinition(selected.id));
    }

    const definitionColumns = [
        {
            accessorKey: 'name',
            header: 'عنوان',
            meta: {
                width: '80%'
            }
        }
    ];

    const onEdit = (rowEntity: Definition) => {
        openModal(rowEntity);
    };

    const onDelete = (entity: Definition) => {
        confirm(`آیا میخواهید ${entity.name} را حذف کنید؟`).then((isConfirmed) => {
            if (isConfirmed) {
                return axios.delete(`${definitionWebService}/remove/${entity.id}`).then(() => {
                    getDefinitions();
                });
            }
        })
    }

    const handleBaseTypeItemClick = (baseType: BaseType) => {
        setSelected(baseType);
        getDefinitions();
    }

    function getDefinitions() {
        loadDefinitions().then(data => {
            setDefinitions(data);
        });
    }

    return <Box padding={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'space-between', height: '100%' }}>
        <Box>
            <Autocomplete
                disableClearable={true}
                value={selected}
                getOptionLabel={(option: BaseType) => option.title}
                onChange={(e: any, newValue: any) => handleBaseTypeItemClick(newValue)}
                disablePortal
                id="search-baseType"
                options={baseTypes}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="نوع مقادیر پویا" />}
            />
        </Box>
        <Box sx={{ flexGrow: 1, width: '50%' }}>
            <Grid columns={definitionColumns} rows={definitions} key={selected.id} addRowNumber={true} onAdd={onAdd} onEdit={onEdit} onDelete={onDelete} enableFilters={true} paging={true}/>
        </Box>
        {
            open && <DefinitionEditForm baseType={selected} open={open} entity={entity} onClose={handleCloseModal} webService={definitionWebService} refreshGrid={getDefinitions} subSystems={subSystems} />
        }
    </Box>
}