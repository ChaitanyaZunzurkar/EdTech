import { HomeSection1 } from "../Components/HomeSection1";
import style from '../Stylesheets/HomePage.module.css'

export default function HomePage() {
  return (
    <div className={style.container}>
        <HomeSection1 />
    </div>
  )
}
