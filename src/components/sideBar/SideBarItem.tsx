import { Dehaze, DragHandle } from '@mui/icons-material';
import {
  Collapse,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
} from '@mui/material'
import Cyan from '@mui/material/colors/cyan';
import green from '@mui/material/colors/green';
import { DefaultTFuncReturn } from 'i18next'
import { ArrowDown2, ArrowUp2 } from 'iconsax-react'
import React from 'react'
import { theme } from '../../contexts/ThemeContext'
// import { SideBarItemColors } from '../../utils/enums/Colors'
import getDynamicIcon from '../DynamicIcon'
import NavLink from './NavLink'
import { SideBarIcon } from './SideBar'

export interface SideBarItemType {
  path?: string
  icon?: any
  title?: string | DefaultTFuncReturn
  children?: Array<SideBarItemType>
  isDevider?: boolean
  target?: string
  element?: React.ReactNode
  fullPath?: string
  hideOnSidebar?: boolean
  index?: boolean
  handleCloseSideBar?: (() => void) | null
}

interface SideBarItemProps {
  sideBarExpanded: boolean
  level: number
  defaultOpen?: boolean
}

export default function SideBarItem(props: SideBarItemType & SideBarItemProps) {
  const {
    title,
    level,
    fullPath,
    children,
    icon,
    sideBarExpanded,
    target,
    hideOnSidebar,
    handleCloseSideBar,
  } = props

  if (hideOnSidebar) {
    return null
  }

  const isActive = () => {
    let defaultOpen = false
    const currentUrl = window.location.pathname
    if (children && currentUrl != '/') {
      if (fullPath) {
        defaultOpen = currentUrl.startsWith(fullPath)
      }
    }
    return defaultOpen
  }

  const [open, setOpen] = React.useState(isActive())

  const hasChildren = children && !children[0].hideOnSidebar

  const handleClick = () => {
    if (children) {
      setOpen(!open)
    }
    if (handleCloseSideBar && !hasChildren) {
      handleCloseSideBar()
    }
  }

  let listItemLinkProps: any

  if (hasChildren) {
    listItemLinkProps = {
      onClick: handleClick,
    }
  } else if (
    (fullPath && fullPath?.startsWith('http://')) ||
    fullPath?.startsWith('https://')
  ) {
    listItemLinkProps = {
      component: 'a',
      href: fullPath,
      color: 'inherit',
      target: target,
    }
  } else {
    listItemLinkProps = {
      component: NavLink,
      to: fullPath,
      color: 'inherit',
      activeClassName: ({ isActive }: any) => {
        return isActive && fullPath ? 'NavLinkSeleced' : ''
      },
      target: target,
    }
  }

  const getLevelColor = () => {
    if (level == 2) return Cyan[700]
    if (level == 3) return green[900];
  }

  const getLevelIcon = () => {
    if (level > 1) {
      return level == 2 ? <DragHandle /> : <Dehaze />
    }
  }

  return (
    <>
      <ListItem
        dense={true}
        key={fullPath}
        disablePadding
        sx={{
          display: 'block',
          mt: 0,
          color: getLevelColor(),
          fontWeight: '900',
        }}
        onClick={handleClick}
        {...listItemLinkProps}
      >
        <ListItemButton
          sx={{
            minHeight: 30,
            justifyContent: sideBarExpanded ? 'initial' : 'center',
            pr: 2.5,
            pl: 2.5,
            backgroundColor: 'inherit',
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: sideBarExpanded ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon ? (
              <SideBarIcon icon={getDynamicIcon(icon)} />
            ) : (
              getLevelIcon()
            )}
          </ListItemIcon>
          <ListItemText
            primary={<span style={{ fontSize: '0.9rem' }}>{title}</span>}
            sx={{ opacity: sideBarExpanded ? 1 : 0 }}
          />
          {sideBarExpanded &&
            children &&
            children[0].hideOnSidebar != true &&
            (open ? (
              <SideBarIcon icon={ArrowUp2} variant="Linear" />
            ) : (
              <SideBarIcon icon={ArrowDown2} variant="Linear" />
            ))}
        </ListItemButton>
      </ListItem>
      {sideBarExpanded && children && children[0].hideOnSidebar != true && (
        <Collapse in={open} timeout="auto">
          <List sx={{ pl: level + 1 }} dense={true}>
            {children.map((subItem: SideBarItemType, index: any) => {
              return (
                <SideBarItem
                  key={index}
                  {...subItem}
                  sideBarExpanded={sideBarExpanded}
                  level={level + 1}
                  handleCloseSideBar={handleCloseSideBar}
                />
              )
            })}
          </List>
        </Collapse>
      )}
    </>
  )
}
