import style from '../Stylesheets/Learning.module.css'
import SpecialText from './SpecialText';
import { ButtonComponent } from '../Components/ButtonComponent'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];
  

const Learning = () => {
  return (
    <div className={style.container}>
         {
            LearningGridArray.map((content , index) => (
                <div key={index} className={index === 0 ? `${style.firstGridBox}` : index === 3 ? `${style.fourthGridBox}` : `${style.GridBox}` && index % 2 === 0 ? `${style.even}` : `${style.odd}`}>
                    <p className={index === 0 ? `${style.title}` :`${style.heading}`}> {content.heading} <SpecialText text={content.highlightText} /></p>
                    <p className={style.description}> {content.description} </p>
                    <div className={style.btn}>
                        {
                            content.BtnText ? <ButtonComponent active={true} path={content.BtnLink} text={content.BtnText} /> : ''
                        }
                    </div>
                </div>
            ))
         }
    </div>
  )
}

export default Learning