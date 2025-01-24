import style from '../Stylesheets/VerificationLayout.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { ResetPassword } from '../Services/Operations/authAPI';
import { useState } from 'react';

const UpdatePassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [mailSend , setMailSend] = useState(false)
    const [email , setEmail] = useState('')
    const [updatePasswordData , setUpdatePasswordData] = useState({
        password:'',
        confirmPassword:''
    })

    const token = location.pathname.split('/').at(-1)
    const { password , confirmPassword } = updatePasswordData

    function changeHandler(event) {
        setUpdatePasswordData({
            ...updatePasswordData,
            [event.target.name] : event.target.value
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        dispatch(ResetPassword(password , confirmPassword , token , setMailSend , setEmail))
    }

    return (
        <div className={style.container}>
            {/* Loading required */}
            {
                mailSend ?
                <h2 className={style.title}> Reset complete! </h2> :
                <h2 className={style.title}> Choose new password </h2> 
            }

            {
                mailSend ?
                <p className={style.description}>{`All done! We have sent an email to ${email} to confirm`}</p> :
                <p className={style.description}>Almost done. Enter your new password and your all set.</p>
                
            }

            <form onSubmit={submitHandler} className={style.form}>
                {
                    mailSend ?
                    (
                        <div className={style.resendDiv}>
                            <button className={style.resend} onClick={() => navigate('/login')} type='button'>Return to login</button>
                        </div>
                    ) :
                    (
                        <div>
                            <label htmlFor='Email'>New password<span className={style.astrick}>*</span></label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                placeholder='******'
                                value={updatePasswordData.password}
                                onChange={changeHandler}
                                required
                            />
                            <label htmlFor='Email'>Confirm new password<span className={style.astrick}>*</span></label>
                            <input
                                type='password'
                                name='confirmPassword'
                                id='confirmPassword'
                                placeholder='******'
                                value={updatePasswordData.confirmPassword}
                                onChange={changeHandler}
                                required
                            />
                            <button className={style.resetBtn}>Reset Password</button>
                        </div>
                    )
                }
            </form>

            <div className={style.buttonContainer}>
                <button className={style.backButton} onClick={() => navigate(-1)}>
                    <IoIosArrowRoundBack size={30} style={{ color: "#F1F2FF" }} /> Back to Login
                </button>
            </div>
        </div>
    );
}

export default UpdatePassword