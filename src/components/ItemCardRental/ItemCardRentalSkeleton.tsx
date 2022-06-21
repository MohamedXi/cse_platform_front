import React from 'react'
import { Box, Divider, Skeleton } from '@material-ui/core'

const ItemCardSkeleton = () => {
  return (
    <Box
      sx={{ width: '210px', height: '150px' }}
      className="flex flex-shrink-0 relative border border-solid border-gray-200 bg-grey-100 rounded-2xl mr-2"
    >
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="flex flex-row flex-nowrap items-start pt-4">
            <Skeleton sx={{ width: '44px', height: '44px' }} variant="circular" className="ml-4" />
            <div className="flex flex-col flex-nowrap ml-3" style={{ height: '70px', width: '75px' }}>
              <Skeleton sx={{ width: '69px', height: '16px' }} variant="text" className="mt-1" />
              <Skeleton sx={{ width: '115px', height: '19px' }} variant="text" className="mt-1" />
              <div className="flex flex-row items-center mt-1">
                <Skeleton sx={{ width: '51px', height: '16px' }} variant="text" />
                <Skeleton sx={{ width: '40px', height: '16px' }} variant="text" className="ml-2" />
                <Skeleton sx={{ width: '56px', height: '16px' }} variant="text" className="ml-2" />
              </div>
            </div>
          </div>
          <Divider />
          <Skeleton sx={{ width: '180px', height: '30px' }} variant="rectangular" className="mt-1 ml-4 mr-4" />
          <Skeleton
            sx={{ width: '64px', height: '20px' }}
            variant="rectangular"
            className="absolute -bottom-2 left-16"
          />
        </div>
      </div>
    </Box>
  )
}

export default ItemCardSkeleton
