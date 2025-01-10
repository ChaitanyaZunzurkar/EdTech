import { HomeSection1 } from "../Components/HomeSection1";
import HomeSection2 from "../Components/HomeSection2";
import style from '../Stylesheets/HomePage.module.css'
import SpecialText from '../Components/SpecialText'
import { FaArrowRight } from 'react-icons/fa';
import { ButtonComponent } from "../Components/ButtonComponent";
import Timeline from "../Components/Timeline";
import LearningLanguageSection from "../Components/LearningLanguageSection";
import Instrcutor from "../Components/Instrcutor";
import ExploreCourses from "../Components/ExploreCourses";

export default function HomePage() {
  return (
    <div className={style.container}>
        <HomeSection1 />
        <HomeSection2 
          position={false}
          heading={
            <b>Unlock your <SpecialText text={`coding potential`}/> with our online courses.</b>
          }
          para={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}

          btn1={
            <div className={style.btn}>
              Try It Yourself <FaArrowRight className={style.arrow} style={{ marginLeft: '8px', fontSize: '13px' }} />
            </div>
          }
          btn2={'Learn more'}
          codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<linkrel = "stylesheet"href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav> <a href="one/">One</a> <a href="two/">Two</a> </nav>
</body>
</html>`}
        />

        <HomeSection2
          position={true} 
          heading={
            <b>Start <SpecialText text={`coding in seconds`}/>.</b>
          }
          para={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}

          btn1={
            <div className={style.btn}>
              Continue Lessons <FaArrowRight className={style.arrow} style={{ marginLeft: '8px' , fontSize: '13px' }} />
            </div>
          }
          btn2={'Learn More'}
          codeblock={`import React from 'react';

function WelcomeMessage() {
  return (
    <h1> Welcome to StudyNotion </h1>
    <h1> Happy Learning! </h1>
  );
}

export default WelcomeMessage;`}
        />

        {/* Section 3 */}        
        <div className={style.relativeDiv}>
          <ExploreCourses className={style.exploreCourses} />
          <div className={style.section}> 
              <div className={style.img}>
                  <div className={style.btn}>
                      <ButtonComponent active={true} path={'/signup'} text={`Explore Full Catalog`} >
                          <FaArrowRight className={style.arrow}/>
                      </ButtonComponent>
                      <ButtonComponent active={false} path={'signup'} text={'Learn More'} />
                  </div>
              </div>
          </div>
        </div>

        

        {/* Section 4 */}
        <div className={style.sectionFour}>
            <div className={style.title}>
                <b>Gets the skills you need for a</b> {' '}
                <SpecialText text={`job that is in demand.`} />
            </div>
            <div className={style.desc}>
              <p>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </p>
              <button className={style.learnBtn}>
                Learn More
              </button>
            </div>
        </div>

        { /* section 5 */ }
        <Timeline />
        <LearningLanguageSection />
        <Instrcutor />
    </div>
  )
}


