/* eslint-disable react/prop-types */
import { useState } from 'react'
import style from '../Stylesheets/ContactForm.module.css'
import countryCode from '../data/countryCode.json'
import { toast } from 'react-hot-toast'

const ContactForm = ({title , description}) => {
    const [contactData , setContactData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        mobileNumber: "",
        message:""
    })

    function changeHandler(event) {
        setContactData({
          ...contactData,
          [event.target.name]:event.target.value
        })
    }

    function submitHandler(event) {
        event.preventDefault()
        if(contactData.mobileNumber.length < 10) {
            toast.error("Invalid mobile number.")
        }
        console.log(contactData)
    }

    return (
        <div className={style.container}>
            <p className={style.title}><b>{ title }</b></p>
            <p className={style.desc}>{ description }</p>
            <form className={style.form} onSubmit={submitHandler}>
                    <div className={style.AboutPage_contact_form_nameSection}>
                        <div>
                            <label htmlFor='firstName'>First Name<span className={style.astrick}>*</span></label>
                            <input 
                                type='text'
                                required
                                name='firstName'
                                id='firstName'
                                placeholder='Enter first name'
                                value={contactData.firstName}
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
                            value={contactData.lastName}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                </div>
                
                <div className={style.AboutPage_contact_form_emailContainer}>
                    <div className={style.AboutPage_contact_form_emailSection}>
                        <label htmlFor='Email'>Email Address<span className={style.astrick}>*</span></label>
                        <input 
                            type='email'
                            name='email'
                            id='email'
                            placeholder='email'
                            value={contactData.email}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                </div>

                <div className={style.AboutPage_contact_form_numberContainer}>
                    <div className={style.AboutPage_contact_form_phoneNoSection}>  
                        <div>
                            <label htmlFor='countryCode'>Phone Address<span className={style.astrick}>*</span></label>
                        </div> 

                        <div className={style.mobileNumberInputContainer}>
                            <select 
                                className={style.phoneInput}
                                name='countryCode'
                                id='countryCode'
                                placeholder='+91'
                                onChange={changeHandler}
                                value={contactData.countryCode}
                                required
                                >
                                {
                                    countryCode.map((country , index) => (
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
                                value={contactData.mobileNumber}
                                className={style.numberInput}
                                required
                            />
                        </div>
                    </div>

                    </div>

                    <div className={style.AboutPage_contact_form_messageContainer}>

                    <div className={style.AboutPage_contact_form_message}>
                        <label htmlFor='message'>Message<span className={style.astrick}>*</span></label>
                        <textarea
                            id="message"
                            className={style.textarea}
                            name="message"
                            rows="5"
                            cols="30"
                            placeholder="Type your message here..."
                            value={contactData.message}
                            onChange={changeHandler}
                        ></textarea>
                    </div>                
                </div>
                <button className={style.AboutPage_contact_form_sendBtn}>Send Message</button>
            </form>
    </div>
  )
}

export default ContactForm