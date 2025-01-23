import { useState } from 'react'
import style from '../Stylesheets/LoginForm.module.css'
import { useNavigate } from 'react-router-dom'
import { login } from '../Services/Operations/authAPI'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
  const navigate =  useNavigate()
  const dispatch = useDispatch()

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

  const { email , password } = loginData

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email , password , navigate))
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
                required
            />

            <label htmlFor='password'>Password<span className={style.astrick}>*</span></label>
            <input 
                type='password'
                name='password'
                id='password'
                placeholder='Enter password'
                value={loginData.password}
                onChange={changeHandler}
                required
                className={style.passwordInput}
            />

            <button className={style.forgotPassowordBtn} type='button' onClick={() => navigate('/reset-password')}>Fortgot password</button>
            <button className={style.loginBtn}><b>Sign in</b></button>
        </form>
    </div>
  )
}

export default LoginForm
