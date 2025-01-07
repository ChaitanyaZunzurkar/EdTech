import style from '../Stylesheets/Instrcutor.module.css'
import instrcutor from '../assets/Instructor.png'
import SpecialText from './SpecialText'
import { ButtonComponent } from '../Components/ButtonComponent'
import { FaArrowRight } from 'react-icons/fa';

const Instrcutor = () => {
  return (
    <div className={style.container}>
        <div className={style.img}>
            <img src={instrcutor} alt='Instrcutor' />
        </div>
        <div className={style.content}>
            <div className={style.title}>
                <b>Become an </b> {' '}
                <SpecialText text={`instructor`} />
            </div>
            <div className={style.para}>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </div>

            <ButtonComponent active={true} path={'/signup'} text={'Start Teaching Today'}  >
                <FaArrowRight className={style.arrow}/>
            </ButtonComponent>
        </div>
    </div>
  )
}

export default Instrcutor