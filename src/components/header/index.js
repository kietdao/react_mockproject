import {useState} from 'react'
import { Link } from 'react-router-dom'
import i18n from "i18next";
import { useNavigate } from 'react-router';
import { Switch } from 'antd';
import "../../translations/i18n";
      
export default function Header(props) {
  const [theme, setTheme] = useState('dark')
  const navigate = useNavigate()
  const changeLanguages = () => {
    i18n.changeLanguage('en')
  }
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light')
    props?.getTheme(theme)
  }
  const onLogout = () => {
    localStorage.setItem('isLogin', JSON.stringify(false))
    navigate('/news')
  }
  return (
    <div className='header'>
      <div className={theme === 'dark' ? 'header_container-dark' : 'header_container'}>
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
          {JSON.parse(localStorage.getItem('isLogin')) === false ? (
            <>
              <li className='header_nav_item'>
                <Link to='/login'>Login</Link>
              </li>
              <li className='header_nav_item'>
                <Link to='/register'>Register</Link>
              </li>
            </>
          ) : (
            <li className='header_nav_item'>
              <a onClick={onLogout}>Logout</a>
            </li>
          )}
          <li className='header_nav_item'>
            <Switch
              checked={theme === 'dark'}
              onChange={changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              defaultChecked
            />
          </li>
        </ul>
      </div>
    </div>
  )
}
