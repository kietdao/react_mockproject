import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button, Checkbox, Form, Input } from 'antd';

export default function Login() {
  const users = JSON.parse(localStorage.getItem('users'))
  const navigate = useNavigate()
  const onLogin = (values) => {
    users.map(user => {
      if(user.username === values.username && user.password === values.password) {
        localStorage.setItem('isLogin', JSON.stringify(true))
        navigate('/')
      }
    })
  };

  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_page'>
      <div className='login_form'>
        <h2>Login</h2>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onLogin}
          onFinishFailed={onLoginFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
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
            label="Password"
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
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                span: 24,
              }}
            >
              <Checkbox>Remember me</Checkbox>
              <span className='login_registerlink'>Don't have account? <Link to='/register'>Click here</Link> to register</span>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 24,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </div>  
        </Form>
      </div>
    </div>
  )
}
