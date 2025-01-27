import ContactForm from '../Components/ContactForm'
import style from '../Stylesheets/ContectPage.module.css'
import { IoMdChatboxes } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

const contactData = [
    {
        contactMediumName: 'Chat on us',
        description:'Our friendly team is here to help.',
        medium:'"chaitanyazunzurkar@gmail.com" mail address.',
        icon: IoMdChatboxes
    },
    {
        contactMediumName: 'Visit us',
        description:'Come and say hello at our office HQ.',
        medium:'Here is the location/ address',
        icon: FaEarthAmericas
    },
    {
        contactMediumName: 'Call us',
        description:'Mon - Fri From 8am to 5pm',
        medium:'+123 456 7890',
        icon: IoCall
    },

]

const ContactPage = () => {
    return (
        <div className={style.container}>
            <section className={style.contactInfo}>
                {
                    contactData.map((element , index) => (
                        <div key={index} className={style.contactCard}>
                            <div className={style.icon} >
                                <element.icon size={30} />
                            </div>
                            <div className={style.info}>
                                <p className={style.title}><b> {element.contactMediumName} </b></p>
                                <p className={style.desc}> {element.description} </p>
                                <p className={style.desc}> {element.medium} </p>
                            </div>
                        </div>
                    ))
                }
                
            </section>

            <section className={style.ContactForm}> 
                <ContactForm title={'Got a Idea? We have got the skills. Let us team up'} description={'Tall us more about yourself and what you are got in mind.'} />
            </section>

        </div>
    )
}

export default ContactPage