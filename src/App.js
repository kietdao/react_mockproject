import { useEffect, useState } from 'react';
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
import AuthRoute from './components/authroute'
import PrivateRoute from './components/privateroute'
import { Spin } from 'antd';
import 'antd/dist/antd.css'
import './App.scss';
localStorage.setItem('users', JSON.stringify([{username: 'admin', password: 'admin'}]))
function App() {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState('en')
  const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        dispatch(setAllData(allInfo))
      } catch(err) {
        console.log(err)
      }
    }
    getTotalData()
    async function getChartData() {
      try {
        const chartData = await axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
        dispatch(setChartData(chartData))
      } catch(err) {
        console.log(err)
      }
    }
    getChartData()
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
        setIsLoading(false)
      } catch(err) {
        console.log(err)
      }
    }
    getCountriesList()
  }, [])
  const getCountriesListData = () => {
    return axios.get('https://disease.sh/v3/covid-19/countries')
  }
  const getTheme = (theme) => {
    setTheme(theme)
  }
  const getLanguage = (language) => {
    setLanguage(language)
  }
  return (
    <div className={theme === 'dark' ? 'App_theme-dark' : 'App'}>
      {isLoading === true && (
        <div className='loading_global'>
          <Spin tip='Loading data...' /> 
        </div>
      )}
      <Header getTheme={getTheme} getLanguage={getLanguage}/>
      <Routes>
        <Route exact path='/' element={
          <PrivateRoute>
            <Home language={language}/>
          </PrivateRoute>
        }/>
        <Route exact path='countries/:iso3' element={
          <PrivateRoute>
            <DetailCountry />
          </PrivateRoute>
        } />
        <Route exact path='/news' element={<News />}/>
        <Route exact path='/login' element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }/>
        <Route exact path='/register' element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }/>
        <Route path='/countries/:countryname' element={<DetailCountry />}/>
      </Routes>
    </div>
  );
}

export default App;
