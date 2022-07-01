import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AutoComplete } from 'antd';
import { useSelector } from 'react-redux';
import './countrysearch.scss'

export default function CountrySearch() {
  const [options, setOptions] = useState([])
  const countriesData = useSelector(state => state.countries?.countryList)
  const data = JSON.parse(JSON.stringify(countriesData))
  const renderItem = (flag, countryName, key) => ({
    value: countryName,
    label: (
      <div className='search_country_options' key={key}>
        <Link to={`/countries/${countryName}`}>
          <img className='country_flag' src={flag}/>
          <div className='country_name'>{countryName}</div>
        </Link>
      </div>
    )
  });
  const countryOptions = data && data.map(option => {
    return renderItem(option.flag, option.countryName, option.id)
  })
  const handleSearch = (value) => {
    console.log(value)
  };
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
              filterOption={(inputValue, option) =>
                {console.log(option.countryName)
                console.log(inputValue)}
              }
            />  
          </Col>
        </Row>
    </div>
  )
}
