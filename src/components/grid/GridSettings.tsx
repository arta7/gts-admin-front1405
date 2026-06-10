import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ColumnVisibilityModal } from "./ColumnVisibilityModal";
import { ViewWeekRounded, SaveAlt } from '@mui/icons-material';
import { AddCircle } from "iconsax-react";
import { Table } from "@tanstack/react-table";
import { ExportMenu } from "./ExportMenu";


export default function GridSettings({ gridId, table, onAdd, enableColumnVisibility, rowsCount, showRowsCount, exportable,exportToExcel,SubjectCaption }: { gridId: string, table: Table<any>, onAdd: any, enableColumnVisibility: boolean, rowsCount: number, showRowsCount: boolean, exportable:boolean,exportToExcel:any,SubjectCaption:any }) {
    const [columnVisibilitySettingAnchoreEl, setColumnVisibilitySettingAnchoreEl] = React.useState<null | HTMLElement>(null);
    const [exportAnchorEl, setExportAnchorEl] = React.useState<null | HTMLElement>(null);
    const hideColumnVisibilitySetting = () => {
        setColumnVisibilitySettingAnchoreEl(null);

        //TODO: we should call api and send hiddenColumns to server instead of localStorage
        localStorage.setItem(`columnVisibilityState_${gridId}`, JSON.stringify(table.getState().columnVisibility));
    }

    const showColumnVisibilitySetting = (e: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
        setColumnVisibilitySettingAnchoreEl(e.currentTarget);
    }

    const showExportMenu = (event: React.MouseEvent<HTMLElement>) => {
        setExportAnchorEl(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportAnchorEl(null);
    };

    return <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mb: 1 }}>
        {showRowsCount && <Box sx={{ justifySelf: 'flex-start', marginRight: 'auto' }}><Typography variant="caption">{`تعداد: ${rowsCount}`}</Typography></Box>}
        {exportable && <Button size="small" variant='outlined' onClick={showExportMenu} startIcon={<SaveAlt />}>{'خروجی'}</Button>}
        {enableColumnVisibility && <Button size="small" variant='outlined' startIcon={<ViewWeekRounded />} onClick={showColumnVisibilitySetting}>{'ستون ها'}</Button>}
        {
            onAdd && <Button sx={{ color: 'white' }} variant="contained" startIcon={<AddCircle variant="TwoTone" />} onClick={onAdd}> {'افزودن'}</Button>
        }
        <ColumnVisibilityModal table={table} onClose={hideColumnVisibilitySetting} anchorEl={columnVisibilitySettingAnchoreEl} />
        <ExportMenu table={table} anchorEl={exportAnchorEl} onClose={handleExportMenuClose}  SubjectCaption={SubjectCaption}
        //exportToExcel={exportToExcel}
        />
    </Box>
}