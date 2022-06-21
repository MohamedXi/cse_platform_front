import React, { MouseEventHandler } from 'react'
import { Button, Popover, Typography } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { User } from 'oidc-client'

export interface ProfileMenuProps {
  anchorEl: HTMLElement | null
  user: User
  onClose: MouseEventHandler<MouseEvent>
  handleLogout: () => void
}

function ProfileMenu({ anchorEl, user, onClose, handleLogout }: ProfileMenuProps) {
  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className="flex flex-col items-center pt-4 pb-2 px-2">
        <Typography style={{ marginBottom: '1em' }}>{user?.profile.name}</Typography>
        <Button variant="text" color="secondary" startIcon={<ExitToAppIcon />} onClick={handleLogout}>
          Se déconnecter
        </Button>
      </div>
    </Popover>
  )
}

export default ProfileMenu
