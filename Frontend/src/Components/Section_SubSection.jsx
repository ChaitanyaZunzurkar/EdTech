/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { GrSubtract } from "react-icons/gr";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import style from '../Stylesheets/Section_Subsection.module.css'

const Section_SubSection = ({ sections }) => {
    const [isOpen , SetIsOpen] = useState(false)
    const [isSubSectionOpen , setIsSubSectionOpen] = useState(false)
    return (
        <div className={style.container}>
            {
                sections?.map((section , index) => (
                    <div key={index} className={`${style.courseContentTable}`}>
                        <details className="w-full">
                            <summary onClick={() => SetIsOpen(!isOpen)} style={{listStyle: 'none'}} className={style.sectionContainer}>
                                {
                                    isOpen ? (
                                        <div className="flex justify-start items-center">
                                            <GrSubtract /> <p className={style.sectionName}>{section?.sectionName}</p>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start items-center">
                                            <FaPlus /> <p className={style.sectionName}>{section?.sectionName}</p>
                                        </div>
                                    )
                                }
                            </summary>
                            {
                                section?.subSection?.map((sub , index) => (
                                    <details key={index} className={style.subSectionContainer} style={{padding:'1rem'}}>
                                        <summary style={{listStyle: 'none'}} onClick={() => setIsSubSectionOpen(!isSubSectionOpen)} className="flex justify-center items-center">
                                            <MdOutlineOndemandVideo size={20}  />
                                            <p className={style.subName}>{sub?.title}</p>
                                            {
                                                isSubSectionOpen ? (
                                                    <FaChevronUp size={20} />
                                                ) : (
                                                    <FaChevronDown size={20}  />
                                                )
                                            }
                                        </summary>
                                        <p className={style.subDesc}>{sub?.description}</p>
                                    </details>
                                ))
                            }
                        </details>
                    </div>
                ))
            }
        </div>
    )
}

export default Section_SubSection