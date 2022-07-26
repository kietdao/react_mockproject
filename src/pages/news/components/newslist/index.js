import React from 'react'
import { Card, Image} from 'antd';
import { v4 as uuidv4 } from 'uuid';
const { Meta } = Card;
export default function NewsList(props) {
  return (
    <div className='news_list'>
      {props?.newsList.map(news => {
          return (
            <div className='news_item' key={uuidv4()}>
              <a href={news.url} target='_blank'>
                <Card
                  loading={news?.urlToImage ? false : true}
                  hoverable
                  style={{
                    width: 300,
                  }}
                  cover={<Image 
                    preview={false}
                    src={news?.urlToImage}
                  />}
                >
                  <Meta title={news?.title} description={news?.description} />
                </Card>
              </a>
            </div>
          )
        })}
    </div>
  )
}
