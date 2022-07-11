import React from 'react'
import { Col, Row } from 'antd';
import CountryList from '../../components/countrylist'
import OverView from '../../components/overview'
import DataChart from '../../components/linechart'
import WorldMap from '../../components/worldmap'
import CountrySearch from '../../components/countrysearch'

export default function Home() {
  return (
    <div className='home_page'>
      <div className='home_container'>
        <Row gutter={16}>
            <Col lg={12} sm={24} xs={24}><CountryList /></Col>
            <Col lg={12}> 
              <CountrySearch />
              <OverView />
              <DataChart />
            </Col>
        </Row>
        <Row gutter={16}>
            <Col lg={24} sm={24}><WorldMap /></Col>
        </Row>
      </div>
    </div>
  )
}
