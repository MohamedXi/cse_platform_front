import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function RentalIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 19.371 19.371">
      <defs>{`<style>.rental-icon-fill{fill:currentColor}</style>`}</defs>
      <path
        className="rental-icon-fill"
        d="M4.3,7.214h9.124v1.3h1.3V4.607a1.307,1.307,0,0,0-1.3-1.3h-.652V2h-1.3V3.3H6.258V2h-1.3V3.3H4.3a1.3,1.3,0,0,0-1.3,1.3L3,13.731a1.3,1.3,0,0,0,1.3,1.3H8.865v-1.3H4.3Zm0-2.607h9.124v1.3H4.3Zm11.626,6.7-.463.463-1.382-1.382.463-.463a.649.649,0,0,1,.919,0l.463.463A.649.649,0,0,1,15.93,11.306Zm-2.307-.456L15,12.232,11.55,15.686H10.169V14.3Z"
        transform="translate(-1.045 -0.219)"
      />
    </SvgIcon>
  )
}

export default RentalIcon
