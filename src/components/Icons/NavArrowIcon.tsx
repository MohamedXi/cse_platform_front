import React from 'react'
import { makeStyles, SvgIcon, Theme } from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme: Theme) => {
  const transitionOpen = theme.transitions.create('transform', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })
  const transitionClose = theme.transitions.create('transform', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
  return {
    right: {
      transform: 'rotate(0deg)',
      transition: transitionOpen,
    },
    left: {
      transition: transitionClose,
      transform: 'rotate(180deg)',
    },
  }
})

function NavArrowIcon({ open }: { open: boolean }) {
  const classes = useStyles()

  return (
    <SvgIcon
      className={clsx({ [classes.right]: open, [classes.left]: !open })}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        {`<style>.nav-arrow-icon-fill{stroke: currentColor; stroke-width: 2; stroke-linecap="round"}</style>`}
      </defs>
      <line
        className="nav-arrow-icon-fill"
        x1="16"
        y1="4"
        x2="8"
        y2="12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        className="nav-arrow-icon-fill"
        x1="16"
        y1="20"
        x2="8"
        y2="12"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </SvgIcon>
  )
}

export default NavArrowIcon
