import { Link, NavLink } from 'react-router-dom'
import style from '../Stylesheets/navbar.module.css'
import logo from '../assets/Logo-Full-Light.png'
import { NavbarLinks } from '../data/navbar'
import { useSelector } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../Components/ProfileDropDown'
import { useEffect, useState } from 'react';
import { categories } from '../Services/apis'
import { apiConnector } from '../Services/apiConnector'
import { ACCOUNT_TYPE } from "../utils/constants";
import { RxCross1 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const { totalItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.profile);
    const [ subLink , setSubLink ] = useState([])   
    const [isMenuOpen , setMenuOpen] = useState(false)
    const [loading , setLoading] = useState(true)

    function toggelMenuOpen() {
        setMenuOpen((prev) => !prev)
    }
 
    async function fetchSubLinkData() {
        try {
            setLoading(true)
            const res = await apiConnector('GET' , categories.CATEGORIES_URL);
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

            {/* Hamburger : Mobile view */}
            <button 
                className={style.ham}
                onClick={toggelMenuOpen}
                aria-label="Toggle menu"
            >
                {
                    isMenuOpen ? <RxCross1 size={30} /> : <GiHamburgerMenu size={30} />
                }
            </button>

            <div className={`${isMenuOpen ? style.hamMenuOpen : style.navContainer}`}>
                {
                    isMenuOpen ? (
                        <nav className={style.navOnMobile}>
                            <ul className={style.navContentOnMobile}>
                                {
                                    NavbarLinks.map((navlink , index) => (
                                        navlink.title === "Catalog" ?
                                        (
                                            <li key={index} className={style.catelogContainerOnMobile}>
                                                
                                                <button className={style.catalogBtnOnMobile}>
                                                    { navlink.title } 
                                                </button>

                                                <div 
                                                    className={style.categoriesContainerOnMobile}
                                                >
                                                    {
                                                        !loading && subLink.length > 0 ?
                                                        (
                                                            subLink.map((category , index) => (
                                                                <Link to={`catelog/${category.name}`} key={index}>
                                                                    <p className={style.categoryTitleOnMobile} >
                                                                       • {category.name}
                                                                    </p>
                                                                </Link>
                                                            ))
                                                        ) :
                                                        (
                                                            <div className={style.NoDataBlockOnMobile}>No Data</div>
                                                        )
                                                    }
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
                                <div className={style.authContainerOnMobile}>
                                    {
                                        user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                                            <Link to='/dashboard/cart' >
                                                {/* <AiOutlineShoppingCart /> */}
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
                                            <div className={style.addtionalUserDetailsSectionOnMobile}>
                                                <Link to='login'>
                                                    <button className={style.btn}> login </button>
                                                </Link>

                                                <Link to='signup'>
                                                    <button className={style.btn} > signup </button>
                                                </Link>
                                            </div>
                                        )
                                    }
                                </div>
                            </ul>
                        </nav>
                    ) : (
                        <nav className={style.nav}>
                            <ul className={style.navContent}>
                                {
                                    NavbarLinks.map((navlink , index) => (
                                        navlink.title === "Catalog" ?
                                        (
                                            <li key={index} className={style.catelogContainer}>
                                                
                                                <button className={style.catalogBtn}>
                                                { navlink.title } 
                                                </button>

                                                <div 
                                                    className={style.categoriesContainer}
                                                >
                                                    {
                                                        !loading && subLink.length > 0 ?
                                                        (
                                                            subLink.map((category , index) => (
                                                                <Link to={`catelog/${category.name}`} key={index}>
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
                    )
                }
                
            </div>

            <div className={style.authContainer}>
                {
                    user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to='/dashboard/cart' >
                            {/* <AiOutlineShoppingCart /> */}
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