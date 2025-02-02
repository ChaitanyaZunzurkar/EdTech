import style from '../Stylesheets/ProfileDropDown.module.css';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileDropDown = () => {
    const user = useSelector((state) => state.profile.user);
    const profilePic = user?.image 

    return (
        <div className={style.container}>
            <AiOutlineShoppingCart size={22} />
            <div className={style.section}>
              <div className={style.ppContainer}>
                  <img 
                      src={profilePic} 
                      alt='Profile Picture'
                  />
              </div>
              <div className={style.profileContainer}>
                    <Link to={'/dashboard/my-profile'}>
                        <p>Dashboard</p>
                    </Link>
                    <p>Logout</p>
                    <div className={style.pointer}></div>
              </div>
            </div>
        </div>
    );
};

export default ProfileDropDown;
