import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import axios from 'axios'
import i18n from 'i18next'
import NewsList from './components/newslist'

export default function News() {
  const [newsList, setNewsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errmsg, setErrMsg] = useState('')
  const [page, setPage] = useState(1)
  useEffect(() => {
    async function getNewsList() {
      try {
        setIsLoading(true)
        const res = await axios.get(`https://corona--tracker.herokuapp.com/newslist?_page=${page}&_limit=20`)
        setNewsList([...newsList,...res.data])
        setErrMsg('')
      } catch(err) {
        setErrMsg('Get error while loading data. Please try again')
      } finally {
        setIsLoading(false)
      }
    }
    getNewsList()
  }, [page])
  const loadMore = () => {
    if(page < 7) {
      setPage(page + 1)
    }
  }
  window.addEventListener('scroll', () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      loadMore()
    }
  })
  return (
    <div className='news_section'>
      <h2>{i18n.t('newsPageTitle')}</h2>
      {isLoading && <Spin tip={`${i18n.t('loading')}...`}/>}
      <NewsList newsList={newsList} />
      {errmsg && <>{errmsg}</>}
      {isLoading && <Spin tip={`${i18n.t('loading')}...`}/>}
    </div>
  )
}
