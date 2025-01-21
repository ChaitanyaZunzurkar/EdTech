import { useState } from 'react'
import style from '../Stylesheets/LoginForm.module.css'
import { apiConnector } from '../Services/apiConnector'
import { auth } from '../Services/apis'

const LoginForm = () => {
  const [loginData , setLoginData] = useState({
    email:'',
    password:''
  })

  function changeHandler(event) {
    setLoginData({
      ...loginData,
      [event.target.name]:event.target.value
    })
  }

  function submitHandler(event) {
    event.preventDefault();
    apiConnector('POST' , auth.SIGNIN_URL , loginData)
    setLoginData({email:'' , password:''})
  }

  return (
    <div className={style.container}>
        <form className={style.form} onSubmit={submitHandler}>
            <label htmlFor='Email'>Email Address<span className={style.astrick}>*</span></label>
            <input 
                type='email'
                name='email'
                id='email'
                placeholder='Enter Email'
                value={loginData.email}
                onChange={changeHandler}
            />

            <label htmlFor='password'>Password<span className={style.astrick}>*</span></label>
            <input 
                type='password'
                name='password'
                id='password'
                placeholder='Enter password'
                value={loginData.password}
                onChange={changeHandler}
            />

            <button className={style.loginBtn}><b>Sign in</b></button>
        </form>
    </div>
  )
}

export default LoginForm