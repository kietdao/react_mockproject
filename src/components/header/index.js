import React from 'react'
import { Link } from 'react-router-dom'
import i18n from "i18next";
import "../../translations/i18n";
import './header.scss'
      
export default function Header() {
  const changeLanguages = () => {
    i18n.changeLanguage('en')
  }
  return (
    <div className='header'>
      <div className='header_container'>
        <Link to='/'>
            <div className='header_logo'>
              <img />
              <div className='header_logo_name'>Corona Tracker</div>
            </div>
        </Link>
        <ul className='header_nav'>
          <li className='header_nav_item'>
            <Link to='/'>Home</Link>
          </li>
          <li className='header_nav_item'>
            <Link to='/news'>News</Link>
          </li>
          <li className='header_nav_item'>
            <Link to='/login'>Login</Link>
          </li>
          <li className='header_nav_item'>
            <Link to='/register'>Register</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
