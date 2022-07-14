import { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom'
import OverView from '../../components/overview';
import DataChart from '../../components/linechart';
import PieChart from '../../components/piechart'
import CountrySearch from '../../components/countrysearch'
import WorldMap from '../../components/worldmap'
import axios from 'axios'

export default function DetailCountry() {
  const { iso3 } = useParams()
  const [countryData, setCountryData] = useState(null)
  const [historicalData, setHistoricalData] = useState(null)
  useEffect(() => {
    async function getCountryInfo() {
      try {
        const res = await getCountryData(iso3)
        setCountryData(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    getCountryInfo()
    async function getHistoricalData() {
      try {
        const res = await getHistoricalCountry(iso3)
        setHistoricalData(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    getHistoricalData()
  }, [iso3])
  const getCountryData = (iso3) => {
    return axios.get(`https://disease.sh/v3/covid-19/countries/${iso3}`)
  }
  const getHistoricalCountry = (iso3) => {
    return axios.get(`https://disease.sh/v3/covid-19/historical/${iso3}?lastdays=all`)
  }
  return (
    <div className='country_detail'>
      <div className='country_detail_container'>
        <Row gutter={16}>
            <Col lg={12} sm={24} xs={24}>
              <CountrySearch />
              <OverView data={countryData}/>
              <div className='pie_chart'>
                <h2>Chart Of Rates</h2>
                <Row gutter={8}>
                  <Col lg={8} sm={24} xs={24}>
                    <PieChart confirmed={countryData?.casesPerOneMillion}/>
                  </Col>
                  <Col lg={8} sm={24} xs={24}>
                    <PieChart recovered={countryData?.recoveredPerOneMillion}/>
                  </Col>
                  <Col lg={8} sm={24} xs={24}>
                    <PieChart deaths={countryData?.deathsPerOneMillion}/>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col lg={12} sm={24} xs={24}>
              <DataChart data={historicalData}/>
              <WorldMap />
            </Col>
        </Row>
      </div>  
    </div>
  )
}
