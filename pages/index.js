import Head from 'next/head'
import Header from '@/p_home/Header/Header'
import Banner from '@/p_home/Banner/Banner'
import Category from '@/p_home/Category/Category'
import OpenClass from '@/p_home/OpenClass/OpenClass'
import ClassSelection from '@/p_home/ClassSelection/ClassSelection'
import { getHome } from 'core/api'
export default function Home(props) {
  const { banner, fixedEntries, talk } = props
  return (
    <>
      <Head>
        <title>精品课首页</title>
      </Head>
      <Header></Header>
      <Banner data={banner}></Banner>
      <Category data={fixedEntries}></Category>
      <OpenClass data={talk}></OpenClass>
      <ClassSelection></ClassSelection>
    </>
  )
}

export async function getServerSideProps() {
  let data = await getHome()
  return {
    props: data,
  }
}
