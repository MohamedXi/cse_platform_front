import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 19.371 19.371">
      <defs>{`<style>.home-icon-fill{fill:currentColor}</style>`}</defs>
      <path
        className="home-icon-fill"
        d="M9.686,4.958l3.843,3.275v5.684H11.991V9.55H7.38v4.366H5.843V8.232L9.686,4.958M9.686,3,2,9.55H4.306v5.822H8.917V11h1.537v4.366h4.611V9.55h2.306Z"
      />
    </SvgIcon>
  )
}

export default HomeIcon
