/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import styles from '../Stylesheets/VerificationLayout.module.css';
import OTPFrom from './OTPFrom';

const VerificationLayout = ({ title, description, backButtonLabel = 'Back to Login', }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.formContainer}>
            <OTPFrom />
        </div>

        <div className={styles.buttonContainer}>
            <button className={styles.backButton} onClick={() => navigate(-1)}>
                {backButtonLabel}
            </button>
        </div>
        </div>
    );
};

export default VerificationLayout
