/* eslint-disable react/prop-types */
import style from '../Stylesheets/CourseCards.module.css'

const CourseCards = ({ currentCourse }) => {

    return (
        <div className={style.container}>
            {
                console.log(currentCourse)
            }
            {
                currentCourse.map((course , index) => (
                    <div className={style.card} key={index}>
                        <b>{course.heading}</b>
                        <p>
                            {course.description} 
                        </p>

                        <div className={style.btnSection}>
                            <button >{course.level} </button>
                            <button >{course.lessionNumber} </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CourseCards