import React, {useState} from 'react'
import { NavLinkProps, navLinks } from './nav-links'
import { Link, LinkGetProps, RouteComponentProps } from '@reach/router'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles/withStyles'
import BaseDialog from '../Dialogs/BaseDialog'
import Signout from '../Signout/Signout'
import SignoutIcon from '../Icons/SignoutIcon'

// Auth
import hasRoles from '../../auth/hasRoles'
import { Roles } from '../../consts/roles'

export interface NavLinkClasses {
  iconsClose: string
  iconsOpen: string
  currentLink: string
}

const NavLink = ({
  to,
  Icon,
  label,
  large,
  classes,
}: NavLinkProps & {
  large: boolean
  classes: ClassNameMap<keyof NavLinkClasses>
}) => {
  const styleLink = ({ isCurrent }: LinkGetProps) => {
    return {
      className: clsx(
        'flex flex-row flex-nowrap items-center py-4 leading-4 no-underline hover:bg-primary text-white',
        { [classes.currentLink]: isCurrent },
      ),
    }
  }
  return (
    <Link key={label + to} to={to} getProps={styleLink}>
      <Icon className={clsx('mr-3', { [classes.iconsOpen]: large }, { [classes.iconsClose]: !large })} />
      <Typography className="block ">{label}</Typography>
    </Link>
  )
}

interface NavProps {
  open: boolean
  classes: ClassNameMap<keyof NavLinkClasses>
}

const Nav = ({ open, classes }: NavProps & RouteComponentProps) => {

  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleCloseModal= async()=>{ 
        setOpenModal(false)
  }
  
  return (
    <nav className="flex flex-col items-strecth text-white font-extrabold">
      {navLinks.map((item, index) => {
        if (!hasRoles(item.roles)) {
          return null
        }
        return <NavLink key={`navlink-${index}-${item.to}`} {...item} large={open} classes={classes}  />
      })}
      
      {  
         !hasRoles([Roles.collaborator]) ?
            null
          :
            <>
              <div  className='flex flex-row flex-nowrap items-center py-4 leading-4 no-underline hover:bg-primary cursor-pointer text-white'
                          onClick={() => setOpenModal(true)}>
                  
                        <SignoutIcon className={clsx('mr-3', { [classes.iconsOpen]: open }, { [classes.iconsClose]: !open })} />
                        <Typography className="block ">Déconnexion</Typography>
              </div>
              <BaseDialog
                    open={openModal}
                    onClose={() => handleCloseModal()}
                    content={ <Signout onConfirm={() => handleCloseModal()} onCancel={() =>handleCloseModal()}/>}
              />
            </>
        }
    </nav>
  )
}

export default Nav
