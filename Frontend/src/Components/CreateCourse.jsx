import style from '../Stylesheets/createCourse.module.css'
import CourseInfoForm from '../Components/CourseInfoForm'

const CreateCourse = () => {
  return (
    <div className={style.container}>
        <div className={style.CourseProgress}>
            <b style={{fontSize:"20px"}}>Add Course</b>
            <CourseInfoForm />
        </div>

        <div className={style.instructionsToCreateCourse}>
            <div className={style.tipsContainer}>
              <h3 className={style.heading}>
                ⚡ Course Upload Tips
              </h3>
              <ul className={style.list}>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024×576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important updates.</li>
                <li>Notes to all enrolled students at once.</li>
              </ul>
            </div>
        </div>
    </div>
  )
}

export default CreateCourse