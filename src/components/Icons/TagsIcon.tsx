import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function TagsIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 18.059 18.059">
      <defs>{`<style>.tags-icon-fill{fill:currentColor}</style>`}</defs>
      <path
        className="tags-icon-fill"
        d="M16.6,9.208,9.833,2.436A1.5,1.5,0,0,0,8.772,2H3.5A1.509,1.509,0,0,0,2,3.5V8.772A1.5,1.5,0,0,0,2.444,9.84l6.772,6.772a1.5,1.5,0,0,0,1.061.436,1.471,1.471,0,0,0,1.061-.444L16.6,11.338a1.471,1.471,0,0,0,.444-1.061A1.52,1.52,0,0,0,16.6,9.208Zm-6.328,6.343L3.5,8.772V3.5H8.772V3.5l6.772,6.772Z"
        transform="translate(-0.495 -0.495)"
      />
      <circle className="tags-icon-fill" cx="1" cy="1" r="1" transform="translate(4 4)" />
    </SvgIcon>
  )
}

export default TagsIcon
