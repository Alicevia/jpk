import { memo } from 'react'
import s from './style.module.css'
import { useState, useCallback, useEffect } from 'react'
import { getRecommend } from 'core/api'
import Title from 'components/Common/Title/Title'
import ClassCard from 'components/Common/ClassCard/ClassCard'
import LoadMore from '@/Common/LoadMore/LoadMore'
const OFFSET = 10
const ClassSelection = () => {
  const [recommend, setRecommend] = useState({
    list: [], // 推荐课列表数据
    pageStart: 0, // 页码
    hasMore: true, //  是否有下一页
  })
  const fetchRecommend = useCallback(async () => {
    try {
      const list = await getRecommend({
        start: recommend.pageStart,
        offset: OFFSET,
      })
      console.log(list)
      // 保存数据
      setRecommend({
        list: recommend.list.concat(list), // 在已有数据列表上补充本次数据
        pageStart: recommend.pageStart + 1, // 页码+1
        hasMore: list.length === OFFSET, // 判断是否足够10条，不足意味着没有更多了。
      })
    } catch (error) {
      console.log('fetchRecommend Error', error)
    }
  }, [recommend])
  useEffect(() => {
    fetchRecommend()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const renderCourse = () => {
    return recommend.list.map((item) => {
      return <ClassCard key={item.id} data={item}></ClassCard>
    })
  }
  return (
    <section className={`${s.class} wrap`}>
      <Title data={{ title: '课程精选', desc: 'Course selection' }}></Title>
      <div style={{ marginTop: '15px' }}>{renderCourse()}</div>
      <LoadMore hasMore={recommend.hasMore} onReachBottom={fetchRecommend}></LoadMore>
    </section>
  )
}

export default memo(ClassSelection)
