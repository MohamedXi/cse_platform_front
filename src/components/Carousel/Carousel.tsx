import { ReactNode, useState } from 'react'
import Slider, { Settings, CustomArrowProps } from 'react-slick'
import { makeStyles, Theme } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import clsx from 'clsx'

interface CarouselProps extends Settings {
  children: Array<ReactNode>
  style?: object
  dots?: boolean
  fade?: boolean
  autoplay?: boolean
  slidesToShow?: number
  slidesToScroll?: number
  className?: string
  catalogue?: boolean
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      color: theme.palette.primary.light,
    },
    enabled: {
      color: theme.palette.primary.main,
    },
    disabled: {
      color: theme.palette.primary.light,
    },
  }
})

const useDotsStyles = makeStyles((theme: Theme) => {
  return {
    enabled: {
      color: theme.palette.primary.main,
    },
    disabled: {
      color: theme.palette.primary.light,
    },
  }
})

// The custom arrows components need to stay in the same file of the carousel
// { className, style, onClick, currentSlide, slideCount }: CustomArrowProps & slidesShow :number
const NextArrow = ({
  children,
  className,
  style,
  onClick,
  currentSlide,
  slideCount,
  slidesToShow,
}: CustomArrowProps & CarouselProps) => {
  const classes = useStyles()

  return (
    <div onClick={onClick} className={className} style={style}>
      <ArrowForwardIosIcon
        className={`${classes.root} ${
          currentSlide === slideCount! - slidesToShow! ? [classes.disabled] : [classes.enabled]
        } `}
        fontSize="large"
      />
    </div>
  )
}

const PrevArrow = ({ className, style, onClick, currentSlide }: CustomArrowProps) => {
  const classes = useStyles()

  return (
    <div onClick={onClick} className={className} style={style}>
      <ArrowBackIosIcon
        className={`${classes.root} ${currentSlide === 0 ? [classes.disabled] : [classes.enabled]}`}
        fontSize="large"
      />
    </div>
  )
}

const Carousel = ({
  children,
  dots = true,
  fade = true,
  autoplay = false,
  slidesToShow = 1,
  slidesToScroll = 1,
  infinite = false,
  catalogue = false,
  ...props
}: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const classes = useDotsStyles()

  return (
    <Slider
      {...props}
      dots={dots}
      infinite={infinite}
      nextArrow={<NextArrow children={[]} slidesToShow={slidesToShow} />}
      prevArrow={<PrevArrow />}
      slidesToScroll={slidesToScroll}
      slidesToShow={slidesToShow}
      responsive={
        !catalogue
          ? []
          : [
              {
                breakpoint: 1344,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                },
              },
            ]
      }
      customPaging={(i: number) => (
        <FiberManualRecordIcon
          className={`${clsx({
            [classes.enabled]: currentSlide === i,
            [classes.disabled]: currentSlide !== i,
          })}`}
          fontSize="small"
        />
      )}
      afterChange={(index: number) => setCurrentSlide(index)}
    >
      {children}
    </Slider>
  )
}

export default Carousel
