import styles from '../Stylesheets/EnrolledCourses.module.css';
import ProgressBar from "@ramonak/react-progress-bar"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../Services/Operations/ProfileAPI'

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
  
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const getEnrolledCourses = async () => {
      try {
        const res = await getUserEnrolledCourses(token);
        setEnrolledCourses(res);

        console.log("This is res " , res)
      } catch (error) {
        console.log("Could not fetch enrolled courses." , error)
      }
    };
    useEffect(() => {
      getEnrolledCourses();
      console.log("This is enrolled courses" , enrolledCourses)
    }, [])

    return (
        <div className={styles.container}>
            {/* <nav className={styles.breadcrumb}>Home / Dashboard / <span>Enrolled Courses</span></nav> */}
            <h2 className={styles.title}>Enrolled Courses</h2>
            {/* <div className={styles.tabs}>
                <button className={styles.activeTab}>All</button>
                <button>Pending</button>
                <button>Completed</button>
            </div> */}
            <div>
                {
                    !enrolledCourses ? (
                        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        !enrolledCourses.length ? (
                            <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
                                You have not enrolled in any course yet.
                            </p>
                        ) : (
                            <div className={styles.table}>
                                <div className={styles.headerRow}>
                                    <div>Course Name</div>
                                    <div>Durations</div>
                                    <div>Progress</div>
                                </div>
                                {
                                    enrolledCourses?.map((course, index , arr) => (
                                        <div className={`${styles.courseRow} flex items-center border border-richblack-700 
                                            ${index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`} key={index}
                                        >
                                            <div className={styles.courseInfo}
                                                onClick={() => {
                                                    navigate(
                                                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                    )
                                                }}
                                            >
                                                <img src={course.thumbnail} alt="course thumb" className={styles.thumbnail} />
                                                <div>
                                                    <div className={styles.courseTitle}>{course.courseName}</div>
                                                    <div className={styles.courseDescription}>
                                                        {
                                                            course.courseDescription.length > 50
                                                            ? `${course.courseDescription.slice(0, 50)}...`
                                                            : course.courseDescription
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                
                                            <div className={styles.duration}>{course?.totalDuration || "2:30hr"} </div>
                                            <div className={styles.progress}>
                                                <div className={styles.progressText}>
                                                    Progress: {course.progressPercentage || 0}%
                                                </div>
                                                <div className={styles.progressBarContainer}>
                                                    <ProgressBar 
                                                        completed={course.progressPercentage || 0}
                                                        height="8px"
                                                        isLabelVisible={false}
                                                    />
                                                </div>
                
                                                {/* <div className={styles.actions}>
                                                    <FaEllipsisV />
                                                    <div className={styles.dropdown}>
                                                        {course.progress < 100 && <div><FaCheckCircle /> Mark as Completed</div>}
                                                        <div><FaTrashAlt /> Remove</div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    )
                }
             </div>  
        </div>   
    );
};

export default EnrolledCourses;
