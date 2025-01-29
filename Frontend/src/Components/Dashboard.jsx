import style from '../Stylesheets/dashboard.module.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className={style.container}>
        <Sidebar />
        <div className={style.content}>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard