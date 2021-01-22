import { memo } from 'react'
import s from './style.module.css'

const ClassCard = (props) => {
  let { data } = props
  return (
    <div className={s.classcard}>
      <h4 className={s.header}>
        <span>{data.categoryName}</span>
        {data.courseTitle}
      </h4>
      <p className={s.coursetime}>开课时间: {data.courseTime}</p>
      <div className={s.course}>
        <ul className={s.teacher}>
          {data.teacherList.map((item) => {
            return (
              <li key={item.name}>
                <img className={s.avatar} src={item.img} alt="" />
                <p className={s.name}>{item.name}</p>
              </li>
            )
          })}
        </ul>
        <div className={s.price}>
          {data.saleType ? <s>¥{data.price}</s> : null}
          <span>¥{data.saleType ? data.salePrice : data.price}</span>
          <p>剩余8天 恢复原价</p>
        </div>
      </div>
    </div>
  )
}

export default memo(ClassCard)
