/* eslint-disable react/prop-types */
// import { Link } from 'react-router-dom'
import style from '../Stylesheets/FooterSection.module.css'
import FooterDetails from '../Components/FooterDetails'

export default function FooterSection({ section , index }) {
  return (
    <div className={style.container}>
        <b className={style.title}>{ section.title }</b>
        {
            section.links.map((data) => (
                <FooterDetails key={index} data={data} />
            ))
        }
    </div>
  )
}
