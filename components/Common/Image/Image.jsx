import { memo } from 'react'
import s from './style.module.css'
const Image = (props) => {
  console.log(props.data)
  const [a, b, c] = props.data
  return (
    <div className={s.image}>
      <img src={a.img} alt="" className={s.left} />
      <div className={s.right}>
        <img src={b.img} alt="" />
        <img src={c.img} alt="" />
      </div>
    </div>
  )
}

export default memo(Image)
