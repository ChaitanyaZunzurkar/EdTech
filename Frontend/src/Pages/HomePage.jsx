import { HomeSection1 } from "../Components/HomeSection1";
import HomeSection2 from "../Components/HomeSection2";
import style from '../Stylesheets/HomePage.module.css'
import SpecialText from '../Components/SpecialText'
import { FaArrowRight } from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className={style.container}>
        <HomeSection1 />
        <HomeSection2 
          heading={
            <b>Unlock your <SpecialText text={`coding potential`}/> with our online courses.</b>
          }
          para={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}

          btn1={
            <div className={style.btn}>
              Try It Yourself <FaArrowRight className={style.arrow} style={{ marginLeft: '8px', fontSize: '13px' }} />
            </div>
          }
          btn2={'learn more'}

          codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<linkrel = "stylesheet"href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
  <a href="one/">One</a> <a href="two/">Two</a> 
</nav>
</body>
</html>`}
        />

        <HomeSection2 
          heading={
            <b>Unlock your <SpecialText text={`coding potential`}/> with our online courses.</b>
          }
          para={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}

          btn1={
            <div className={style.btn}>
              Try It Yourself <FaArrowRight className={style.arrow} style={{ marginLeft: '8px' , fontSize: '13px' }} />
            </div>
          }
          btn2={'learn more'}
          codeblock={`<!DOCTYPE html>
<html>
<head>
<title>Example</title>
<linkrel = "stylesheet"href="styles.css">
</head>
<body>
<h1><a href="/">Header</a></h1>
<nav>
  <a href="one/">One</a> <a href="two/">Two</a> 
</nav>
</body>
</html>`}
        />
    </div>
  )
}


