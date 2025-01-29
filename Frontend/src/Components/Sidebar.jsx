import style from '../Stylesheets/Sidebar.module.css'
import { sidebarLinks } from '../data/dashboard-link'
import { useSelector } from 'react-redux'
import SideLink from './SideLink'
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
    const user = useSelector((state) => state.profile.user)

    return (
        <div className={style.container}>
            {
                sidebarLinks.map((link , index) => {
                    if(link.type && user.accountType !== link.type) return null
                    return (
                        <SideLink key={index} name={link.name} path={link.path} icon={link.icon} />
                    )
                })
            }
            <div className={style.horizontalLine}></div>
            <div className={style.sidebarSection2}>
                <SideLink name="Settings" path='/dashboard/settings' icon="VscSettingsGear" />
                <button className={style.logoutBtn}>
                    <FiLogOut size={20} />
                    Logout
                </button>
            </div>

        </div>
    )
}

export default Sidebar