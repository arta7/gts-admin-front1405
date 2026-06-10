import React from 'react'
import { Box } from '@mui/material'
import { EventCalendar } from '../../components/eventCalendar/EventCalendar'

const MyActivities = () => {
    return (
        <React.Fragment>
            <Box>
                <Box sx={{ width: '100%', height: "60%" }}>
                    <EventCalendar />
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default MyActivities;
