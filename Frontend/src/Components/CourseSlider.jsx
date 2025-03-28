/* eslint-disable react/prop-types */

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination } from "swiper/modules";
import Course_Cards from './Course_Cards'

const CourseSlider = ({courses}) => {
  return (
    <div >
      {
        courses?.length ? (
          <Swiper 
            modules={[FreeMode, Pagination]}
            spaceBetween={25}
            slidesPerView={1}
            pagination
            loop={true}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            
                {
                  courses.map((course , index) => (
                    <SwiperSlide key={index}>
                        <Course_Cards course={course} />
                    </SwiperSlide>  
                  ))
                }
          </Swiper>
        ) : (
            <p>No Course Found </p>
        )
      }
    </div>
  )
}

export default CourseSlider