import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

// import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import CourseDetailsSideBar from "./CourseDetailsSideBar"
import { getFullDetailsOfCourse } from "../Services/Operations/CourseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../Store/Slice/viewCourseSlice"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
//   const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      console.log("Course Data here... ", courseData)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{minHeight:"100vh"}}>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <CourseDetailsSideBar />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
        {/* <h1 style={{color:"white"}}>Hello</h1> */}
      </div>
    </div>
  )
}