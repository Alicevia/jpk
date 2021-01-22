import s from './style.module.css'
import { memo } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import { changeAry } from 'utils/index'
import Link from 'next/link'
const Category = (props) => {
  let { data } = props
  data = changeAry(data, 8)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  const renderCategory = () => {
    return data.map((item, index) => {
      return (
        <div key={index}>
          <ul className={s.swiper}>
            {item &&
              item.map((value) => (
                <li key={value.id} className={s.swiperItem}>
                  <Link href="">
                    <div>
                      <img src={value.img} alt="" />
                      <a>{value.title}</a>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )
    })
  }
  return (
    <section className={`${s.category} wrap`}>
      <Slider {...settings}>{renderCategory()}</Slider>
    </section>
  )
}

Category.defaultProps = {
  data: [],
}
Category.propTypes = {
  data: PropTypes.array.isRequired,
}

export default memo(Category)
