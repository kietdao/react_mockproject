import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Pagination } from 'antd';
import i18n from "i18next";

export default function CountryList() {
  const data = useSelector(state => state.countries.countryList)
  const columns = [
    {
      title: i18n.t('country'),
      key: 'country',
      render: ({flag, countryName, iso3}) => (
        <Link to={`countries/${iso3}`}>
          <img src={flag} className='country_flag'/>
          <span className='country_name'>{countryName}</span>
        </Link>
      ),
    },
    {
      title: i18n.t('confirmed'),
      dataIndex: 'confirmed',
      key: 'confirmed',
      sorter: {
        compare: (a, b) => a.confirmed - b.confirmed,
      },
    },
    {
      title: i18n.t('recovered'),
      dataIndex: 'recovered',
      key: 'recovered',
      sorter: {
        compare: (a, b) => a.recovered - b.recovered,
      },
    },
    {
      title: i18n.t('deaths'),
      dataIndex: 'deaths',
      key: 'deaths',
      sorter: {
        compare: (a, b) => a.deaths - b.deaths,
      },
    },
  ];
  return (
    <div className='country_list'>
      <h2>{i18n.t('countryEffected')}</h2>
      <Table loading={data ? false : true} rowKey={record => record.id} columns={columns} dataSource={data} pagination={
        {
          showSizeChanger: false
        }
      } />
    </div>
  )
}
