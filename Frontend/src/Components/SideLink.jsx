/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
import style from '../Stylesheets/SideLink.module.css'
import * as icons from 'react-icons/vsc'

const SideLink = ({ name , path , icon }) => {
    
    const Icon = icons[icon]
    return (
        <div className={style.container}>
            <NavLink to={path} className={({ isActive }) => isActive ? `${style.active} ${style.link}` : style.link}>
                <Icon size={20} color={'#838894'}/>
                <p className={style.text}>{ name }</p>
            </NavLink>
        </div>
    )
}

export default SideLink