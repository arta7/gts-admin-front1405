import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { InputAdornment, TextField } from '@mui/material';
import React from 'react';
import { SearchRounded } from '@mui/icons-material';
import { Table } from '@tanstack/react-table';

export default function ColumnVisibilitySetting({ table }: { table: Table<any> }) {
    const listStyle = { width: '100%', maxWidth: 300, maxHeight: 300, overflow: 'auto', bgcolor: 'background.paper' };
    const [search, setSearch] = React.useState('')
    const columns = table.getAllLeafColumns().filter(column => {
        if (column.id != 'actions') {
            if (search) {
                return column.columnDef.header?.toString()!.indexOf(search) != -1
            }
            return true;
        }
    });
    const searchBar = <TextField value={search} onChange={(e) => setSearch(e.target.value)} size='small' variant='outlined' placeholder='جستجوی ستون' InputProps={{
        endAdornment: (
            <InputAdornment position="end">
                <SearchRounded fontSize='small' />
            </InputAdornment>
        ),
    }} />
    return (
        <List dense={true} sx={listStyle} subheader={searchBar}>
            <ListItem key={'all'} disablePadding={true} sx={{ color: '#7393B3' }}>
                <ListItemButton onClick={() => { table.toggleAllColumnsVisible(true) }} dense={true}>
                    <ListItemText id={'all'} primary={`نمایش همه ستون ها`} />
                </ListItemButton>
            </ListItem>
            {columns.map((column) => {
                const labelId = `checkbox-list-label-${column.id}`;
                return (
                    <ListItem key={column.id} disablePadding>
                        <ListItemButton onClick={column.getToggleVisibilityHandler()} dense={true} sx={{ pt: 0, pb: 0 }}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={column.getIsVisible()}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${column.columnDef.header}`} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
