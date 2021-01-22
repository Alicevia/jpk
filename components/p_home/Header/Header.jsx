import s from './style.module.css'
import Link from 'next/link'
export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.content}>
        <Link href="/search">
          <a className={s.search}>请输入搜索内容</a>
        </Link>
        <Link href="/user">
          <a className={s.user}></a>
        </Link>
      </div>
    </header>
  )
}
