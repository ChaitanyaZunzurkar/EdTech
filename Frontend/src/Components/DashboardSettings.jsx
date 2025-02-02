import { useSelector } from "react-redux";
import style from "../Stylesheets/dashboardSettings.module.css";
import { IoIosArrowBack } from "react-icons/io";
import countryCode from "../data/countryCode.json";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";


const DashboardSettings = () => {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        countryCode: "",
        mobileNumber: "",
        about: "",
        gender: "",
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        changePassword: ''
    })



    function profileEditSubmitHandler(event) {
        event.preventDefault();
        if (profileData.mobileNumber.length < 10) {
            toast.error("Invalid mobile number.");
        }
        console.log(profileData);
        setProfileData({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            countryCode: "",
            mobileNumber: "",
            about: "",
            gender: "",
        });
    }

    function passwordChangeSubmitHandler(event) {
        event.preventDefault()
        console.log(passwordData)
    }

    function ProfileEditChangeHandler(event) {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    }
    function passwordEditChangeHandler(event) {
        setPasswordData({
            ...passwordData,
            [event.target.name]: event.target.value,
        })
    }



    return (
        <div className={style.container}>
            <p className={style.back} onClick={() => navigate(-1)}>
                <IoIosArrowBack />
                Back
            </p>
            <p className={style.title}>Edit Profile</p>

            <section className={style.section1}>
                <div className={style.userInfo}>
                    <img src={user?.image} className={style.pp} />
                    <div className={style.userNameAndEmail}>
                        <p>
                            <b>Change Profile Picture</b>
                        </p>
                        <div className={style.profilepicChangeBtn}>
                            <button className={style.changeBtn}>Change</button>
                            <button className={style.removeBtn}>Remove</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.section2}>
                <p className={style.title}>Profile Information</p>
                <form className={style.ProfileEditForm} onSubmit={profileEditSubmitHandler}>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Update your first Name"
                            onChange={ProfileEditChangeHandler}
                            value={profileData.firstName}
                            className={style.inputBox}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Update your last Name"
                            onChange={ProfileEditChangeHandler}
                            value={profileData.lastName}
                            className={style.inputBox}
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            placeholder="dd/mm/yy"
                            onChange={ProfileEditChangeHandler}
                            value={profileData.dateOfBirth}
                            className={style.inputBox}
                        />
                    </div>

                    <div className={style.genderDiv}>
                        <label>Gender</label>
                        <div className={style.content}>
                            <select
                                name="gender"
                                id="gender"
                                onChange={ProfileEditChangeHandler}
                                value={profileData.gender}
                                className={style.genderSelect}
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className={style.numberContainer}>
                        <div className={style.phoneNoSection}>
                            <div>
                                <label htmlFor="countryCode">Phone Address</label>
                            </div>

                            <div
                                className={style.numberInput}
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    flexDirection: "row",
                                }}
                            >
                                <select
                                    className={style.phoneInput}
                                    name="countryCode"
                                    id="countryCode"
                                    placeholder="+91"
                                    onChange={ProfileEditChangeHandler}
                                    value={profileData.countryCode}
                                >
                                    {countryCode.map((country, index) => (
                                        <option key={index} placeholder="+91" value={country.code}>
                                            {`${country.code}`} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                                            {`${country.country}`}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    id="mobileNumber"
                                    placeholder="12345 67890"
                                    onChange={ProfileEditChangeHandler}
                                    value={profileData.mobileNumber}
                                    className={style.inputBox}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="about">About</label>
                        <input
                            name="about"
                            id="about"
                            placeholder="Enter your Bio"
                            onChange={ProfileEditChangeHandler}
                            value={profileData.about}
                            className={style.inputBox}
                        />
                    </div>

                    <div
                        className={style.btnContainer}
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            margin: "10px 0px",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={style.cancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={style.save}>
                            Save
                        </button>
                    </div>
                </form>
            </section>

            <section className={style.section3}>
                <p className={style.title}>Password</p>
                <form className={style.passwordEditForm} onSubmit={passwordChangeSubmitHandler}>
                    <div className={style.passwordSection}>
                        <div className={style.PasswordDiv}>
                            <label htmlFor="password" className={style.label}>
                                Current Password<span className={style.astrick}>*</span>
                            </label>
                            <input
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                placeholder="Enter Current password"
                                value={passwordData.currentPassword}
                                onChange={passwordEditChangeHandler}
                                className={style.input}
                                required
                            />
                        </div>
                        <div className={style.changePasswordDiv}>
                            <label htmlFor="confirmPassword">
                                Change Password<span className={style.astrick}>*</span>
                            </label>
                            <input
                                type="password"
                                name="changePassword"
                                id="changePassword"
                                placeholder="Enter New Password"
                                value={passwordData.changePassword}
                                onChange={passwordEditChangeHandler}
                                className={style.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={style.passwordChangeBtnContainer}>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className={style.cancel}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={style.save}>
                            Save
                        </button>
                    </div>
                </form>
            </section>

            <section className={style.section4} >
                <div >
                    <div className={style.circle}>
                        <RiDeleteBin6Line scize={25} color={'#691432'} />
                    </div>
                    <p className={style.title}>Delete Account</p>
                </div>
                <p className={style.desc}>Would you like to delete account?</p>
                <p className={style.desc}>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                <p className={style.deleteBtn}><i>I want to delete my account.</i></p>
            </section>
        </div>
    );
};

export default DashboardSettings;
