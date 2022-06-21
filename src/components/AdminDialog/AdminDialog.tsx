import React, { PropsWithChildren } from 'react'
export interface AdminDialogProps {
  className?: string
}
const AdminDialog = ({ className, children }: AdminDialogProps & PropsWithChildren<any>) => {
  return (
    <>
      <div className={`bg-secondary rounded-md leading-7 text-white px-4 ${className || ''}`}>{children}</div>
    </>
  )
}
export default AdminDialog
