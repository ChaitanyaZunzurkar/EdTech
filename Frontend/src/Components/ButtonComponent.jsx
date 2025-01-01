/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import style from '../Stylesheets/ButtonComponent.module.css'

export const ButtonComponent = ({ active , path , text}) => {
    const navigate = useNavigate()
    return (
        <button 
            className={`${style.btn} ${active ? style['yellow-btn'] : style['black-btn']}`}
            onClick={() => navigate(path)}
        >
            <b>{ text }</b>
        </button>
    )
}
