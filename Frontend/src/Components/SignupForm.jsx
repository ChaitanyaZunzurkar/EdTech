/* eslint-disable react/prop-types */
import { useState } from 'react'
import style from '../Stylesheets/SignupForm.module.css'
import countryCodeData from '../data/countryCode.json'
import { otpSender} from '../Services/Operations/authAPI'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../Store/Slice/authSlice'

const SignupForm = ({ accountType }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [signupData , setsignupData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword:'',
        countryCode:'',
        mobileNumber:''
    })
    
    function changeHandler(event) {
        setsignupData({
          ...signupData,
          [event.target.name]:event.target.value
        })
    }

    const {password  , confirmPassword , countryCode , mobileNumber} = signupData

    function submitHandler(event) {
        event.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Password and confirm password should be same.")
        }
        const contactNumber = countryCode + " " + mobileNumber
        
        dispatch(
            setSignupData({
                ...signupData,
                contactNumber,
                accountType
            })
        )
        console.log(signupData)
        const email = signupData.email
        dispatch(otpSender(email , navigate))

        setsignupData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            countryCode: "",
            mobileNumber: "",
        });
        
    }

    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={submitHandler}>
                <div className={style.nameSection}>
                    <div className={style.firstName}>
                        <label htmlFor='firstName'>First Name<span className={style.astrick}>*</span></label>
                        <input 
                            type='text'
                            required
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            value={signupData.firstName}
                            onChange={changeHandler}
                            className={style.input}
                        />
                    </div>
                    <div className={style.lastName}>   
                        <label htmlFor='lastName'>Last Name<span className={style.astrick}>*</span></label>
                        <input 
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            value={signupData.lastName}
                            onChange={changeHandler}
                            required
                            className={style.input}
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
                        className={style.input}
                        required
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
                            required
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
                            className={style.input}
                            required
                        />
                    </div>

                    <div className={style.passwordSection}>
                        <div className={style.PasswordDiv}>
                            <label htmlFor='password' className={style.label}>Password<span className={style.astrick}>*</span></label>
                            <input 
                                type='password'
                                name='password'
                                id='password'
                                placeholder='Enter password'
                                value={signupData.password}
                                onChange={changeHandler}
                                className={style.input}
                                required

                            />
                        </div>
                        <div className={style.confirmPasswordDiv}>   
                            <label htmlFor='confirmPassword' >Confirm Password<span className={style.astrick}>*</span></label>
                            <input 
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='Confirm Password'
                                value={signupData.confirmPassword}
                                onChange={changeHandler}
                                className={style.input}
                                required
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
