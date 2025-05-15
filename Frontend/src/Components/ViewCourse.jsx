import style from '../Stylesheets/ViewCourse.module.csss'
import CourseDetailsSideBar from './CourseDetailsSideBar'
import { Outlet, useParams } from "react-router-dom"
import { getCourseDetails } from '../Services/Operations/CourseDetailsAPI'  
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  setCourseDetails , setCourseReviews , setCourseRating , setCourseEnrolled } from '../Redux/Slices/CourseDetailsSlice'

const ViewCourse = () => {
    const { courseId } = useParams()
    const { token } = useSelector((state) => state.auth)
    const [reviewModal , setReviewModal] = useState(false)  
    const dispatch = useDispatch()
    
    
    useEffect(() => {
        ;(
            async () => {
                const courseData = await getCourseDetails(courseId , token)
                dispatch(setCourseDetails(courseData.courseDetails))
                dispatch(setCourseReviews(courseData.courseReviews))    
                dispatch(setCourseRating(courseData.courseRating))
                dispatch(setCourseEnrolled(courseData.courseEnrolled))
            }
        )()
    }, [])

    return (
        <div className={`${style.container} relative flex min-h-[calc(100vh-3.5rem)]`}>
            <CourseDetailsSideBar />

            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default ViewCourse