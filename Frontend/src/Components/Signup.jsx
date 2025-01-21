import Template from "./Template"
import signupImg from '../assets/signup.webp'

const Signup = () => {
  return (
    <div>
        <Template 
            title={'Join the millions learning to code with StudyNotion for free'}
            description={'Discover your passions,'}
            specialText={'Be Unstoppable'}
            login={false}
            img={signupImg}
        />
    </div>
  )
}

export default Signup