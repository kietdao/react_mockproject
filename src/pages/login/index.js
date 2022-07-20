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
    users.map(user => {
      if(user.username === values.username && user.password === values.password) {
        localStorage.setItem('isLogin', JSON.stringify(true))
        msgSuccess('Login Success!')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      } 
    })
  };

  const msgSuccess = () => {
    message.success('Login Success!')
  }
  const msgError = (field) => {
    message.error(`${field} is wrong!`)
  }
  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='login_page'>
      <div className='login_container'>
        <div className='login_form'>
          <h2>{i18n.t('login')}</h2>
          <Form
            name="basic"
            labelCol={{
              lg: 3,
              md: 3,
              sm: 0,
              xs: 0,
            }}
            wrapperCol={{
              lg: 22,
              md: 21,
              sm: 24,
              xs: 24,
            }}
            initialValues={{
              remember: true,
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
                  message: 'Please input your username!',
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
                  message: 'Please input your password!',
                },
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
                <span className='login_registerlink'>Don't have account? <Link to='/register'>Click here</Link> to register</span>
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
