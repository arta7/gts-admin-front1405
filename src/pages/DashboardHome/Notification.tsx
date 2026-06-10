// @ts-ignore
import { Typography, Box } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
// @ts-ignore
import moment from 'moment/moment'
import Header from './Header'
import { NotificationStatus } from 'iconsax-react'
import { theme } from '../../contexts/ThemeContext'

const Notification = () => {
  const sampleDatas = [
    {
      id: 0,
      count: 0,
      message: 'نکته جدید و بررسی نشده در پایش عملکرد',
      date: '2022-11-28T13:51:50.417-07:00',
    },
    {
      id: 1,
      count: 4,
      message: 'رویداد بررسی نشده',
      date: '2022-07-20T13:51:50.417-09:00',
    },
    {
      id: 2,
      count: 0,
      message: 'رویداد پیش رو در تقویم کاری شما ثبت گردیده است.',
      date: '2022-09-24T13:51:50.417-10:00',
    },
  ]
  return (
    <Box>
      <Header title={'تابلو اعلانات'} Icon={NotificationStatus} />
      <List dense={true}>
        {sampleDatas.map((item: any) => {
          return (
            <ListItem
              key={item.id}
              alignItems="flex-start"
              sx={{
                borderRadius: '0.5rem',
              }}
            >
              <Typography
                sx={{
                  borderRadius: '50%',
                  fontSize: '1rem',
                  color: '#fff',
                  width: '20px',
                  height: '20px',
                  textAlign: 'center',
                  marginRight: '0.2rem',
                  backgroundColor: `${theme.palette.primary.main}`,
                }}
              >
                {item.count}
              </Typography>

              <ListItemText
                secondary={
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{
                        whiteSpace: 'pre-wrap',
                      }}
                    >
                      {item.message}
                    </Typography>
                    {/* <Typography
                      component="span"
                      variant="body2"
                      sx={{ whiteSpace: 'nowrap', padding: '0.3rem' }}
                    >
                      {moment(`${item.date}`).fromNow()}
                    </Typography> */}
                  </div>
                }
              />
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default Notification
