import s from './style.module.css'
import Slider from 'react-slick'
import { memo } from 'react'
import Link from 'next/link'
const Banner = (props) => {
  const { data = [] } = props
  const isSwiperable = !!data.length
  const settings = {
    dotsClass: 'banner-dots',
    className: 'home-banners',
    speed: 500,
    autoplay: isSwiperable,
    infinite: isSwiperable,
    swipe: isSwiperable,
    dots: isSwiperable,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const renderBanner = () => {
    return data.map((item) => {
      return (
        <div key={item.courseId}>
          <Link href="/course/detail/[id]" as={`/course/detail/${item.courseId}`}>
            <img className={s.img} src={item.img} alt="" />
          </Link>
        </div>
      )
    })
  }
  return (
    <section className={s.banner}>
      <Slider {...settings}>{renderBanner()}</Slider>
    </section>
  )
}

export default memo(Banner)
