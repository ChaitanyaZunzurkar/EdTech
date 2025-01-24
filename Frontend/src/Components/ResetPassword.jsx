import { useNavigate } from 'react-router-dom';
import styles from '../Stylesheets/VerificationLayout.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getResetPassowordToken } from '../Services/Operations/authAPI';



const ResetPassword = () => {
    const navigate = useNavigate()
    const [mailSend , setMailSend] = useState(false)
    const [email , setEmail] = useState("")
    const dispatch = useDispatch()

    function changeHandler(event) {
        setEmail(event.target.value)
    }

    function submitHandler(event) {
        event.preventDefault()
        dispatch(getResetPassowordToken(email , setMailSend))
    }

    return (
        <div className={styles.container}>
            {/* Loading required */}
            {
                mailSend ? 
                <h2 className={styles.title}> Check email </h2> :
                <h2 className={styles.title}> Reset your password </h2>
                 
            }

            {
                mailSend ? 
                <p className={styles.description}>{`We have sent the reset email to ${email}`}</p>  :
                <p className={styles.description}>Have no fear. We will email you instructions to reset your password. If you dont have access to your email we can try account recovery</p> 
            }
        
            <form onSubmit={submitHandler} className={styles.form}>
                {
                    mailSend ?
                    ( 
                        <div className={styles.resendDiv}>
                            <button className={styles.resend}>Resend Mail</button>                           
                        </div>
                    ) : 
                    (
                        <div>
                            <label htmlFor='Email'>Email Address<span className={styles.astrick}>*</span></label>
                            <input 
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={changeHandler}
                                required
                            />
                            <button className={styles.resetBtn}>Reset Password</button>
                        </div>
                    )
                }
            </form>

            <div className={styles.buttonContainer}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <IoIosArrowRoundBack size={30} style={{color:"#F1F2FF"}}/> Back to Login
                </button>
            </div>
        </div>
    );
};

export default ResetPassword
