import React from 'react'
import { Col, Row } from 'antd';
import CountryList from '../../components/countrylist'
import OverView from '../../components/overview'
import LineChart from '../../components/linechart'
import WorldMap from '../../components/worldmap'
import './home.scss'

export default function Home() {
  return (
    <div className='home_page'>
      <div className='home_container'>
        <Row gutter={16}>
           <Col span={12}><CountryList /></Col>
           <Col span={12}> <OverView /></Col>
        </Row>
        <Row gutter={16}>
           <Col span={12}><LineChart /></Col>
           <Col span={12}><WorldMap /></Col>
        </Row>
      </div>
    </div>
  )
}
