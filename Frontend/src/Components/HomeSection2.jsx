/* eslint-disable react/prop-types */
import style from '../Stylesheets/homesection2.module.css'
import { TypeAnimation } from 'react-type-animation'
import { ButtonComponent } from './ButtonComponent'

export default function HomeSection2({ heading , para , btn1 , btn2 , codeblock }) {
  return (
    <div className={style.container}>
        <div className={style.info}>
            <div className={style.title}>
                { heading }
            </div>

            <div className={style.para}>
                <p>
                    { para }
                </p>
                <div className={style.btnSection}>
                    <ButtonComponent active={true} path={'/signup'} text={ btn1 } />
                    <ButtonComponent active={false} path={'/loign'} text={ btn2 } />
                </div>
            </div>
        </div>
                
        <pre className={style.codeblock}>
            <TypeAnimation 
                sequence={[codeblock , 5000]}
                cursor={true}
                repeat={Infinity}
                speed={50}
                wrapper="pre"
            />
        </pre>
    </div>
  )
}
