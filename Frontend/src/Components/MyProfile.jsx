import { useSelector } from 'react-redux'
import style from '../Stylesheets/MyProfile.module.css'
import { FaRegEdit } from "react-icons/fa";

const MyProfile = () => {
    const user = useSelector((state) => state.profile.user)
    return (
        <div className={style.container}>
            <p className={style.title}>My Profile</p>
            <section className={style.section1}>
                <div className={style.userInfo}>
                    <img src={user?.image} className={style.pp}/>
                    <div className={style.userNameAndEmail}>
                        <p>{ user.firstName } { user.lastName }</p>
                        <p>{ user.email }</p>
                    </div>
                </div>
                <div className={style.editBtn}>
                    <button >
                        <FaRegEdit size={15}/>
                        <b>Edit</b>
                    </button>
                </div>
            </section>

            <section className={style.section2}>
                <div>
                    <p className={style.title}>About</p>
                    <p className={style.desc}>{ user.additionalDetails.about ? user.additionalDetails.about : "Write something about yourself..."}</p>
                </div>
                <div className={style.editBtn}>
                    <button >
                        <FaRegEdit size={15}/>
                        <b>Edit</b>
                    </button>
                </div>
            </section>

            <section className={style.section3}>
                <div>
                    <p className={style.title}>Personal Details</p>
                    <div className={style.userinfo}>
                        <table className={style.table}>
                            <tbody>
                                <tr>
                                    <td>
                                        <p className={style.label}>First Name</p>
                                        <p>{user.firstName}</p>
                                    </td>
                                    <td>
                                        <p className={style.label}>Last Name</p>
                                        <p>{user.lastName}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={style.label}>Email</p>
                                        <p>{user.email}</p>
                                    </td>
                                    <td>
                                        <p className={style.label}>Phone Number</p>
                                        <p>{user.additionalDetails.contactNumber ? user.additionalDetails.contactNumber : "Add Contact Number"}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p className={style.label}>Gender</p>
                                        <p>{user.additionalDetails.gender ? user.additionalDetails.gender : "Add Gender"}</p>
                                    </td>
                                    <td>
                                        <p className={style.label}>Date Of Birth</p>
                                        <p>{user.additionalDetails.dateOfBirth ? user.additionalDetails.dateOfBirth : "Add Date Of Birth"}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={style.editBtn}>
                    <button >
                        <FaRegEdit size={15}/>
                        <b>Edit</b>
                    </button>
                </div>
            </section>
        </div>
    )
}

export default MyProfile