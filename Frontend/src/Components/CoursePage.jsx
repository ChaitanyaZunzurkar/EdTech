/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react"
import RatingStars from "./RatingStar"
import { useParams } from "react-router-dom"
import { getCourseDetails } from "../Services/Operations/CourseDetailsAPI";
import style from '../Stylesheets/coursePage.module.css'
import Section_SubSection from "./Section_SubSection";

const CoursePage = () => {
  const { courseId } = useParams();
  const [ courseDetails , setCourseDetails] = useState(null)

  useEffect(() => {
      const fetchCourseData = async (courseId) => {
        try {
            const res = await getCourseDetails(courseId);
            if(res) {
              setCourseDetails(res)
            }
            console.log("This is res",res) 
            console.log("This is course Details ", courseDetails)
        } catch (error) {
          console.log(error)
        }
      }

      fetchCourseData(courseId)
  } , [courseId])

  const [avgReviewCount , setAvgRating] = useState(0)
  if(avgReviewCount) {
    setAvgRating(avgReviewCount)
  }

  return (
      <>
      <div className={style.container}>
          <div className={style.pages}>
            <p className="text-[#838894]">Home</p> <span>/</span>
            <p className="text-[#838894]">Learning</p> <span>/</span>
            <p className="text-[#FFD60A]"> {courseDetails?.course?.courseName} </p>
          </div>

          <div className="">
            <h1 className={style.courseName}>{courseDetails?.course?.courseName}</h1>
            <p className="text-[#999DAA]">{courseDetails?.course?.courseDescription}</p>
            <div className={`${style.ratingAndReviews} gap-1`}>
              <span className="text-[#E7C009]">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-[#DBDDEA] flex justify-center items-center">
                ({courseDetails?.course?.ratingAndReviews?.length} rating)
              </span>
              <pre>  </pre>
              <span className="text-[#DBDDEA] flex justify-center items-center">{courseDetails?.course?.studentEnrolled?.length} Students</span>
            </div>
            <div>
              <p className="text-[#DBDDEA]"> Created by {courseDetails?.course.instructor.firstName} {courseDetails?.course.instructor.lastName} </p>
            </div>
          </div>
      </div>
      
      <div className={style.whatYouWillLearn}>
          <p className="text-2xl text-[#F1F2FF]">What you will Learn ?</p>
          <p className="text-[#C5C7D4]">{courseDetails?.course?.whatYouWillLearn}</p>
      </div>

      <div className={style.courseContent}>
        <p className="text-2xl text-[#F1F2FF]">Course content</p>
        <Section_SubSection  sections={courseDetails?.course?.courseContent}/>
      </div>

      <div className={`${style.author} text-white p-6 rounded-xl max-w-lg`}>
        <h2 className="text-2xl" style={{marginBottom:'1.5rem'}}>Author</h2>
        <div className="flex flex-col">
          <div className="flex justify-start items-center">
            <img
              src="https://via.placeholder.com/60" // Replace with actual image URL
              alt="Author"
              className="w-16 h-16 rounded-full border-2 border-gray-500"
            />
            <h3 className="text-lg font-semibold" style={{marginLeft:'1rem'}}>Love Babbar</h3>
          </div>
          <div>
            <p className="text-gray-300 text-sm mt-1 p-0" style={{padding:'10px 0px'}}>
              I will be your lead trainer in this course. Within no time, I will help you to
              understand the subject in an easy manner. I have a huge experience in online
              training and recording videos. Let's get started!
            </p>
          </div>
        </div>
    </div>
      </>
  )
}

export default CoursePage