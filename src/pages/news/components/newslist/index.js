import React from 'react'
import { Card } from 'antd';
import { v4 as uuidv4 } from 'uuid';
const { Meta } = Card;
export default function NewsList(props) {
  return (
    <div className='news_list'>
        {props?.newsList.map(news => {
          return (
            <div className='news_item' key={uuidv4()}>
              <Card
                hoverable
                style={{
                  width: 240,
                }}
                cover={<img alt="example" src={news?.urlToImage} />}
              >
                <Meta title={news?.title} description={news?.description} />
              </Card>
            </div>
          )
        })}
    </div>
  )
}
