import React from 'react'
import { SvgIcon, SvgIconProps } from '@material-ui/core'

function BookingIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} width="24" height="24" viewBox="0 0 15 15">
      <defs>{`<style>.booking-icon-fill{fill:currentColor;}</style>`}</defs>
      <g transform="translate(0.646 2.906)">
        <path
          className="booking-icon-fill"
          d="M13.914,4.823a7.622,7.622,0,0,0-2.26-.323A6.005,6.005,0,0,0,8.1,5.469,6.005,6.005,0,0,0,4.551,4.5,6.005,6.005,0,0,0,1,5.469v9.46a.347.347,0,0,0,.323.323c.065,0,.1-.032.161-.032a7.881,7.881,0,0,1,3.067-.71,6.005,6.005,0,0,1,3.551.969,7.778,7.778,0,0,1,3.551-.969,6.572,6.572,0,0,1,3.067.678.291.291,0,0,0,.161.032.347.347,0,0,0,.323-.323V5.469A4.4,4.4,0,0,0,13.914,4.823Zm0,8.717a7.5,7.5,0,0,0-2.26-.323,7.778,7.778,0,0,0-3.551.969V6.76a7.778,7.778,0,0,1,3.551-.969,7.5,7.5,0,0,1,2.26.323Z"
          transform="translate(-1 -4.5)"
        />
        <g transform="translate(7.749 2.906)">
          <path
            className="booking-icon-fill"
            d="M15.906,9.969a7.551,7.551,0,0,1,1.614.168V9.155A8.719,8.719,0,0,0,15.906,9,7.43,7.43,0,0,0,13,9.536v1.072A5.994,5.994,0,0,1,15.906,9.969Z"
            transform="translate(-13 -9)"
          />
          <path
            className="booking-icon-fill"
            d="M13,12.2v1.072a5.994,5.994,0,0,1,2.906-.639,7.551,7.551,0,0,1,1.614.168v-.981a8.719,8.719,0,0,0-1.614-.155A7.549,7.549,0,0,0,13,12.2Z"
            transform="translate(-13 -9.942)"
          />
          <path
            className="booking-icon-fill"
            d="M15.906,14.33A7.43,7.43,0,0,0,13,14.866v1.072a5.994,5.994,0,0,1,2.906-.639,7.551,7.551,0,0,1,1.614.168v-.981A8.2,8.2,0,0,0,15.906,14.33Z"
            transform="translate(-13 -10.888)"
          />
        </g>
      </g>
    </SvgIcon>
  )
}

export default BookingIcon
