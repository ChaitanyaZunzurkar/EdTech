import { useState } from 'react'
import style from '../Stylesheets/ExploreCourses.module.css'
import SpecialText from './SpecialText'
import { HomePageExplore } from '../data/homePage-explore'
import CourseCards from "../Components/CourseCards";

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]

const ExploreCourses = () => {
    const [ currentTab , setCurrentTab  ] = useState(HomePageExplore[0])
    const [ currentCourse , setCurrentCourse ] = useState(HomePageExplore[0].courses)
    const [ activeCourse , setActiveCourse ] = useState(HomePageExplore[0])

    async function fetchCourseData(index) {
        setCurrentTab(HomePageExplore[index])
        setCurrentCourse(HomePageExplore[index].courses)
        setActiveCourse(HomePageExplore[index])
    }

    return (
        <div className={style.container}>
            <div className={style.title}>
                <b>Unlock the</b> {' '}
                <SpecialText text={`Power Of Code`} />
            </div>
            <div className={style.para}>
                <p>
                    Learn to Build Anything You Can Imagine
                </p>
            </div>

            <div className={style.nav}>
                <ul>
                    {
                        tabs.map((tab , index) => (
                            <li key={index} onClick={() => fetchCourseData(index)}>
                                { tab }
                            </li>
                        ))
                    }
                </ul>
            </div>
            <CourseCards currentCourse={currentCourse} currentTab={currentTab} activeCourse={activeCourse} />
        </div>
    )
}

export default ExploreCourses
