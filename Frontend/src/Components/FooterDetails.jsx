/* eslint-disable react/prop-types */
import style from '../Stylesheets/FooterDetails.module.css'
import { Link } from 'react-router-dom'

export default function FooterDetails({ data }) {
  return (
    <div className={style.container}>
      <ul className={style.ul}>
        <li className={style.list}>
          <Link to={data.link} className={style.links}>
            {data.title}
          </Link>
        </li>
      </ul>
    </div>
  )
}
