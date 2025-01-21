/* eslint-disable react/prop-types */
import style from '../Stylesheets/Template.module.css'
import LoginForm from '../Components/LoginForm'
import SignupForm from '../Components/SignupForm'
import frame from '../assets/frame.png'
import { useState } from 'react'

const Template = ({ title , description , specialText , login  , img }) => {

    const [activeBtn , setActiveBtn] = useState('Student')

    function changeRole(role) {
        setActiveBtn(role)
    }


    return (
        <div className={style.container}>
            <div className={style.content}>
                <p className={style.title}><b>{ title } </b></p>
                <p className={style.description}>{ description } <span className={style.specialText}>{specialText}</span></p>

                <div className={style.btnDiv}>
                    <button 
                        className={`${style.btn} ${activeBtn === "Student" ? style.active : ""}`}
                        onClick={() => changeRole('Student')}
                    >
                        <b>Student</b>
                    </button>

                    <button 
                        className={`${style.btn} ${activeBtn !== "Student" ? style.active : ''}`}
                        onClick={() => changeRole('Instructor')}
                    >
                        <b>Instructors</b>
                    </button>
                </div>

                <div className={style.form}>
                    {
                        login ? <LoginForm /> : <SignupForm />
                    }
                </div>
            </div>

            <div className={style.imgContainer}>
                <img src={img} className={style.img} />
                <img src={frame} className={style.frame} />
            </div>
        </div>
    )
}


export default Template