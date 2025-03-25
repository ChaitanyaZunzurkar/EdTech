import { useEffect, useState } from 'react';
import style from '../Stylesheets/CategoryPage.module.css'
import Course_Cards from './Course_Cards';
import CourseSlider from './CourseSlider';
import { useParams } from 'react-router-dom'
import { apiConnector } from '../Services/apiConnector'
import { categories} from '../Services/apis'
import { getCategoryPageDetails } from '../Services/Operations/CatelogApis'

export default function CatagoryPage() {    
    const { catalogName } = useParams();
    const [catalogPageData , setCatelogPageData] = useState(null)
    const [catagoryId , setCatagoryId] = useState("")

    useEffect(() => {
        
        const getCategories = async () => {

            const res = await apiConnector('GET' , categories.CATEGORIES_URL)
            console.log("campare" , catalogName.toLowerCase())
            console.log(res?.data?.allCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase())
            const category_id = res?.data?.allCategory?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName.toLowerCase())
            setCatagoryId(category_id)
        }

        getCategories()
        console.log("id" , catagoryId)
    } , [catalogName])

    useEffect(() => {
        const getCategoryDetails = async () => {
            try {
                const res = await getCategoryPageDetails(catagoryId)
                console.log("This is res " , res)
                setCatelogPageData(res)
            } catch(error) {
                console.log("Fail to fetch category page details.")
                console.log(error.message)
            }
            console.log("catelog page data" , catalogPageData)
        }

        getCategoryDetails()
    } , [catagoryId])

    return (
        <div className={style.container}>
            <div className={style.contentBox}>
                <div className={style.pages}>
                    <p className={style.home}>Home</p>
                    <p className={style.home}>Catelog</p>
                    <p className={style.category}>{catalogName}</p>
                </div>
                <h1 className={style.heading}>
                    {catalogName}
                </h1>
                <p className={style.description}>
                    {}
                </p>
            </div>

            {/* section 1 */}
            <div className={style.coursesToGetYouStarted}>
                <h1 className={style.heading}>
                    Courses to get you started
                </h1>
                <div className={style.typeOfCourses}>
                    <p>Most Popular</p>
                    <p>Trending</p>
                    <p>Other</p>
                </div>
                <CourseSlider />
            </div>

            {/* section 2 */}
            <div className={style.topSellingCourses}>
                <h1 className={style.heading}>
                    Top courses in Python and Machine Learning
                </h1>
                <CourseSlider />
            </div>

            {/* section 3 */}
            <div className={style.frequentlyBroughtCourse}>
                <h1 className={style.heading}>
                    Frequently Bought Together
                </h1>
                <Course_Cards />
            </div>

            {/* footer  */}
        </div>
    );
}



