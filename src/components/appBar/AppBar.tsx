import { styled} from '@mui/material/styles'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import {
  HambergerMenu,
  Notification,
  SmsNotification,
  LogoutCurve,
} from 'iconsax-react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { Stack } from '@mui/material'
import AccountMenu from './AccountMenu'
import { useAuth } from '../../contexts/AuthContext'
import { Outlet, useNavigate  } from 'react-router-dom'
import { useEffect } from 'react'
import { theme } from '../../contexts/ThemeContext';
import baseUrl from '../../utils/Util'

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 30,
    top: 0,
    fontSize: '0.8rem!important',
    backgroundColor: theme.palette.primary.main,
    padding: '0 5px',
    color: '#113f67',
  },
}))

const drawerWidth = 240
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: `#fff`,
  boxShadow: "0px 2px 4px 0px rgb(0 0 0 / 12%)",
  [theme.breakpoints.up('sm')]:{
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  ...(open && {
    [theme.breakpoints.up('sm')]:{
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }    
  }),
}))

const AppBarMenu = (props: any) => {
  const { setOpen, open, title } = props
  //@ts-ignore
  const {signOut } = useAuth()
  const navigate = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(!open)
  }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
        >
          <HambergerMenu
            size="32"
            color={theme.palette.primary.main}
            variant={open ? 'TwoTone' : 'Outline'}
          />
        </IconButton>
        <AccountMenu />

        <Stack
          direction="row"
          justifyContent="start"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Stack>
        <IconButton size="large" aria-label="show 0 new mails" color="inherit">
          <StyledBadge badgeContent="0" color="primary" sx={{ direction: 'rtl' }}>
            <SmsNotification color={theme.palette.primary.main} variant="Outline" />
          </StyledBadge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 0 new notifications"
          color="inherit"
        >
          <StyledBadge
            badgeContent="0"
            color="primary"
            sx={{ direction: 'rtl' }}
          >
            <Notification color={theme.palette.primary.main} variant="Outline" />
          </StyledBadge>
        </IconButton>

        <IconButton
          size="large"
          aria-label="logout"
          component="label"
          color="inherit"
          onClick={() => {
            //@ts-ignore
            signOut();
          }}
        >
          <LogoutCurve color={theme.palette.primary.main} variant="Outline" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default AppBarMenu
