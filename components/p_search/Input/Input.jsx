import { memo, useRef } from 'react'
import s from './style.module.css'
const Input = (props) => {
  const { submitSearch, fetchSuggest, showHistory, inputVal, setInputVal } = props
  const inputEl = useRef(null)
  const handleChange = () => {
    const searchVal = inputEl.current.value
    setInputVal(searchVal)
    const trimVal = searchVal.trim()
    if (!trimVal) {
      fetchSuggest.cancel()
      showHistory()
      return false
    }
    if (inputVal !== trimVal) {
      fetchSuggest(trimVal)
    }
  }
  const searchSubmit = (e) => {
    if (e.keyCode !== 13 || !inputEl?.current) {
      return
    }
    const event = e || window.event
    event.preventDefault()
    fetchSuggest.cancel()
    const filteredVal = inputEl.current.value.trim()
    if (!filteredVal) {
      setInputVal('')
      return false
    }
    submitSearch(filteredVal)
    inputEl.current.blur()
    return false
  }
  const clearInput = () => {
    fetchSuggest.cancel()
    setInputVal('')
    showHistory()
    inputEl.current.focus()
  }
  return (
    <div className={s.container}>
      <div className={`${s.formCont} border-b-1px ${inputVal ? '' : s.empty}`}>
        {/* 让软键盘显示搜索按钮 */}
        <form action="">
          <input
            id="searchInputEle"
            type="search"
            className={s.search}
            placeholder={' 输入搜索内容'}
            value={inputVal}
            onChange={handleChange}
            ref={inputEl}
            onKeyUp={searchSubmit}
            onClick={() => {
              inputEl.current.focus()
            }}
          />
          {/* 禁止按回车表单自动提交：如果表单中含有多个单行输入框，按Enter键时不会自动提交 */}
          <input type="text" name="notautosubmit" style={{ display: 'none' }} />
        </form>
        {/* 当输入框不为空的时候展示自定义清空按钮*/}
        {inputVal ? <button onClick={clearInput} className={s.clean} /> : null}
      </div>
    </div>
  )
}

export default memo(Input)
