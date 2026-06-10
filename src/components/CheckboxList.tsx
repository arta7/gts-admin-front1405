import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

export type ListItem = {
    id: number,
    caption: string,
}

export default function CheckBoxList({ data, value, id, onChange, title, hasError }: { data: Array<ListItem>, value?: Array<number>, id: string, onChange: (value: Array<number>) => void, title: string, hasError: boolean }) {
    const [checked, setChecked] = React.useState<number[]>([]);
    React.useEffect(() => {
        setChecked(value || [])
    }, [value])

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        if (onChange) {
            onChange(newChecked);
        }
    };
    let listStyle: any = { width: '100%', overflow: 'auto', bgcolor: 'background.paper' };
    return (
        <Box sx={{ border: hasError ? '1px solid red' : 'inherit', height: '100%', padding: 1 }}>
            <Typography variant='caption' color={hasError ? 'red' : 'inherit'}>{title}</Typography>
            <List sx={listStyle} id={id}>
                {data.map((item) => {
                    const labelId = `checkbox-list-label-${item.id}`;
                    return (
                        <ListItem key={item.id} disablePadding>
                            <ListItemButton dense={true} sx={{ pt: 0, pb: 0 }} onClick={handleToggle(item.id)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(item.id) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                        sx={{ p: 0 }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${item.caption}`} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
