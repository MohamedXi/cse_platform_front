import React from 'react'
import { IconButton, makeStyles, Theme } from '@material-ui/core'
import { Router } from '@reach/router'
import Logo from '../Logo/Logo'
import clsx from 'clsx'
import NavArrowIcon from '../Icons/NavArrowIcon'
import Drawer from './Drawer'
import Nav from './NavLink'

const useStyles = makeStyles((theme: Theme) => {
  const transitionOpen = theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })
  const transitionClose = theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
  return {
    iconsOpen: {
      marginLeft: '2rem',
      transition: transitionOpen,
    },
    iconsClose: {
      marginLeft: '0.7rem',
      transition: transitionClose,
    },
    currentLink: {
      borderRight: `solid 8px ${theme.palette.primary.light}`,
      backgroundColor: theme.palette.primary.main,
    },
  }
})

export interface VerticalNavProps {
  open: boolean
  setOpen: (value: boolean) => void
}

const VerticalNav = ({ open, setOpen }: VerticalNavProps) => {
  const classes = useStyles()
  const toggleOpen = () => setOpen(!open)
  return (
    <Drawer open={open}>
      <div className="flex flex-col h-full pt-6 text-white">
        <Logo large={open} />
        <span
          className={clsx('py-4', {
            [classes.iconsOpen]: open,
            [classes.iconsClose]: !open,
          })}
        >
          <IconButton onClick={toggleOpen} size="small" color="inherit" style={{ padding: 0 }}>
            <NavArrowIcon open={open} />
          </IconButton>
        </span>
        <Router>
          <Nav path="/*" open={open} classes={classes} />
        </Router>
      </div>
    </Drawer>
  )
}

export default VerticalNav
