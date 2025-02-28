import style from '../Stylesheets/createCourse.module.css'
import CourseInfoForm from '../Components/CourseInfoForm'
import { useState } from 'react';

const CreateCourse = () => {

  const [currentStep, setCurrentStep] = useState(1); // Track active step

  const coursePublishingSteps = [
    { stepNo: 1, name: "Course Information", isActive: currentStep >= 1 },
    { stepNo: 2, name: "Course Builder", isActive: currentStep >= 2 },
    { stepNo: 3, name: "Publish", isActive: currentStep >= 3 }
  ];


  return (
    <div className={style.container}>
        <div className={style.CourseProgress}>
            <b style={{fontSize:"20px"}}>Add Course</b>
            <div className={style.CoursePublishTracker}>
              {
                coursePublishingSteps.map((step, index) => (
                  <div key={index} className={`${style.step} ${step.isActive ? style.activeStep : ''}`}>
                    <div className={style.stepNo}>{step.stepNo}</div>
                    <span className={style.name}>{step.name}</span>

                    {
                      index !== coursePublishingSteps.length - 1 && (
                        <div className={style.connector}></div>
                      )
                    }
                  </div>
                ))
              }
            </div>

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