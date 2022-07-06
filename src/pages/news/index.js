import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Spin } from 'antd'
import axios from 'axios'
import NewsList from './components/newslist'
import './components/newslist/newslist.scss'

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
    setPage(page + 1)
  }
  return (
    <div className='news_section'>
      <NewsList newsList={newsList} />
      {errmsg && <>{errmsg}</>}
      {isLoading ? <Spin tip='Loading...'/> : (
        <div className='loadmore_btn'>
          <Button onClick={loadMore}>Load more</Button>
        </div>
      )}
    </div>
  )
}
