import style from '../Stylesheets/Footer.module.css'
import { FooterLink2 } from '../data/footer-links'
import FooterSection from './FooterSection'

export default function Footer() {
    return (
        <div className={style.container}>
            {
                FooterLink2.map((section , index) => ( 
                    <FooterSection key={index} section={section} />
                ))               
            }
        </div>
    )
}

