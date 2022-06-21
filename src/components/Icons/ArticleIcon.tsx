import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function ArticleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 19.371 19.371">
      <defs>{`<style>.article-icon-fill{fill:currentColor}</style>`}</defs>
      <path
        className="article-icon-fill"
        d="M15 1H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zM5 4h5v1H5zm0 2h5v1H5zm0 2h5v1H5zm10 7H5v-1h10zm0-2H5v-1h10zm0-2H5v-1h10zm0-2h-4V4h4z"
      />
    </SvgIcon>
  )
}

export default ArticleIcon
