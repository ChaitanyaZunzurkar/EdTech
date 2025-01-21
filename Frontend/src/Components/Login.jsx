import Template from "./Template"
import loginImg from '../assets/login.webp'

const Login = () => {
  return (
    <div>
        <Template 
            title={'Welcome Back'}
            description={'Build skills for today, tomorrow, and beyond.'}
            specialText={'Education to future-proof your career.'}
            login={true}
            img={loginImg}
        />
    </div>
  )
}

export default Login