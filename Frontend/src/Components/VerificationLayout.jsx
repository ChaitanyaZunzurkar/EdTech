/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styles from '../Stylesheets/VerificationLayout.module.css';
import { IoIosArrowRoundBack } from "react-icons/io";
import OTPFrom from './OTPFrom';
import { CiTimer } from "react-icons/ci";

const VerificationLayout = ({ backButtonLabel = 'Back to Login', }) => {
    const navigate = useNavigate()
    
    return (
        <div className={styles.container}>
        <h2 className={styles.title}>Verify email</h2>
        <p className={styles.description}>A verification code has been sent to you. Enter the code below</p>

        <div className={styles.formContainer}>
            <OTPFrom />
        </div>

        <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                <IoIosArrowRoundBack size={30} style={{color:"#F1F2FF"}}/> {backButtonLabel}
            </button>

            <button className={styles.resendBtn}>
                <CiTimer size={20} /> Resend it
            </button>
        </div>
        </div>
    );
};

export default VerificationLayout
