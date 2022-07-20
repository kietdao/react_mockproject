import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import i18n from 'i18next'

export default function CountrySearch() {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const countriesData = useSelector(state => state.countries?.countryList)
  const data = JSON.parse(JSON.stringify(countriesData))
  const renderItem = (flag, countryName, key, iso3) => ({
    value: countryName,
    label: (
      <div className='search_country_options' key={key}>
        <Link to={`/countries/${iso3}`} value={countryName}>
          <img className='country_flag' src={flag}/>
          <div className='country_name'>{countryName}</div>
        </Link>
      </div>
    )
  });
  const countryOptions = options.length === 0 ? (data && data.map(option => {
    return renderItem(option.flag, option.countryName, option.id, option.iso3)
  })) : (options && options.map(option => {
    return renderItem(option.flag, option.countryName, option.id, option.iso3)
  }))
  const searchResult = (inputSearch) => {
    let inputFormatted = inputSearch?.charAt(0).toUpperCase() + inputSearch?.slice(1)
    const result = data && data.filter(item => {
      return item?.countryName.includes(inputFormatted)
    })
    return result !== null ? result : []
  }
  const handleSearch = (value) => {
    if(value === '') {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
    let result = searchResult(value)
    setOptions([...result])
  }
  return (
    <div className='search_country'>
        <h2>{i18n.t('searchCountry')}</h2>
        <Row gutter={16}>
          <Col span={24}>
            <AutoComplete
              options={countryOptions}
              style={{
                width: `100%`,
              }}
              onSearch={handleSearch}
              placeholder={`${i18n.t('enterCountry')}...`}
              loading={isLoading ? true : false}
            />  
          </Col>
        </Row>
    </div>
  )
}
