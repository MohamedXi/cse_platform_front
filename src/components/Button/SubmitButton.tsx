import React, { MouseEventHandler, PropsWithChildren } from 'react'
import { Button, CircularProgress } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'

export interface SubmitButtonProps {
  disabled?: boolean
  submitting?: boolean
  size?: 'small' | 'medium' | 'large'
  variant?: 'contained' | 'outlined'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick: MouseEventHandler
  type?: 'button' | 'reset' | 'submit'
  className?: string
  classes?: ClassNameMap
  color: 'primary' | 'secondary'
  href?: string
}

const SubmitButton = ({
  onClick,
  children,
  disabled = false,
  submitting = false,
  size = 'medium',
  variant = 'contained',
  leftIcon,
  rightIcon,
  type = 'button',
  className,
  classes = {},
  color = 'primary',
  href,
}: SubmitButtonProps & PropsWithChildren<any>) => {
  return (
    <Button
      className={className}
      classes={classes}
      variant={variant}
      disabled={disabled}
      type={type}
      color={color}
      size={size}
      startIcon={leftIcon}
      endIcon={submitting ? rightIcon && <CircularProgress size={'1em'} color="inherit" /> : rightIcon}
      onClick={onClick}
      href={href}
    >
      {children}
    </Button>
  )
}

export default SubmitButton
