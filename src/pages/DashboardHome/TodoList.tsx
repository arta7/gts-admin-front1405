import { IconButton, List, ListItem, ListItemText, Box, Stack, Typography } from "@mui/material";
import { Edit2, TaskSquare, Trash } from "iconsax-react";
import Header from "./Header";

export default function TodoList() {
    const todos = [
        {
            id: 1,
            title: 'وظیفه شماره یک',
            user: 'کارشناس'
        },
        {
            id: 2,
            title: 'وظیفه شماره دو',
            user: 'کارشناس'
        },
        {
            id: 3,
            title: 'وظیفه شماره سه',
            user: 'کارشناس'
        },
    ]

    const renderActions = () => {
        return <Stack direction="row" spacing={1}>
            <IconButton edge="end" aria-label="delete">
                <Trash color="#697689" variant="Bulk" />
            </IconButton>
            <IconButton edge="end" aria-label="delete">
                <Edit2 color="#697689" variant="Bulk" />
            </IconButton>
        </Stack>
    }
    
    return <Box>
        <Header Icon={TaskSquare} title={'فعالیت های من'}/>
        <List dense={true}>
            {
                todos.map((task: any, index: number) => {
                    const user = <Typography component={'a'} href="#" variant="body2" sx={{ color: '#0493A8', textDecoration: 'none' }}>{task.user}</Typography>;
                    const secondaryInfo = <>{`مدت زمان انجام: ${index + 1} روز `}{' '}{user}</>;
                    return <ListItem key={task.id} secondaryAction={renderActions()}>
                        <ListItemText
                            primary={task.title}
                            secondary={secondaryInfo}
                        />
                    </ListItem>
                })
            }
        </List>
    </Box>
}