import { Box, IconButton, Popover, TableCell, TableSortLabel } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import React, { MouseEvent, useEffect } from "react";
import { MoreVert, FilterAltOutlined } from '@mui/icons-material';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { HeaderFilterModal } from "./HeaderFilterModal";
import { HeaderMenu } from "./HeaderMenu";

const headerIconColor = "#6200EE"
export function HeaderCell({ header, table, serverSideGrid }: { header: any, table: any, serverSideGrid: boolean }): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [filterAnchorEl, setFilterAnchorEl] = React.useState<null | HTMLElement>(null);
    const selectedHeader = React.useRef<any>(null);


    

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseFilter = () => {
        setFilterAnchorEl(null);
    }

    const onFilterClick = (event: MouseEvent<HTMLElement>) => {
        console.log('selectedheader : ',selectedHeader.current)
        setFilterAnchorEl(selectedHeader.current);
        handleClose();
    }

    const onClearFilter = () => {
        header.column.setFilterValue('');
        handleClose();
    }

    const toggleGroup = () => {
        header.column.toggleGrouping();
        handleClose();
    }
    return <>
        <TableCell ref={selectedHeader} colSpan={header.colSpan} sx={{ backgroundColor: (theme) => theme.palette.primary.main, width: header.column.columnDef.meta?.width }}>
            {header.isPlaceholder ? null : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover .headerMenu': { opacity: 1 }, "& .headerMenu": { opacity: Boolean(anchorEl) ? 1 : 0 } }}>
                    <Box>
                        {header.column.getCanSort() ? (
                            <TableSortLabel
                                sx={{
                                    '& .MuiTableSortLabel-icon': { color: `${headerIconColor} !important` }
                                }}
                                active={header.column.getIsSorted() != false}
                                direction={header.column.getIsSorted() || undefined}
                                onClick={header.column.getToggleSortingHandler()}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </TableSortLabel>
                        ) : (flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        ))}
                        {header.column.getFilterValue() != null && <IconButton sx={{ justifySelf: 'start', color: headerIconColor }} onClick={onFilterClick}><FilterAltOutlined /></IconButton>}
                        {header.column.getIsGrouped() && <IconButton sx={{ color: headerIconColor }} onClick={() => header.column.toggleGrouping()}><GridViewRoundedIcon /></IconButton>}
                    </Box>
                    {header.id != "rowNumber" && header.id != "actions" && (header.column.getCanFilter() || header.column.getCanGroup() || header.column.getCanSort()) ? (
                        <IconButton className='headerMenu' onClick={handleClick}><MoreVert /></IconButton>
                    ) : null}
                </Box>
            )}
        </TableCell>
        {
            anchorEl && <HeaderMenu anchorEl={anchorEl} header={header} table={table} onClose={handleClose} 
            onFilter={onFilterClick} onClearFilter={onClearFilter} onToggleGroup={toggleGroup} />
        }
        {
            filterAnchorEl && <HeaderFilterModal open={Boolean(filterAnchorEl)} anchorEl={filterAnchorEl} onClose={handleCloseFilter} onClearFilter={onClearFilter}  header={header} table={table} serverSideGrid={serverSideGrid} />
        }
    </>
}