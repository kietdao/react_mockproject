import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Header from "./components/header"
import Home from './pages/home'
import News from './pages/news'
import Login from './pages/login'
import Register from './pages/register'
import DetailCountry from './pages/detailcountry';
import { setCountrylist, setAllData, setChartData } from './features/countries/countriesSlice';
import 'antd/dist/antd.css'
import './App.scss';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function getTotalData() {
      try {
        const allData = await axios.get('https://disease.sh/v3/covid-19/all')
        const allInfo = {
          confirmed: allData?.data?.cases,
          recovered: allData?.data?.recovered,
          deaths: allData?.data?.deaths
        }
        dispatch(setAllData(allInfo))
      } catch(err) {
        console.log(err)
      }
    }
    getTotalData()
  }, [])

  useEffect(() => {
    async function getChartData() {
      try {
        const chartData = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        dispatch(setChartData(chartData))
      } catch(err) {
        console.log(err)
      }
    }
    getChartData()
  }, [])

  useEffect(() => {
    async function getCountriesList() {
      try {
        const countriesData = await getCountriesListData()
        const countriesList = countriesData.data.map((country, index) => {
          return {
            id: country.countryInfo._id,
            iso3: country.countryInfo.iso3,
            flag: country.countryInfo?.flag,
            countryName: country?.country,
            confirmed: country?.cases,
            recovered: country?.recovered,
            deaths: country?.deaths
          }
        })
        dispatch(setCountrylist(countriesList))
      } catch(err) {
        console.log(err)
      }
    }
    getCountriesList()
  }, [])

  const getCountriesListData = () => {
    return axios.get('https://disease.sh/v3/covid-19/countries')
  }

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route exact path='/news' element={<News />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route path='/countries/:countryname' element={<DetailCountry />}/>
      </Routes>
    </div>
  );
}

export default App;
