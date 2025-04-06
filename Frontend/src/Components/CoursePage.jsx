import { useEffect, useState } from "react"
import RatingStars from "./RatingStar"
import { getCourseDetails } from "../Services/Operations/CourseDetailsAPI";
import style from '../Stylesheets/coursePage.module.css'
import Section_SubSection from "./Section_SubSection";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate , useParams } from "react-router-dom"
import avgRating from "../utils/avgRating";
import ReactMarkdown from "react-markdown"
import { buyCourse } from "../Services/Operations/StudentFeaturesAPI";
import ConfirmationModal from "./ConfirmationModal";

const CoursePage = () => {
  const { courseId } = useParams();
  const [ courseDetails , setCourseDetails] = useState(null)
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)  

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [confirmationModal, setConfirmationModal] = useState(null)

  useEffect(() => {
      const fetchCourseData = async (courseId) => {
        try {
            const res = await getCourseDetails(courseId);
            if(res) {
              setCourseDetails(res)
            }
            console.log("This is res",res) 
        } catch (error) {
          console.log(error)
        }
      }

      fetchCourseData(courseId)
  } , [courseId])

  const [avgReviewCount , setAvgRatingCount] = useState(0)
  useEffect(() => {
    const count = avgRating(courseDetails?.course?.ratingAndReviews)
    if(count) {
      setAvgRatingCount(avgReviewCount)
    }
  }, [avgReviewCount, courseDetails?.course?.ratingAndReviews])

  // const [totalLectureCount , setTotalLectureCount] = useState(0);
  // useEffect(() => {
  //   let lectures = 0
  //   courseDetails?.course?.courseContent?.forEach(sec => {
  //     lectures += sec?.subSection?.length || 0
  //   });

  //   setTotalLectureCount(lectures)
  // }, [])

  const handleBuyCourse = () => {
    if(token) {
      buyCourse(token , [courseId] , user , navigate , dispatch)
      return 
    }

    setConfirmationModal({
      text1:"You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate('/login'),
      btn2Handler: () => setConfirmationModal(null)
    })
  }

  if (loading || !courseDetails) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  
  return (
      <div className={` ${style.main}`}>
        {
          console.log("This is course Details ", courseDetails)
        }
        <div className="flex flex-col">
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
          
          <div className={`${style.whatYouWillLearn} w-2/3`}>
              <p className="text-2xl text-[#F1F2FF] w-2/3">What you will Learn ?</p>
              <p className="text-[#C5C7D4]">
                  <ReactMarkdown>
                    {courseDetails?.course?.whatYouWillLearn}
                  </ReactMarkdown>
              </p>
          </div>

          <div className={`${style.courseContent} w-2/3`} >
            <p className="text-2xl text-[#F1F2FF]">Course content</p>
            <Section_SubSection  sections={courseDetails?.course?.courseContent}/>
          </div>

          <div className={`${style.author} text-white p-6 rounded-xl max-w-lg`}>
            <h2 className="text-2xl" style={{marginBottom:'1.5rem'}}>Author</h2>
            <div className="flex flex-col">
              <div className="flex justify-start items-center">
                <img
                  src={
                    courseDetails.course.instructor.image ? courseDetails.course.instructor.image 
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${courseDetails.course.instructor.firstName} ${courseDetails.course.instructor.lastName}`
                  }
                  alt="Author"
                  className="w-16 h-16 rounded-full border-2 border-gray-500"
                />
                <h3 className="text-lg font-semibold" style={{marginLeft:'1rem'}}>
                  {courseDetails.course.instructor.firstName} {courseDetails.course.instructor.lastName}
                </h3>
              </div>
              <div>
                <p className="text-gray-300 text-sm mt-1 p-0" style={{padding:'10px 0px'}}>
                  {courseDetails.course.instructor.additionalDetails?.about}
                </p>
              </div>
            </div>
        </div>
        </div>
          <div className={`${style.buyingcart} absolute top-4 right-4 flex flex-col h-auto bg-[#2C333F] justify-start items-center`}>
            <div className="flex flex-col">
              <img src={courseDetails.course.thumbnail} alt="Thumbnail" className="w-[350px]" />
              <p className="text-[#F1F2FF] text-2xl">Rs. {courseDetails.course.price}</p>
            </div>
            <div className="w-full flex flex-col" style={{margin:'0.5rem'}}>
              <button className=" bg-yellow-500 text-black rounded-md" style={{padding:'10px' , margin:'5px'}}>Add to Cart</button>
              <button className=" bg-gray-700 text-white rounded-md" style={{padding:'10px' , margin:'5px'}} onClick={handleBuyCourse}>Buy now</button>
            </div>
            <div className="w-full text-white rounded-lg shadow-lg" style={{margin:'0.5rem'}}>
              <p className="text-center text-sm">30-Day Money-Back Guarantee</p>
              <h2 className="text-lg" style={{margin:'0px 1rem'}}>This course includes:</h2>
              <ul className="w-full flex flex-col justify-center items-start text-green-400" style={{margin:'0px 1rem'}}>
                  <li className="flex items-center">
                      <i className=""></i>
                      <span className="text-sm">8 hours on-demand video</span>
                  </li>
                  <li className="flex items-center">
                      <i className=""></i>
                      <span className="text-sm">Full Lifetime access</span>
                  </li>
                  <li className="flex items-center">
                      <i className=""></i>
                      <span className="text-sm">Access on Mobile and TV</span>
                  </li>
                  <li className="flex items-center">
                      <i className=""></i>
                      <span className="text-sm">Certificate of completion</span>
                  </li>
              </ul>
              <p className="text-center text-yellow-400 font-semibold">Share</p>
          </div>
          </div>
          { confirmationModal && <ConfirmationModal modalData={confirmationModal} /> }
        </div>
  )
}

export default CoursePage

   