import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'antd';

export default function OverView() {
  const data = useSelector(state => state.countries.allData)
  return (
    <div className='overview'>
      <h2>Overview</h2>
      <Row gutter={16}>
        <Col lg={8} sm={24} className='overview_item red'>
          <h4 className='overview_title'>Cases</h4>
          <span className='overview_data'>{data?.confirmed.toLocaleString('en-US')}</span>
        </Col>
        <Col lg={8} sm={24} className='overview_item green'>
          <h4 className='overview_title'>Recovered</h4>
          <span className='overview_data'>{data?.recovered.toLocaleString('en-US')}</span>
        </Col>
        <Col lg={8} sm={24} className='overview_item gray'>
          <h4 className='overview_title'>Deaths</h4>
          <span className='overview_data'>{data?.deaths.toLocaleString('en-US')}</span>
        </Col>
      </Row>
    </div>
  )
}
