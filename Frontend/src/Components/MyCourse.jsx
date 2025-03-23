import style from '../Stylesheets/MyCourse.module.css'
import { PlusCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { getInstructorCourses } from '../Services/Operations/CourseDetailsAPI'
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri"
import { MdEdit } from "react-icons/md"

const MyCourse = () => {
    const { token } = useSelector((state) => state.auth)
    // const { course } = useSelector((state) => state.course)
    // const dispatch = useDispatch()
    const [courses , setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await getInstructorCourses(token)
                if (result) {
                    setCourses(result)
                }
            } catch (error) {
                console.error("Error fetching courses:", error)
            }
        }
        if (token) fetchCourses()
    }, [token])


    return (
        <div className={style.container}>
            <div className={style.head}>
                <p className={style.pageTitle}>My Courses</p>
                <button className={style.newBtn}>
                    <PlusCircle size={18} />
                    New
                </button>             
            </div>
            <div className={style.tabelContainer}>
                <Table className={style.tabel}>
                    <Thead className={style.tabelHead}>
                        <Tr className={style.tabelRow}>
                            <Th className={style.headData}>Courses</Th>
                            <Th className={style.headData}>Duration</Th>
                            <Th className={style.headData}>Price</Th>
                            <Th className={style.headData}>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody className={style.tabelBody}>
                        {courses.data?.length > 0 ? (
                            courses.data.map((course, index) => (
                                <Tr key={index} className={style.tabelRow}>
                                    <Td className={style.tabelBodyData}>
                                        <div className={style.courseOverview}>
                                            <img src={course.thumbnail} alt="Course Thumbnail" className={style.courseThumbnail} />
                                            <div className={style.Courseinfo}>
                                                <h3 className={style.courseName}>{course.courseName}:</h3>
                                                <p className={style.desc}>{course.courseDescription}</p>
                                                <p className={style.createdAt}>
                                                    {(() => {
                                                        const date = new Date(course.createdAt);
                                                        const formatter = new Intl.DateTimeFormat("en-US", {
                                                            month: "long",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true
                                                        });

                                                        return `Created: ${formatter.format(date)}`;
                                                    })()}
                                                </p>

                                                <p className={style.status}>
                                                    {
                                                        course.status === "Published" ? (
                                                            <span className={style.published}>
                                                                <FaCheckCircle color={'#FFD60A'} />
                                                                Published
                                                            </span>
                                                        ) : (
                                                            <span className={style.drafted}>
                                                                <IoTimeOutline color={'#F79CB0'} />
                                                                Drafted
                                                            </span>
                                                        )
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Td>
                                    <Td className={style.tabelBodyData}>2:30</Td> 
                                    <Td className={style.tabelBodyData}>{'\u20B9'}{course.price}</Td>
                                    <Td className={style.tabelBodyData}>
                                        <button>
                                            <MdEdit color='#6E727F' fontSize={20} />
                                        </button>
                                        <button>
                                            <RiDeleteBin6Line fontSize={18} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan="4" className={style.tabelBodyData}>
                                    <h1>No Course Found</h1>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </div>
        </div>
    )
}

export default MyCourse