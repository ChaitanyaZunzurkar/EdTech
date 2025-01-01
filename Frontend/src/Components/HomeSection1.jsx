import { FaArrowRight } from 'react-icons/fa';
import SpecialText from './SpecialText';
import { ButtonComponent } from './ButtonComponent';
import style from '../Stylesheets/HomeSection1.module.css'

export const HomeSection1 = () => {
  return (
    <div className={style.container}>
        <div>
            <button className={style.instrutorBtn}>
                Become an Instructor 
                <FaArrowRight className={style.arrow}/>
            </button>
        </div>
        <div className={style.title}>
            <b>Empower Your Future With</b> {' '}
            <SpecialText text={`Coding Skills`} />
        </div>
        <div className={style.para}>
            <p>
                With our online coding course, you can learn at your own pace, from anywhere in the world and get access to the wealth of resources, including hands on projects, quizzes and personalized feedback from instructors.
            </p>
            <div className={style.btnSection}>
                <ButtonComponent active={true} path={'/signup'} text={'Learn More'} />
                <ButtonComponent active={false} path={'/signup'} text={'Book a Demo'} />
            </div>
        </div>
    </div>
  )
}
