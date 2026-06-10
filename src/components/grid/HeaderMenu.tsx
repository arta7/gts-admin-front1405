import { Divider, Menu, MenuItem as MuiMenuItem, styled, Theme } from '@mui/material';

const MenuItem = styled(MuiMenuItem)(({ theme }: { theme: Theme }) => ({
    '&.MuiMenuItem-root': {
        fontSize: '0.875rem'
    }
}));


export const HeaderMenu = ({ anchorEl, onClose, onFilter, onClearFilter, onToggleGroup, header, table }: any) => {

    let sortDesc = null;
    let sortAsc = null
    let removeSort = null;
    const handleClearSort = () => {
        header.column.clearSorting();
        onClose();
    }
    const handleSortDesc = (): void => {
        header.column.toggleSorting();
        onClose();
    }
    const handleSortAsc = (): void => {
        header.column.toggleSorting(true);
        onClose();
    }
    if (header.column.getCanSort()) {
        if (header.column.getIsSorted()) {
            removeSort = <MenuItem onClick={handleClearSort}>{'حذف مرتب سازی'}</MenuItem>
        }
        else {
            sortAsc = <MenuItem onClick={handleSortDesc}>{'مرتب سازی صعودی'}</MenuItem>
            sortDesc = <MenuItem onClick={handleSortAsc}>{'مرتب سازی نزولی'}</MenuItem>
        }
    }

    return <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose}>
        {removeSort}
        {sortAsc}
        {sortDesc}
        {  header.column.columnDef?.meta?.type != "date" && (
            header.column.getCanFilter() && header.column.getIsFiltered() ?
                <MenuItem onClick={onClearFilter}>
                    حذف جستجو
                </MenuItem> :
                <MenuItem onClick={onFilter}>
                    جستجو
                </MenuItem>
        )
        }
        { header.column.columnDef?.meta?.type == "date" && (
              header.column.getCanFilter() && header.column.getIsFiltered() ? 
            <MenuItem onClick={onClearFilter}>
                     حذف فیلتر  تاریخ
                </MenuItem> 
                :
                <MenuItem onClick={onFilter}>
                     فیلتر تاریخ
                </MenuItem> 
        )    
    }
        {
            table.options.enableGrouping && header.column.columnDef.enableGrouping != false && <MenuItem onClick={onToggleGroup}>
                {
                    header.column.getIsGrouped() ? `حذف گروه بندی بر اساس ${header.column.columnDef.header}` : `گروه بندی`
                }
            </MenuItem>
        }
    </Menu>
}
