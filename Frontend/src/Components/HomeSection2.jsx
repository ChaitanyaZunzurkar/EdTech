/* eslint-disable react/prop-types */
import style from '../Stylesheets/homesection2.module.css'
import { TypeAnimation } from 'react-type-animation'
import { ButtonComponent } from './ButtonComponent'

export default function HomeSection2({position , heading , para , btn1 , btn2 , codeblock }) {
  return (
    <div className={style.container} 
        style={position ? {flexDirection:"row-reverse"} : {flexDirection:"row"}}
    >
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

        <div className={style.codeContainer}>
            <div className={style.numbers}>
                <p>1 </p>
                <p>2 </p>
                <p>3 </p>
                <p>4 </p>
                <p>5 </p>
                <p>6 </p>
                <p>7 </p>
                <p>8 </p>
                <p>9 </p>
                <p>10 </p>
                <p>11 </p>
            </div>
            <pre className={style.codeblock}
                style={position ? {color: "#E7C009"} : { color : "#118AB2"}}
            >
                <TypeAnimation 
                    sequence={[codeblock , 5000 , "" , 0]}
                    cursor={true}
                    repeat={Infinity}
                    speed={50}
                    wrapper="pre"
                    omitDeletionAnimation={true}
                    style={{margin:"0px"}}
                />
            </pre>
            <div className={style.radial}
                style={
                    position ? {background: "radial-gradient(circle at 30% 40%, rgba(134, 106, 4, 0.6) , #000826 70%)"} : 
                    {background: "radial-gradient(circle at 30% 40%, rgba(71, 165, 197, 0.6) , #000826 60%)"}
                }
            ></div>   
        </div>  
    </div>
  )
}
