import style from '../Stylesheets/About.module.css'
import SpecialText from '../Components/SpecialText'
import aboutImg1 from '../assets/aboutus1.webp'
import aboutImg2 from '../assets/aboutus2.webp'
import aboutImg3 from '../assets/aboutus3.webp'
import foundaryStoreImg from '../assets/FoundingStory.png'
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import Learning from './Learning'
import ContactForm from '../Components/ContactForm'

const stats = [
    {
        title:"Active Student",
        number:'5K'
    },
    {
        title:"Mentors",
        number:'10+'
    },
    {
        title:"Courses",
        number:'200+'
    },
    {
        title:"Awards",
        number:'50+'
    },
]

const About = () => {
  return (
    <div className={style.container}>
        <section className={style.section1}>
            <p className={style.about}>About us</p>
            <p className={style.title}>Driving Innovation in Online Education for a <SpecialText text={'Brighter Future'} /> </p>
            <p className={style.description}>Studynotion is at the forefront of driving innovation in online education. We are passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

            <div className={style.imgContainer}>
                <img src={aboutImg1} alt='about img 1'/>
                <img src={aboutImg2} alt='about img 2'/>
                <img src={aboutImg3} alt='about img 3'/>
            </div>
        </section>

        <section className={style.section2}>
            <p className={style.para}>
                <RiDoubleQuotesL color='#424854'/> We are passionate about revolutionizing the way we learn. Our innovative platform  <SpecialText text={' combines technology'} />, <span className={style.expert}><b>expertise</b></span> , and community to create an <span className={style.education}><b>unparalleled educational experience.</b></span> <RiDoubleQuotesR color='#424854'/>
            </p>

            <div className={style.foundingStory}>
                <div className={style.content}>
                    <p className={style.title}><b>Our Founding Story</b> </p>
                    <p className={style.desc}>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className={style.desc}>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div className={style.foundingStoryImg}>
                    <div className={style.radial}></div>
                    <img src={foundaryStoreImg} />
                </div>
            </div>

            <div className={style.missionAndVision}>
                <div className={style.content1}>
                    <p className={style.title}><b>Our Vision</b></p>
                    <p className={style.desc}>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>

                <div className={style.content2}>
                    <p className={style.title}><b>Our Mission</b></p>
                    <p className={style.desc}>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>

            <div className={style.stats}>
                {
                    stats.map((stat , index) => (
                        <div key={index} className={style.statCard}>
                            <p className={style.number}><b>{ stat.number }</b></p>
                            <p className={style.title}> {stat.title} </p>
                        </div>
                    ))
                } 
            </div>
        </section>

        <section className={style.section3}>
            <Learning />
        </section>

        <section className={style.section4}>
            <ContactForm title={'Get in Touch'} description={'We would love to here for you, Please fill out this form.'}/>
        </section>
    </div>
  )
}

export default About