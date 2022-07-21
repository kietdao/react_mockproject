import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import { message } from 'antd';
import * as Yup from 'yup';
import i18n from 'i18next'

export default function Register() {
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem('users')))
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({
    userName: Yup.string()
      .min(6, i18n.t('usernameMin'))
      .max(50, i18n.t('usernameMax'))
      .required(i18n.t('usernameRequired'))
      .test('username', i18n.t('usernameBeenUsed'), (username) => {
        let result
        result = userList.some(user => username === user.username)
        return !result
      }),
    password: Yup.string()
      .min(6, i18n.t('passwordMin'))
      .max(50, i18n.t('passwordMax'))
      .required(i18n.t('passwordRequired')),
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
    message.success(i18n.t('registerSuccess'))
    setTimeout(() => {
      navigate('/login')
    }, 2000)
  }
  return (
    <div className='register_page'>
      <div className='register_container'>
        <div className='form_register'>
          <h2>{i18n.t('register')}</h2>
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
                  <Field name="userName" placeholder={`${i18n.t('enterUsername')}...`}/>
                  {errors.userName && touched.userName ? (
                    <div className='form_msg'>*{errors.userName}</div>
                  ) : null}
                </div>
                <div className='form_group'>
                  <Field name="password" type='password' placeholder={`${i18n.t('enterPassword')}...`}/>
                  {errors.password && touched.password ? (
                    <div className='form_msg'>*{errors.password}</div>
                  ) : null}
                </div>
                <button type="submit" className='btn'>{i18n.t('register')}</button>
              </Form>
            )}
            </Formik>
        </div>
      </div>
    
    </div>
  )
}
