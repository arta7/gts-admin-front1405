import { Box, Grid, Paper, styled } from '@mui/material'
import TasksSummary from './TasksSummary'
import TodoList from './TodoList'
import Notification from './Notification'
import EventCalendar from './EventCalender'
import Calendar from '../../components/DatePicker/Calendar'

const HomeContainer = styled('div')(({ theme }) => ({
  height: 'calc(100vh - 65px)',
  display: 'grid',
  gridGap: '1rem',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'repeat(2,minmax(48%,50%))',
  boxSizing: 'border-box',
  padding: '1rem',
  '& > div': {
    overflowY: 'auto',
    // 'padding':'1rem'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'minmax(400px,1fr)',
    gridTemplateRows: 'repeat(4,40%)',
  },
}))

const Home = () => {
  return (
    <HomeContainer>
      <Paper>
        <Notification />
      </Paper>
      <Paper>
        <TasksSummary />
      </Paper>
      <Paper>
        <TodoList />
      </Paper>
      <Paper>
        <Calendar />
      </Paper>
    </HomeContainer>
  )
}

export { Home as DashboardHome }
