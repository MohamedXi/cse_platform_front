import React, { useEffect } from 'react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos'
import { useSelector } from 'react-redux'
import { allTagsSelector } from '../../../selectors/tags'
import { useAppDispatch } from '../../../store'
import { getAllTags } from '../../../actions/tagsActions'
import { getAllItemTypes } from '../../../actions/itemTypesActions'
import TagsList from '../../../components/TagsAndCategories/TagsList'
import { allItemTypesSelector } from '../../../selectors/itemTypes'

const CreaLocAdminTags = (_props: RouteComponentProps) => {
  const dispatch = useAppDispatch()

  const tags = useSelector(allTagsSelector)
  const categories = useSelector(allItemTypesSelector)

  useEffect(() => {
    // Fetch all tags at first load
    dispatch(getAllItemTypes())
    dispatch(getAllTags())
  }, [dispatch])

  return (
    <section className="h-full flex flex-col">
      <div className="flex flex-row">
        <div className="flex flex-col justify-center cursor-pointer" onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ height: '14px' }} />
        </div>
        <Typography
          variant="h1"
          style={{
            fontSize: '1.5rem',
            letterSpacing: '2.2px',
            paddingLeft: 0,
          }}
        >
          {' '}
          Catégories & Tags{' '}
        </Typography>
      </div>
      <div className="flex w-full">
        <TagsList data={categories} title={'Catégories'} isCategories={true} />
        <TagsList data={tags} title={'Tags'} isCategories={false} />
      </div>
    </section>
  )
}

export default CreaLocAdminTags
