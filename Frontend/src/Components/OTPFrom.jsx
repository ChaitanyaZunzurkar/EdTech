import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signup } from '../Services/Operations/authAPI'
import { useNavigate } from "react-router-dom"
import style from '../Stylesheets/OTPForm.module.css'

const OTPFrom = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signupData = useSelector((state) => state.auth.signupData)
    const [otpData , setOTPData] = useState({
        first:'',
        second:'',
        third:'',
        fourth:'',
        fifth:'',
        sixth:''
    })
    function changeHandler(event) {
        setOTPData({
            ...otpData,
            [event.target.name]: event.target.value
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        const OTP = Number(otpData.first + otpData.second + otpData.third + otpData.fourth + otpData.fifth + otpData.sixth);

        dispatch(signup(
            signupData.firstName, 
            signupData.lastName, 
            signupData.email, 
            signupData.password, 
            signupData.confirmPassword, 
            signupData.accountType, 
            signupData.contactNumber, 
            OTP , 
            navigate
        ))

        setOTPData({
            first:'',
            second:'',
            third:'',
            fourth:'',
            fifth:'',
            sixth:''
        })
    }

    return (
        <form onSubmit={submitHandler} className={style.container}>
            <div className={style.inputContainer}>

            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.first}
                name='first'
                placeholder="-"
                />
            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.second}
                name='second'
                placeholder="-"
                />
            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.third}
                name='third'
                placeholder="-"
                />
            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.fourth}
                name='fourth'
                placeholder="-"
                />
            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.fifth}
                name='fifth'
                placeholder="-"
            />
            <input 
                type="text"
                onChange={changeHandler}
                value={otpData.sixth}
                name='sixth'
                placeholder="-"
            />
            </div>
        <div>
            <button type="submit" className={style.submitButton}>
                Verify Email
            </button>
        </div>
        </form>
  )
}

export default OTPFrom