import React, { MouseEventHandler } from 'react'
import { Button} from '@material-ui/core'
import userManager from '../../auth/userManager'
export interface SignoutProps {
    onConfirm: () => Promise<any>
    onCancel: () => Promise<any>
  }

const Signout= ({onConfirm,onCancel}:SignoutProps)=>{
    const handleConfirm: MouseEventHandler = () => {
          userManager.signoutRedirect()
          .then(()=>onConfirm())
          .catch(()=>onCancel())
    }
    const handleCancel: MouseEventHandler = () => {
        onCancel()
    }
    return (
        <div className="flex  flex-col items-center space-y-4  h-fit w-fit p-5">
            <span> Êtes-vous sûr de vouloir vous déconnecter ? </span>
            <div className="flex  items-center flex-row space-x-4">
              <Button variant="contained" onClick={handleConfirm}>
                 Oui
              </Button>
              <Button variant="contained" onClick={handleCancel}>
                 Non
              </Button>
            </div>

        </div>
    )
}

export default Signout