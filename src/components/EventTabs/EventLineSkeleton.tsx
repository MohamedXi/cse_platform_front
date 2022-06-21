import React from 'react'
import { Box, Skeleton } from '@material-ui/core'

const EventLineSkeleton = () => {
  return (
    <Box sx={{}} className="flex flex-shrink-0 relative">
      <div className="flex flex-row">
        <div className="flex flex-row flex-nowrap items-start pt-2">
          <Skeleton sx={{ width: '21px', height: '21px' }} variant="circular" className="" />
          <div className="flex flex-row flex-nowrap ml-3">
            <div className="flex flex-row items-center mt-0.5">
              <Skeleton sx={{ width: '51px', height: '16px' }} variant="text" />
              <Skeleton sx={{ width: '40px', height: '16px' }} variant="text" className="ml-2" />
            </div>
          </div>
        </div>
        <Skeleton sx={{ width: '64px', height: '20px' }} variant="rectangular" className="mt-2 ml-6" />
      </div>
    </Box>
  )
}

export default EventLineSkeleton
