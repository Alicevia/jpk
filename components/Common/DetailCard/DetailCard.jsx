import s from './style.module.css'
const DetailCard = (props) => {
  const data = props.data || {}
  return (
    <div className={s.detail}>
      <p className={`${s.desc}`}>{data.title}</p>
      <div className={s.teacher}>
        <img src="/img/teacher1.png" alt="" />
        {data.teacher.title}
        <span></span>
      </div>
    </div>
  )
}

export default DetailCard
