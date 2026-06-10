import React from 'react'
import Header from './Header'
import { Box } from '@mui/material'
import { Calendar as Cal } from 'iconsax-react'
import Calendar from '../../components/DatePicker/Calendar'

const demoEvents = [
  {
    title: 'All Day Event',
    start: '2020-07-01',
  },
  {
    title: 'Long Event',
    start: '2020-07-07',
    end: '2020-07-10',
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: '2020-07-09T16:00:00',
  },
  {
    groupId: '999',
    title: 'Repeating Event',
    start: '2020-07-16T16:00:00',
  },
  {
    title: 'Conference',
    start: '2020-07-11',
    end: '2020-07-13',
  },
  {
    title: 'Meeting',
    start: '2020-07-12T10:30:00',
    end: '2020-07-12T12:30:00',
  },
  {
    title: 'Lunch',
    start: '2020-07-12T12:00:00',
  },
  {
    title: 'Meeting',
    start: '2020-07-12T14:30:00',
  },
  {
    title: 'Birthday Party',
    start: '2020-07-13T07:00:00',
  },
  {
    title: 'Click for Google',
    url: 'http://google.com/',
    start: '2020-07-28',
  },
]

const EventCalendar = () => {
  return (
    <React.Fragment>
      <Box>
        <Header title={'تقویم کاری'} Icon={Cal} />
        <Box sx={{width:'100%',height:"60%"}}>
        <Calendar />
        </Box>
      </Box>
    </React.Fragment>
  )
}

export default EventCalendar
