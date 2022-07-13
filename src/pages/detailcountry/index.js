import { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom'
import OverView from '../../components/overview';
import LineChartDetail from '../../components/linechartdetail';
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
  }, [])
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
            <Col lg={12} sm={24} xs={24}><OverView data={countryData}/></Col>
            <Col lg={12} sm={24} xs={24}><LineChartDetail data={historicalData}/></Col>
        </Row>
        <Row gutter={16}>
            <Col lg={12} sm={24} xs={24}></Col>
            <Col lg={12} sm={24} xs={24}></Col>
        </Row>
      </div>  
    </div>
  )
}
