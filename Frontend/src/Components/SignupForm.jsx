import { useState } from 'react'
import style from '../Stylesheets/SignupForm.module.css'
import countryCodeData from '../data/countryCode.json'
import { auth } from '../Services/apis'
import { apiConnector } from '../Services/apiConnector'

const SignupForm = () => {

    const [signupData , setsignupData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        countryCode:'',
        mobileNumber:'',
        password:'',
        confirmPassword:''
    })
    
    function changeHandler(event) {
        setsignupData({
          ...signupData,
          [event.target.name]:event.target.value
        })
    }

    function submitHandler(event) {
        event.preventDefault();
        apiConnector('POST' , auth.SIGNUP_URL , signupData)
        
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.nameSection}>
                    <div>
                        <label htmlFor='firstName'>First Name<span className={style.astrick}>*</span></label>
                        <input 
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            value={signupData.firstName}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>   
                        <label htmlFor='lastName'>Last Name<span className={style.astrick}>*</span></label>
                        <input 
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            value={signupData.lastName}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                
                <div className={style.emailSection}>
                    <label htmlFor='Email'>Email Address<span className={style.astrick}>*</span></label>
                    <input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='email'
                        value={signupData.email}
                        onChange={changeHandler}
                    />
                </div>

                <div className={style.phoneNoSection}>  
                    <div>
                        <label htmlFor='countryCode'>Phone Address<span className={style.astrick}>*</span></label>
                    </div> 

                    <div >
                        <select 
                            className={style.phoneInput}
                            name='countryCode'
                            id='countryCode'
                            placeholder='+91'
                            onChange={changeHandler}
                            value={signupData.countryCode}
                        >
                            {
                                countryCodeData.map((country , index) => (
                                    <option 
                                        key={index} 
                                        placeholder='+91'
                                        value={country.code}

                                    >
                                        {`${country.code}`} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {`${country.country}`}
                                    </option>
                                ))
                            }
                        </select>
                        <input 
                            type='tel'
                            name='mobileNumber'
                            id='mobileNumber'
                            placeholder='12345 67890'
                            onChange={changeHandler}
                            value={signupData.mobileNumber}
                        />
                    </div>

                    <div className={style.passwordSection}>
                        <div>
                            <label htmlFor='password'>Password<span className={style.astrick}>*</span></label>
                            <input 
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Enter password'
                                value={signupData.password}
                                onChange={changeHandler}
                                className={style.input1}

                            />
                        </div>
                        <div>   
                            <label htmlFor='confirmPassword'>Confirm Password<span className={style.astrick}>*</span></label>
                            <input 
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                value={signupData.confirmPassword}
                                onChange={changeHandler}
                                className={style.input2}
                            />
                        </div>
                    </div>
                </div>
                
                <button className={style.signupBtn}>Create Account</button>
            </form>
        </div>
    )
}

export default SignupForm
