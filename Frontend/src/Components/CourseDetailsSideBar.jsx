/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import style from '../Stylesheets/CourseDetailsSideBar.module.css'
import { useDispatch } from "react-redux"


export default function VideoDetailsSidebar() {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const dispatch = useDispatch()
  
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
      <div className={style.container}>
        <div className={style.courseData}>
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className={style.backBtn}
              title="back"
            >
              <IoIosArrowBack size={30} />
            </div>
            
          </div>
          <div className={style.CourseInfo}>
            <p className={style.coursesName}>{courseEntireData?.courseName}</p>
            <p className={style.NumberOfVideo}>
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <hr className={style.line}/>
        <div className={style.courseVideo}>
          {courseSectionData.map((course, index) => (
            <div
              className={style.activeSection}
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className={style.SectionDetails}>
                <div className={style.sectionName}>
                  {course?.sectionName}
                </div>
                <div className={style.activeVideo}>
                  {/* <span className="text-[12px] font-medium">
                    Lession {course?.subSection.length}
                  </span> */}
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className={style.subSectionContainer}>
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(topic?._id)}
                        onChange={(e) => {
                          e.stopPropagation(); 
                          const isChecked = e.target.checked;
                          dispatch({
                            type: "TOGGLE_LECTURE_COMPLETION",
                            payload: topic._id
                          });
                        }}
                      />

                      {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  )
}