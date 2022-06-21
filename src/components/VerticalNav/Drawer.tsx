import React from 'react'
import { Drawer, DrawerProps, makeStyles, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { verticalNavClosedWidth, verticalNavOpenWidth } from '../../styles/theme'

const useStyles = makeStyles((theme: Theme) => {
  const transitionOpen = theme.transitions.create(['width', 'padding', 'height'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })
  const transitionClose = theme.transitions.create(['width', 'padding', 'height'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
  return {
    root: {
      background: theme.palette.darkGradient.main,
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
      border: 'none',
      overflow: 'hidden',
    },
    paper: {
      width: verticalNavOpenWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: verticalNavOpenWidth,
      transition: transitionOpen,
    },
    drawerClosed: {
      transition: transitionClose,
      overflowX: 'hidden',
      width: verticalNavClosedWidth,
    },
  }
})

const StyledDrawer = ({ open, children }: DrawerProps) => {
  const classes = useStyles()

  return (
    <Drawer
      variant="permanent"
      classes={{
        root: clsx(classes.root, {
          [classes.drawerOpen]: open,
          [classes.drawerClosed]: !open,
        }),
        paper: clsx(classes.paper, {
          [classes.drawerOpen]: open,
          [classes.drawerClosed]: !open,
        }),
      }}
      PaperProps={{ classes: { root: classes.root } }}
      open={open}
    >
      {children}
    </Drawer>
  )
}

export default StyledDrawer
