/* eslint-disable react/prop-types */
import styles from '../Stylesheets/Course_cards.module.css'
import GetAvgRating from '../utils/avgRating'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStar'
import { useEffect, useState } from 'react'

const Course_Cards = ({course}) => {
  const [avgReviewCount , setAvgRating] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgRating(count)
  } , [course])

  return (
    <div className={styles.container}>
        <Link to={`/courses/${course._id}`}>
          <div className={styles.cardContainer}>
            <div className={styles.thumbnailWrapper}>
              <img
                src={course?.thumbnail}
                alt="course thumbnail"
                className={styles.thumbnail}
              />
            </div>
            <div className={styles.courseDetails}>
              <p className={styles.courseTitle}>{course?.courseName}</p>
              <p className={styles.instructorName}>
                {course?.instructor?.firstName} {course?.instructor?.lastName}
              </p>
              <div className={styles.ratingSection}>
                <span className={styles.avgReview}>{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount} />
                <span className={styles.totalRatings}>
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
              <p className={styles.coursePrice}>Rs. {course?.price}</p>
            </div>
        </div>
        </Link>
    </div>
  )
}

export default Course_Cards