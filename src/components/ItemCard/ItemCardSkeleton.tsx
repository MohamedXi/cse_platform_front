import React from 'react'
import { Box, Divider, Skeleton } from '@material-ui/core'

function ItemCardSkeleton() {
  return (
    <Box
      sx={{ width: '333px', height: '150px' }}
      className="flex flex-shrink-0 border border-solid border-gray-200 bg-grey-100 rounded-2xl mr-4 my-5 p-6"
    >
      <div className="flex flex-row">
        <Skeleton sx={{ width: '94.5px', height: '137px' }} variant="rectangular" className="" />
        <div className="flex flex-col ml-4">
          <div className="flex flex-row flex-nowrap items-start">
            <Skeleton sx={{ width: '44px', height: '44px' }} variant="circular" className="" />
            <div className="flex flex-col flex-nowrap ml-3" style={{ height: '70px' }}>
              <Skeleton sx={{ width: '30px', height: '16px' }} variant="text" className="mt-1" />
              <Skeleton sx={{ width: '120px', height: '19px' }} variant="text" className="mt-1" />
              <div className="flex flex-row items-center mt-1">
                <Skeleton sx={{ width: '31px', height: '16px' }} variant="text" />
                <Skeleton sx={{ width: '40px', height: '16px' }} variant="text" className="ml-2" />
                <Skeleton sx={{ width: '36px', height: '16px' }} variant="text" className="ml-2" />
              </div>
            </div>
          </div>
          <Divider />
          <Skeleton sx={{ width: '177px', height: '70px' }} variant="rectangular" className="mt-1" />
        </div>
      </div>
    </Box>
  )
}

export default ItemCardSkeleton
