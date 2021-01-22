import { memo } from 'react'
import s from './style.module.css'
const Title = (props) => {
  let { data = {} } = props
  return (
    <div className={s.title}>
      <span
        style={{
          backgroundColor: '#fb4a3e',
          width: '4px',
          alignSelf: 'stretch',
        }}></span>
      <div className={s.today}>
        <h4>{data.title}</h4>
        <p>{data.desc}</p>
      </div>
      {props.children}
    </div>
  )
}
export default memo(Title)
