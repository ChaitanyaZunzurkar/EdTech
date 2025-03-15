/* eslint-disable react/prop-types */
import style from '../Stylesheets/SectionBlock.module.css'
import { RxDropdownMenu } from "react-icons/rx"
import { RiDeleteBin6Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import LectureModal from './LectureModal'
import { useState } from 'react'

function handleSubmit(event) {
    event.preventDefault()
    console.log("Submit")
}

const SectionBlock = ({ sectionName }) => {
    const [lectureModal , setLectureModal] = useState(null)
    return (
        <div className={style.container}>
            <div className={style.sectionMenu}>
                <div className={style.sectionName}>
                    <RxDropdownMenu />
                    { sectionName }
                </div>
                <div className={style.menu}>
                    <MdEdit />
                    <RiDeleteBin6Line /> |
                    <AiFillCaretDown />
                </div>
            </div>
            <button 
                type='button'
                onClick={() => {
                    setLectureModal({
                        btnText: "Save",
                        head: "Add Lecture",
                        inputField1: "Lecture Video",
                        inputField2: "Lecture Title",
                        inputField3: "Lecture Description",
                        CancelbtnHandler: () => {setLectureModal(null)},
                        SavebtnHandler: () => {handleSubmit}
                    })
                }}
            >
                <FaPlus />
                Add Lecture
            </button>
            { lectureModal && <LectureModal lectureData={lectureModal} />}
        </div>
    )
}

export default SectionBlock