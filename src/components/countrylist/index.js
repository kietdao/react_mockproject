import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'antd';
import './countrylist.scss'


export default function CountryList() {
  const data = useSelector(state => state.countries.countryList)

  const columns = [
    {
      title: 'Country',
      key: 'country',
      render: ({flag, countryName}) => (
        <Link to={`countries/${countryName}`}>
          <img src={flag} className='country_flag'/>
          <span className='country_name'></span>{countryName}
        </Link>
      ),
    },
    {
      title: 'Confirmed',
      dataIndex: 'confirmed',
      key: 'confirmed',
    },
    {
      title: 'Recovered',
      dataIndex: 'recovered',
      key: 'recovered',
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      key: 'deaths',
    },
  ];
  return (
    <div className='country_list'>
      <h2>Countries Effected</h2>
      <Table rowKey={record => record.id} columns={columns} dataSource={data} showSizeChanger={false} />
    </div>
  )
}
