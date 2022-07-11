import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';

export default function CountrySearch() {
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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
  const handleSearch = useCallback(_debounce((value) => {
    if(value === '') {
      setIsLoading(false)
    } else {
      setIsLoading(true)
    }
    let result = searchResult(value)
    setOptions([...result])
  }, 2000),[options]);
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
              loading={isLoading ? true : false}
            />  
          </Col>
        </Row>
    </div>
  )
}
