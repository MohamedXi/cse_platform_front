import React from 'react'
import { makeStyles, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      backgroundColor: theme.palette.primary.main,
      // color: theme.palette.common.white,
    },
  }
})

const Footer = () => {
  const classes = useStyles()
  const year = new Date().getFullYear()
  const version = window['runConfig'].REACT_APP_VERSION

  return (
    <footer className={`${classes.root} h-12 w-screen flex items-center justify-center text-white`}>
      <Typography color="inherit">
        &#169; {year} - Groupe Créative - {`v${version}`}
      </Typography>
    </footer>
  )
}

export default Footer
