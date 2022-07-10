import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import './countrysearch.scss'

export default function CountrySearch() {
  const [options, setOptions] = useState([])
  const countriesData = useSelector(state => state.countries?.countryList)
  const data = JSON.parse(JSON.stringify(countriesData))
  const renderItem = (flag, countryName, key, iso3) => ({
    value: countryName,
    label: (
      <div className='search_country_options' key={key}>
        <Link to={`/countries/${iso3}`}>
          <img className='country_flag' src={flag}/>
          <div className='country_name'>{countryName}</div>
        </Link>
      </div>
    )
  });
  const countryOptions = data && data.map(option => {
    return renderItem(option.flag, option.countryName, option.id, option.iso3)
  })
  const searchResult = (inputSearch) => {
    const result = data && data.filter(option => {
      return inputSearch?.charAt(0).toUpperCase() + inputSearch?.slice(1) === option.countryName
    })
    return result
  }
  const handleSearch = useCallback(_debounce((value) => {
    const result = searchResult(value)
    result && setOptions([...result])
    console.log(options)
  }, 2000), []);
  const onSelect = (data) => {
    console.log(data);
  };
  return (
    <div className='search_country'>
        <h2>Search Country For Defails</h2>
        <Row gutter={16}>
          <Col span={24}>
            <AutoComplete
              options={countryOptions}
              style={{
                width: `100%`,
              }}
              onSelect={onSelect}
              onSearch={handleSearch}
              placeholder="Enter Country Name Here..."
            />  
          </Col>
        </Row>
    </div>
  )
}
