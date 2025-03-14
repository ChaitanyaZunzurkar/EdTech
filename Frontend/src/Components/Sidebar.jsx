import style from '../Stylesheets/Sidebar.module.css'
import { sidebarLinks } from '../data/dashboard-link'
import { useDispatch, useSelector } from 'react-redux'
import SideLink from './SideLink'
import { FiLogOut } from "react-icons/fi";
import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { logout } from "../Services/Operations/authAPI"

const Sidebar = () => {
    const user = useSelector((state) => state.profile.user)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                <button 
                    className={style.logoutBtn}
                    onClick={() =>
                        setConfirmationModal({
                          text1: "Are you sure?",
                          text2: "You will be logged out of your account.",
                          btn1Text: "Logout",
                          btn2Text: "Cancel",
                          btn1Handler: () => dispatch(logout(navigate)),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                    }
                >
                    <FiLogOut size={20} />
                    Logout
                </button>
            </div>
            {console.log(confirmationModal)}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    )
}

export default Sidebar