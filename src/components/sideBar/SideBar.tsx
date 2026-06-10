import * as React from 'react'
import { styled, Theme, CSSObject, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import SideBarItem, { SideBarItemType } from './SideBarItem'
import { Outlet } from 'react-router-dom'
import AppBar from '../appBar/AppBar'
import { useAxios } from '../../hooks/useAxios'
import { Grid, Link, Typography } from '@mui/material'
import { width } from '@mui/system'
import { theme } from '../../contexts/ThemeContext'
import baseUrl from '../../utils/Util'
import Logo from '../Logo'
import { SejamCountDownProvider } from '../../contexts/CountDownContext'
import axios from 'axios'
import { LoginConfig } from '../../pages/auth/LoginConfigForm'
import { toast } from 'react-toastify'
import { config } from 'process'

interface SideBarProps {
  menus: Array<SideBarItemType>
  title: string
  open: boolean
}

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.complex,
  }),
  backgroundColor: `#fff`,
  border: 'none!important',
  boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '50%',
  },
  '&::-webkit-scrollbar-track': {
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '5px',
    maxHeight: '50%',
    backgroundColor: theme.palette.primary.main,
  },
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.complex,
  }),
  backgroundColor: `#fff`,
  border: 'none!important',
  boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
  overflowy: 'hidden',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '0em',
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: `#fff`,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
  border: 'none',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}))

export default function SideBar({
  menus,
  title,
  open: defaultOpen = true,
}: SideBarProps) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(defaultOpen)
  const [config, setLoginConfig] = React.useState<LoginConfig>();
  const [loading, setLoading] = React.useState(true);
   React.useEffect(() => {
    axios.get(`/gts/v1/api/base/login-page-info/fetch`).then((res) => {
      const result: any = res.data.result;
      if (result && result.length) {
        setLoginConfig(res.data.result[0]);
      }
      setLoading(false);
    }).catch(() => {
      toast.error("! دریافت تنظیمات لاگین با خطا مواجه شد");
      setLoading(false);
    })
  }, []);

  const handleCloseSideBar = () => {
    setOpen(false)
  }

  const renderMenus = (mobileMode: boolean) => {
    return menus.map((item, index) => {
      return (
        <SideBarItem
          {...item}
          sideBarExpanded={open}
          level={1}
          key={index}
          handleCloseSideBar={mobileMode ? handleCloseSideBar : null}
        />
      )
    })
  }

  const drawerContent = (mobileMode: boolean) => {
    return (
      <>
        {open ? (
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              margin: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            <Grid
                  p={1}
                  style={{
                    width: '100px',
                  }}
            >
              {config ?
                <img
                  src={config?.customerLogo}
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                /> : <></>}
                </Grid>
            <Typography
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'pre-line',
                textAlign: 'center',
                width: '190px',
              }}
              fontWeight="700"
              color={theme.palette.text.primary}
            >
               {config?.systemName}
            </Typography>
          </Grid>
        ) : (
          <DrawerHeader />
        )}
        <List dense>{renderMenus(mobileMode)}</List>
      </>
    )
  }
  return (
    <div style={{ display: 'flex' }}>
      <AppBar open={open} setOpen={setOpen} title={title} />
      <MuiDrawer
        variant="temporary"
        anchor={'left'}
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawerContent(true)}
      </MuiDrawer>
      <Drawer variant="permanent" open={open} sx={{ backgroundColor: `#fff` }}>
        {drawerContent(false)}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.primary.light,
          width: open
            ? `calc(100% - ${drawerWidth}px)`
            : `calc(100% - ${theme.spacing(7)})`,
          height: `100vh`,
        }}
      >
        <DrawerHeader />
        <SejamCountDownProvider value={null}>
          <Outlet />
        </SejamCountDownProvider>

      </Box>
    </div>
  )
}

export function SideBarIcon(props: any) {
  const {
    icon,
    variant = 'Bulk',
    size = '18',
    color = theme.palette.primary.dark,
  } = props

  const IconType = icon
  return <IconType size={size} color={color} variant={variant} />
}
