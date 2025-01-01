/* eslint-disable react/prop-types */
import style from '../Stylesheets/SpecialText.module.css'
export default function SpecialText({ text }) {
  return (
    <span className={style.text}>
      <b>{ text }</b>
    </span>
  )
}
