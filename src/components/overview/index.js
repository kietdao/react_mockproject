import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row } from 'antd';

export default function OverView(props) {
  let data = useSelector(state => state.countries.allData)
  if(props?.data) {
    data = {
      flag: props?.data?.countryInfo?.flag,
      countryName: props?.data?.country,
      confirmed: props?.data?.cases,
      recovered: props?.data?.recovered,
      deaths: props?.data?.deaths,
      todayConfirmed: props?.data?.todayCases,
      todayRecovered: props?.data?.todayRecovered,
      todayDeaths: props?.data?.todayDeaths
    }
  }
  return (
    <div className='overview'>
      <h2>
        {data?.flag && <img src={data?.flag} className='overview_flag'/>}
        {data?.countryName} Overview
      </h2>
      <div className='overview_detail'>
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
    </div>
  )
}
