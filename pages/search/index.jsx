import { getSearchResult, getSearchSuggest, getHotWord } from 'core/api'
import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useLSState from 'core/hooks/useLSState'
import throttle from 'lodash.throttle'
import Input from '@/p_search/Input/Input'
import Suggest from '@/p_search/Suggest/Suggest'
import History from '@/p_search/History/History'
import Result from '@/p_search/Result/Result'
import s from './style.module.css'
const TYPES = {
  HISTORY: 'history',
  SUGGEST: 'suggest',
  RESULT: 'result',
}
export default function Search(props) {
  console.log(props)
  const { result, hotWord, kw } = props
  const router = useRouter()
  const [contType, setContType] = useState(kw ? TYPES.RESULT : TYPES.HISTORY)
  const [loading, setLoading] = useState(false)
  const [suggestList, setSuggestList] = useState([])
  const [history, setHistory] = useLSState('searchHistory', kw ? [kw] : [])
  const [inputVal, setInputVal] = useState(kw || '')

  const submitSearch = (kw = '') => {
    history.unshift(kw) //加入到历史列表
    setHistory([...new Set(history.slice(0, 6))]) //过滤一波
    setContType(TYPES.RESULT)
    setLoading(true)
    setInputVal(kw)
    router.replace({
      //搜索了之后将数据更新到url query内
      path: 'search',
      query: { kw },
    })
  }

  const fetchSuggest = useMemo(() => {
    return throttle(async (kw = '') => {
      if (contType !== TYPES.SUGGEST) {
        setContType(TYPES.SUGGEST)
      }
      const res = (await getSearchSuggest(kw)) || []
      setSuggestList(res)
    }, 300)
  }, [contType, setContType, setSuggestList])

  const renderObj = useMemo(
    () => ({
      [TYPES.SUGGEST]() {
        return <Suggest submitSearch={submitSearch} data={suggestList} />
      },
      [TYPES.HISTORY]() {
        return (
          <History
            submitSearch={submitSearch}
            hotWord={hotWord}
            history={history}
            deleteHistory={() => setHistory([])}
          />
        )
      },
      [TYPES.RESULT]() {
        return <Result data={result} kw={kw} />
      },
    }),
    [history, hotWord, kw, result, setHistory, submitSearch, suggestList],
  )
  const renderContent = () => {
    if (loading) return <div className={s.loading}>加载中......</div>
    return renderObj[contType]()
  }

  const showHistory = () => {
    setContType(TYPES.HISTORY)
  }
  useEffect(() => {
    setLoading(false)
  }, [result])

  return (
    <div>
      <Head>
        <title>精品课搜索页</title>
      </Head>
      <main className="wrap">
        {/* 输入框 */}
        <Input
          keyword={kw}
          submitSearch={submitSearch}
          fetchSuggest={fetchSuggest}
          showHistory={showHistory}
          inputVal={inputVal}
          setInputVal={setInputVal}
        />
        {/* 内容区 */}
        <div className={s.content}>{renderContent()}</div>
      </main>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { kw = '' } = ctx.query
  let result = []
  let hotWord = []

  if (kw && kw.trim()) {
    //如果存在这么个kw
    const [resultRes, hotWordRes] = await Promise.allSettled([getSearchResult(kw), getHotWord()])
    console.log('xx', resultRes, hotWordRes)
    result = resultRes.value
    hotWord = hotWordRes.value
  } else {
    hotWord = await getHotWord()
  }
  return {
    props: {
      result,
      hotWord,
      kw,
    },
  }
}
