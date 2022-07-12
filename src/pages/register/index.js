import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { message } from 'antd';
import * as Yup from 'yup';

export default function Register() {
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('users')))
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(6, 'Username should be of minimum 6 characters!')
      .max(50, 'Username should be of maximum 50 characters!')
      .required('Username is required!')
      .test('username', 'This username has been used, please choose another username!', (username) => {
        let result
        result = userList.some(user => username === user.username)
        return !result
      }),
    password: Yup.string()
      .min(6, 'Password should be of minimum 6 characters!')
      .max(50, 'Password should be of maximum 50 characters!')
      .required('Password is required'),
  });
  const handleSubmit = (values) => {
    const newUser = {
      username: values.userName,
      password: values.password
    }
    const newUserList = [...userList,newUser]
    localStorage.setItem('users', JSON.stringify(newUserList))
    setUserList(newUserList)
    msgSuccess()
  }
  const msgSuccess = () => {
    message.success('Register Success!')
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  return (
    <div className='register_page'>
      <div className='form_register'>
        <h2>Register</h2>
          <Formik
          initialValues={{
            userName: '',
            password: ''
          }}
          validationSchema={SignupSchema}
          validateOnChange={false}
          onSubmit={handleSubmit}
          >
          {({ errors, touched }) => (
            <Form>
              <div className='form_group'>
                <Field name="userName" placeholder='Enter your username here...'/>
                {errors.userName && touched.userName ? (
                  <div className='form_msg'>*{errors.userName}</div>
                ) : null}
              </div>
              <div className='form_group'>
                <Field name="password" type='password' placeholder='Please enter your password...'/>
                {errors.password && touched.password ? (
                  <div className='form_msg'>*{errors.password}</div>
                ) : null}
              </div>
              <button type="submit" className='btn'>Submit</button>
            </Form>
          )}
          </Formik>
      </div>
    </div>
  )
}
