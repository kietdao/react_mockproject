import {useState} from 'react'
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
  const navigate = useNavigate()
  const changeLanguages = () => {
    i18n.changeLanguage('en')
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
            <Link to='/'>Home</Link>
          ),
        },
        {
          key: 'news',
          label: (
            <Link to='/news'>News</Link>
          ),
        },
        {
          key: 'login',
          label: (
            JSON.parse(localStorage.getItem('isLogin')) === false ? (
              <>
                <Link to='/login'>Login</Link>
              </>
            ) : (
              <a onClick={onLogout}>Logout</a>
            )
          ),
        },
        {
          key: 'register',
          label: (
            JSON.parse(localStorage.getItem('isLogin')) === false && (
              <>
                <Link to='/register'>Register</Link>
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
              checkedChildren={<WiLightning />}
              unCheckedChildren={<WiDaySunny />}
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
