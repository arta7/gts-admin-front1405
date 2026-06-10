import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Tooltip } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AddCircle from '@mui/icons-material/AddCircle';
import React from 'react';
import { TreeNode } from '../../components/tree/TreeNode';


export function PermissionDetails({ rows, onChange, permissionActions }: { rows: Array<TreeNode>, onChange: any, permissionActions: any }) {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 450 }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>نام</TableCell>
                        <TableCell width={"10%"}></TableCell>
                        <TableCell width={"10%"}></TableCell>
                        <TableCell width={"10%"}></TableCell>
                        <TableCell width={"10%"}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.nodeId} row={row} onChange={onChange} actions={permissionActions[row.nodeId] || []} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const ActionCell = ({ action, title, icon, onClick, active }: any) => {
    return <TableCell >
        <Tooltip title={title}>
            <IconButton onClick={() => onClick(action)} color={active ? 'success' : 'default'}>
                {icon}
            </IconButton>
        </Tooltip>
    </TableCell>
}


const Row = ({ row, onChange, actions: defaultActions }: { row: any, onChange: any, actions: Array<string> }) => {
    const [actions, setActions] = React.useState<Array<string>>(defaultActions);

    function toggleAction(action: string) {
        let _actions = [...actions];
        if (actions.indexOf(action) !== -1) {
            _actions.splice(actions.indexOf(action), 1)

        }
        else {
            _actions.push(action)
        }
        setActions(_actions);
        onChange(row, _actions);
    }

    function toggleAllActions() {
        let _actions: Array<string> = []
        if (actions.length == 3) {
            _actions = [];
        }
        else {
            _actions = ['add', 'edit', 'delete'];
        }

        setActions(_actions);
        onChange(row, _actions);
    }

    return <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">
            {row.caption}
        </TableCell>
        <ActionCell title="ایجاد" icon={<AddCircle />} active={actions.indexOf('add') != -1} onClick={() => { toggleAction("add") }}></ActionCell>
        <ActionCell title="ویرایش" icon={<ModeEditIcon />} active={actions.indexOf('edit') != -1} onClick={() => { toggleAction("edit") }}></ActionCell>
        <ActionCell title="حذف" icon={<DeleteIcon />} active={actions.indexOf('delete') != -1} onClick={() => { toggleAction("delete") }}></ActionCell>
        <ActionCell title="همه" icon={<DoneAllIcon />} active={actions.length == 3} onClick={() => { toggleAllActions() }}></ActionCell>
    </TableRow>
}