/* eslint-disable react/prop-types */
import style from '../Stylesheets/SectionBlock.module.css'
import { RxDropdownMenu } from "react-icons/rx"
import { RiDeleteBin6Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import LectureModal from './LectureModal'
import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteSection , deleteSubSection } from '../Services/Operations/CourseDetailsAPI'
import { setCourse } from '../Store/Slice/courseSlice'
import Modal from '../Components/ConfirmationModal'

const SectionBlock = ({ section , handleChangeEditSectionName }) => {
    const { course } = useSelector((state) => state.course)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [addSubSection , setAddSubSection] = useState(null)
    const [viewSubSection , setViewSubSection] = useState(null)
    const [editSubSection , setEditSubSection] = useState(null)
    const [ConfirmationModal , setConfirmationalModal] = useState(null)

    async function handleDeleteSection(sectionId) {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })
        if(result) {
            setCourse(result)
        }
        setConfirmationalModal(null)
    }

    async function handleDeleteSubSection(SubSectionId , sectionId) {
        const result = await deleteSubSection({
            SubSectionId,
            sectionId,
            token
        })

        if(result) {
            const updatedCourseContent = course.updatedCourse.courseContent.map((section) => (
                section._id === sectionId ? result : section
            ))

            
            const updatedCourse = {...course , courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationalModal(null)
    }

    return (
        <div className={style.container}>
            <details open className={style.details}>
                <summary className={style.summary}>
                    <div className={style.sectionMenu}>
                        <div className={style.sectionName}>
                            <RxDropdownMenu size={22} color="#999DAA" />
                            { section.sectionName }
                        </div>
                        <div className={style.menu}>
                            <button 
                                type='button'
                                className={style.iconButton}
                                onClick={() =>
                                    handleChangeEditSectionName(
                                      section._id,
                                      section.sectionName
                                    )
                                }
                            >
                                <MdEdit size={18} />
                            </button>
                            <button
                                type='button'
                                className={style.iconButton}
                                onClick={() =>
                                    setConfirmationalModal({
                                      text1: "Delete this Section?",
                                      text2: "All the lectures in this section will be deleted",
                                      btn1Text: "Delete",
                                      btn2Text: "Cancel",
                                      btn1Handler: () => handleDeleteSection(section._id),
                                      btn2Handler: () => setConfirmationalModal(null),
                                    })
                                  }
                            >
                                <RiDeleteBin6Line size={18} /> 
                            </button>
                            <span className={style.vertical}>|</span>
                            <AiFillCaretDown />
                        </div>
                    </div>
                </summary>
                <div className={style.subSectionContainer}>
                    {
                        section.subSection.map((data) => (
                            <div key={data._id} className={style.subsectionContainer}>
                                <hr/>
                                <div 
                                    
                                    onClick={() => setViewSubSection(data)}
                                    className={style.subSection} 
                                >
                                    <div className={style.subSectionName}>
                                        <RxDropdownMenu size={22} color='#999DAA'/>
                                        <p className={style.title}>{ data.title }</p>
                                    </div>
                                    <div className={style.subSectionMenu}>
                                        <button
                                            className={style.iconButton}
                                            onClick={() => setEditSubSection({...data , sectionId: section._id})}
                                        >
                                            <MdEdit  size={18} />
                                        </button>
                                        <button 
                                            className={style.iconButton}
                                            onClick={() =>
                                                setConfirmationalModal({
                                                    text1: "Delete this Sub-Section?",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationalModal(null),
                                                })
                                            }
                                            >
                                            <RiDeleteBin6Line size={18} /> 
                                        </button>
                                    </div>
                                </div> 
                            </div>      
                        ))
                    }
                    <hr/>
                </div>
                <button 
                    type='button'
                    className={style.addButton}
                    onClick={() => setAddSubSection({
                        sectionId: section._id,  
                        lectureTitle: "",  
                        lectureDescription: "",  
                        lectureVideo: null  
                    })}
                >
                    <FaPlus />
                    Add Lecture
                </button>
            </details>
            {
                addSubSection ? (
                    <LectureModal 
                        lectureData={addSubSection}
                        setLectureData={setAddSubSection}
                        add={true}
                    />
                ) : viewSubSection ? (
                    <LectureModal 
                        lectureData={viewSubSection}
                        setLectureData={setViewSubSection}
                        view={true}
                    />
                ) : editSubSection ? (
                    <LectureModal 
                        lectureData={editSubSection}
                        setLectureData={setEditSubSection}
                        edit={true}
                    />
                ) : (
                    <></>
                )
            }
            {
                ConfirmationModal ? (
                    <Modal modalData={ConfirmationModal} />
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default SectionBlock