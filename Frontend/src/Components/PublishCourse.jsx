import { useForm } from "react-hook-form"
import style from '../Stylesheets/PublishCourse.module.css'
import { resetCourseState, setStep } from "../Store/Slice/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { COURSE_STATUS } from '../utils/constants'
import { useNavigate } from "react-router-dom"
import { editCourseDetails } from "../Services/Operations/CourseDetailsAPI";

const PublishCourse = () => {
  const { register , handleSubmit , setValue , getValues } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token} = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course) 
  // const [loading , setLoading] = useState(false);
  
  const onSubmit = async () => {
      if(
        (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) || 
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
      ) {
        goToCourse();
        return
      }

      const formData = new FormData();
      formData.append("courseId" , course.updatedCourse._id)

      const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
      formData.append("status" , courseStatus)

      // setLoading(true)
      const result = await editCourseDetails(formData , token);
      if(result) {
        goToCourse()
      }
      // setLoading(false)
  }

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public" , true)
    }
  } , [])

  const goToCourse = () => {
    dispatch(resetCourseState())
    navigate('/dashboard/my-courses')
  }
  
  return (
    <div className={style.container}>
      <span className={style.StateTitle}>Publish Course</span>
      <form onSubmit={handleSubmit(onSubmit)} className={style.publishForm}>
          <label className={style.publishlabel}>
            <input 
              type="checkbox"
              name="public"
              id="public"
              className={style.input}
              {...register("public")}
            />
            <span className={style.label}>Make this course Public</span>
          </label>

          <div className={style.btnSection}>
              <button 
                type="button"
                className={style.backBtn} 
                onClick={() => {
                  setStep(2)
                }}
              >
                Back
              </button>
              <button 
                type="submit"
                className={style.saveBtn}
              >
                Save and Publish
              </button>
          </div>
      </form>
    </div>
  )
}

export default PublishCourse