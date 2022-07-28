import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { message } from 'antd';
import { Button, Form, Input } from 'antd';
import i18n from 'i18next'

export default function Login() {
  const users = JSON.parse(localStorage.getItem('users'))
  const navigate = useNavigate()
  const onLogin = (values) => {
    users.forEach(user => {
      if(user.username === values.username && user.password === values.password) {
        localStorage.setItem('isLogin', JSON.stringify(true))
        msgSuccess()
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } 
    })
  };

  const msgSuccess = () => {
    message.success(i18n.t('loginSuccess'))
  }
  return (
    <div className='login_page'>
      <div className='login_container'>
        <div className='login_form'>
          <h2>{i18n.t('login')}</h2>
          <Form
            name="basic"
            labelCol={{
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }}
            wrapperCol={{
              lg: 24,
              md: 24,
              sm: 24,
              xs: 24,
            }}
            onFinish={onLogin}
            autoComplete="off"
          >
            <Form.Item
              label={`${i18n.t('username')}`}
              name="username"
              rules={[
                {
                  required: true,
                  message: i18n.t('inputUsername'),
                },
                {
                  validator: async (_, username) => {
                    if (username && users.every(user => user.username !== username)) {
                      return Promise.reject(new Error(i18n.t('usernameNotAvailable')));
                    }
                  },
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${i18n.t('password')}`}
              name="password"
              rules={[
                {
                  required: true,
                  message: i18n.t('inputPassword'),
                },
                ({ getFieldValue }) => ({
                  validator: async (_, password) => {
                    if(password && users.find(user => user.username === getFieldValue('username')).password !== password) {
                      return Promise.reject(new Error(i18n.t('passwordWrong')));
                    }
                  },
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <div className='login_actions'>
              <Form.Item
                wrapperCol={{
                  lg: 24,
                }}
              >
                <span className='login_registerlink'>{i18n.t('dontHaveAcc')}? <Link to='/register'>Click {i18n.t('here')}</Link> {i18n.t('to')} {i18n.t('register')}</span>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  lg: 24,
                }}
              >
                <Button type="primary" htmlType="submit">
                  {i18n.t('login')}
                </Button>
              </Form.Item>
            </div>  
          </Form>
        </div>
      </div>
    </div>
  )
}
