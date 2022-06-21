import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function UsersIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 18.843 18.843">
      <defs>{`<style>.users-icon-fill{fill:currentColor}</style>`}</defs>
      <path
        className="users-icon-fill"
        d="M7.5,11.87c-1.837,0-5.5.919-5.5,2.748v1.374H12.992V14.618C12.992,12.788,9.333,11.87,7.5,11.87ZM3.837,14.421A7.57,7.57,0,0,1,7.5,13.44a7.57,7.57,0,0,1,3.659.981ZM7.5,10.5A2.748,2.748,0,1,0,4.748,7.748,2.751,2.751,0,0,0,7.5,10.5Zm0-3.926A1.178,1.178,0,1,1,6.318,7.748,1.176,1.176,0,0,1,7.5,6.57Zm5.527,5.347a3.292,3.292,0,0,1,1.539,2.7v1.374H17.7V14.618C17.7,13.032,14.954,12.129,13.023,11.917ZM12.207,10.5a2.748,2.748,0,0,0,0-5.5,2.705,2.705,0,0,0-1.178.275,4.288,4.288,0,0,1,0,4.946A2.705,2.705,0,0,0,12.207,10.5Z"
        transform="translate(-0.43 -1.074)"
      />
    </SvgIcon>
  )
}

export default UsersIcon
