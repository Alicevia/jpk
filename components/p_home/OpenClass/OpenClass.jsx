import s from './style.module.css'
import { memo } from 'react'
import PropTypes from 'prop-types'
import Title from 'components/Common/Title/Title'
import Image from 'components/Common/Image/Image'
import DetailCard from 'components/Common/DetailCard/DetailCard'

const OpenClass = (props) => {
  let { recommend, card = [] } = props.data
  const renderTeacher = () => {
    return card.map((item) => {
      return (
        <li key={item.courseId} style={{ width: '49%', marginBottom: '2%' }}>
          <DetailCard data={item}></DetailCard>
        </li>
      )
    })
  }
  return (
    <section className={`${s.openclass} wrap`}>
      <Title data={{ title: '今日公开课', desc: "Today's public class" }}>
        <p className={s.more}>查看更多 ▶</p>
      </Title>
      <Image data={recommend}></Image>
      <ul style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
        {renderTeacher()}
      </ul>
    </section>
  )
}

OpenClass.defaultProps = {
  data: [],
}
OpenClass.propTypes = {
  data: PropTypes.object,
}

export default memo(OpenClass)
