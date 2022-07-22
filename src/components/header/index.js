import { useState } from 'react'
import { Link } from 'react-router-dom'
import i18n from "i18next";
import { useNavigate } from 'react-router';
import { Switch, Button, Dropdown, Menu, Space } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import "../../translations/i18n";
import { WiDaySunny, WiLightning} from "react-icons/wi";
import logo from './image/logo.png'
      
export default function Header(props) {
  const [theme, setTheme] = useState('light')
  const [language, setLanguage] = useState(`en`)
  i18n.changeLanguage(language)
  const navigate = useNavigate()
  const changeLanguages = (value) => {
    setLanguage(value ? 'en' : 'vn')
    props.getLanguage(value ? 'en' : 'vn')
  }
  const changeTheme = (value) => {
    setTheme(value ? 'dark' : 'light')
    props?.getTheme(value ? 'dark' : 'light')
  }
  const onLogout = () => {
    localStorage.setItem('isLogin', JSON.stringify(false))
    navigate('/news')
  }
  const menuMobile = (
    <Menu
      items={[
        {
          key: 'home',
          label: (
            <Link to='/'>{i18n.t('home')}</Link>
          ),
        },
        {
          key: 'news',
          label: (
            <Link to='/news'>{i18n.t('news')}</Link>
          ),
        },
        {
          key: 'login',
          label: (
            JSON.parse(localStorage.getItem('isLogin')) === false ? (
              <>
                <Link to='/login'>{i18n.t('login')}</Link>
              </>
            ) : (
              <a onClick={onLogout}>{i18n.t('logout')}</a>
            )
          ),
        },
        {
          key: 'register',
          label: (
            JSON.parse(localStorage.getItem('isLogin')) === false && (
              <>
                <Link to='/register'>{i18n.t('register')}</Link>
              </>
            ) 
          ),
        },
        {
          key: 'theme',
          label: (
            <>
                <Switch
                checked={theme === 'dark'}
                onChange={changeTheme}
                checkedChildren={<WiLightning />}
                unCheckedChildren={<WiDaySunny />}
                />
            </>
          ),
        },
        {
          key: 'language',
          label: (
            <>
              <Switch
                checked={language === 'en'}
                onChange={changeLanguages}
                checkedChildren='EN'
                unCheckedChildren='VN'
              />
            </>
          ),
        },
      ]}
    />
  );
  return (
    <div className='header'>
      <div className='header_container'>
        <Link to='/'>
            <div className='header_logo'>
              <img src={logo}/>
              <div className='header_logo_name'>Corona <span>Tracker</span></div>
            </div>
        </Link>
        <ul className='header_nav'>
          <li className='header_nav_item'>
            <Link to='/'>{i18n.t('home')}</Link>
          </li>
          <li className='header_nav_item'>
            <Link to='/news'>{i18n.t('news')}</Link>
          </li>
          {JSON.parse(localStorage.getItem('isLogin')) === false ? (
            <>
              <li className='header_nav_item'>
                <Link to='/login'>{i18n.t('login')}</Link>
              </li>
              <li className='header_nav_item'>
                <Link to='/register'>{i18n.t('register')}</Link>
              </li>
            </>
          ) : (
            <li className='header_nav_item'>
              <a onClick={onLogout}>{i18n.t('logout')}</a>
            </li>
          )}
          <li className='header_nav_item'>
            <Switch
              checked={theme === 'dark'}
              onChange={changeTheme}
              checkedChildren={<WiLightning />}
              unCheckedChildren={<WiDaySunny />}
            />
          </li>
          <li className='header_nav_item language'>
            <Switch
              checked={language === 'en'}
              onChange={changeLanguages}
              checkedChildren='EN'
              unCheckedChildren='VN'
            />
          </li>
        </ul>
        <div className='header_nav_list'>
            <Space direction='vertical'>
              <Space wrap>
              <Dropdown overlay={menuMobile} placement="bottomRight" 
                overlayStyle={{
                  width: `100%`,
                }}
              >
                <Button>
                  <UnorderedListOutlined />
                </Button>
              </Dropdown>
              </Space>
            </Space>
        </div>
      </div>
    </div>
  )
}
