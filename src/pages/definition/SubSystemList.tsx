import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

export type SubSystem = {
    id: number,
    caption: string,
}

export default function SubSystemList({ data, onChange }: { data: Array<SubSystem>, onChange: (subSystemIds:Array<number>)=>void }) {
    const [checked, setChecked] = React.useState<number[]>([]);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        if(onChange){
            onChange(newChecked);
        }
    };
    const listStyle = { width: '100%', maxWidth: 300, maxHeight: 300, overflow: 'auto', bgcolor: 'background.paper' };
    return (
        <Box sx={{ p: '1rem' }}>
            <Typography variant='body1' component={'h6'}>{`استفاده در زیرسیستم`}</Typography>
            <Paper sx={{ mt: '1rem' }}>
                <List dense={true} sx={listStyle}>
                    {data.map((subSystem) => {
                        const labelId = `checkbox-list-label-${subSystem.id}`;
                        return (
                            <ListItem key={subSystem.id} disablePadding>
                                <ListItemButton dense={true} sx={{ pt: 0, pb: 0 }} onClick={handleToggle(subSystem.id)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={checked.indexOf(subSystem.id) !== -1}
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={`${subSystem.caption}`} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        </Box>
    );
}
