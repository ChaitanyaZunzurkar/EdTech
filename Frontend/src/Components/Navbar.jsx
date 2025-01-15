import { NavLink } from 'react-router-dom'
import style from '../Stylesheets/navbar.module.css'
import logo from '../assets/Logo-Full-Light.png'
import { NavbarLinks } from '../data/navbar'

const Navbar = () => {
  return (
    <div className={style.container}>
        <div className={style.logoContainer}>
            <img src={logo} alt='StudyNotion' className={style.logo} />
        </div>

        <div className={style.navContainer}>
            <nav className={style.nav}>
                <ul className={style.navContent}>
                    {
                        NavbarLinks.map((navlink , index) => (
                            <li key={index}>
                                <NavLink to={navlink.path} >
                                    { navlink.title }
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </div>

        <div className={style.addtionalUserDetailsSection}>
            <button className={style.btn}>
                login
            </button>

            <button className={style.btn} >
                signup
            </button>
        </div>
    </div>
  )
}

export default Navbar