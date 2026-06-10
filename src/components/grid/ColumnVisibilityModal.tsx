import { Box, Popover, useTheme } from "@mui/material";
import ColumnVisibilitySetting from "./ColumnVisibilitySetting";
import { Filter } from "./Filter";

export const ColumnVisibilityModal = ({ table, anchorEl, onClose }: any) => {
    const theme = useTheme();
    return <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <ColumnVisibilitySetting table={table} />
    </Popover>
}