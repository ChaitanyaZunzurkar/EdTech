import { Link, NavLink } from 'react-router-dom'
import style from '../Stylesheets/navbar.module.css'
import logo from '../assets/Logo-Full-Light.png'
import { NavbarLinks } from '../data/navbar'
import { FaAngleDown } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../Components/ProfileDropDown'
import { useEffect, useState } from 'react';
import { categories } from '../Services/apis'
import { apiConnector } from '../Services/apiConnector'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);
    const [ subLink , setSubLink ] = useState([])    
    const [loading , setLoading] = useState(true)

    async function fetchSubLinkData() {
        try {
            setLoading(true)
            const res = await apiConnector('GET' , categories.CATEGORIES_URL);
            console.log(res.data.allCategory)
            setSubLink(res.data.allCategory);
            setLoading(false)
        } catch (error) {
            console.log("Fail to fetch the sublink data.")
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchSubLinkData();
    } , [])

    return (        
        <div className={style.container}>
            <div className={style.logoContainer}>
                <NavLink to='/'>
                    <img src={logo} alt='StudyNotion' className={style.logo} />
                </NavLink>
            </div>

            <div className={style.navContainer}>
                <nav className={style.nav}>
                    <ul className={style.navContent}>
                        {
                            NavbarLinks.map((navlink , index) => (
                                navlink.title === "Catalog" ?
                                (
                                    <li key={index} className={style.catelogContainer}>
                                        <button className={style.catalogBtn}>
                                            { navlink.title }
                                            <FaAngleDown />
                                        </button>

                                        <div className={style.categoriesContainer}>
                                            {
                                                subLink > 0 || !loading ?
                                                (
                                                    subLink.map((category , index) => (
                                                        <Link to={category.name} key={index}>
                                                            <p className={style.categoryTitle} >
                                                                {category.name}
                                                            </p>
                                                        </Link>
                                                    ))
                                                ) :
                                                (
                                                    <div className={style.NoDataBlock}>No Data</div>
                                                )
                                            }
                                            <div className={style.pointer}></div>
                                        </div>
                                    </li>
                                ) :
                                (
                                    <li key={index}>
                                        <NavLink to={navlink.path} >
                                            { navlink.title }
                                        </NavLink>
                                    </li>
                                )
                            ))
                        }
                    </ul>
                </nav>
            </div>

            <div>
                {
                    user && user?.accountType !== "Instructor" && (
                        <Link to='/dashboard/cart' >
                            <AiOutlineShoppingCart />
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && (
                        <div className={style.addtionalUserDetailsSection}>
                            <Link to='login'>
                                <button className={style.btn}> login </button>
                            </Link>

                            <Link to='signup'>
                                <button className={style.btn} > signup </button>
                            </Link>
                        </div>
                    )
                }
                {
                    token !== null && <ProfileDropDown />
                }
            </div>
        </div>
    )
}

export default Navbar