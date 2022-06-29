import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios';
import Header from "./components/header"
import Home from './pages/home'
import News from './pages/news'
import Login from './pages/login'
import Register from './pages/register'
import { setCountrylist } from './features/countries/countriesSlice';
import 'antd/dist/antd.css'
import './App.scss';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function getCountriesList() {
      try {
        const response = await getCountriesListData()
        const countriesList = response.data.map((country, index) => {
          return {
            id: country.countryInfo._id,
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
      </Routes>
    </div>
  );
}

export default App;
