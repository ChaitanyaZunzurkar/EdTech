import style from '../Stylesheets/Learninglanguage.module.css'
import SpecialText from './SpecialText'
import know_your_progress from '../assets/Know_your_progress.png'
import plan_your_lessons from '../assets/Plan_your_lessons.png'
import campare_with_other from '../assets/Compare_with_others.png'
import { ButtonComponent } from '../Components/ButtonComponent'

export default function LearningLanguageSection() {
    return (
        <div className={style.container}>
            <div className={style.title}>
                <b>Your swiss knife for </b> {' '}
                <SpecialText text={`learning any language`} />
            </div>
            <div className={style.para}>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className={style.images}>
                <img src={know_your_progress} alt='img' className={style.img1} />
                <img src={campare_with_other} alt='img' className={style.img2} />
                <img src={plan_your_lessons} alt='img'  className={style.img3}/>
            </div>

            <div className={style.btnSection}>
                <ButtonComponent active={true} path={'/signup'} text={'Learn More'} />
            </div>
        </div>
    )
}
