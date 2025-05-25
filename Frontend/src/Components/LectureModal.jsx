/* eslint-disable react/prop-types */
import style from '../Stylesheets/LectureModal.module.css'
import { RxCross2 } from "react-icons/rx"
import Upload from '../Components/Upload'
import { useDispatch , useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createSubSection, updateSubSection } from '../Services/Operations/CourseDetailsAPI';
import { setCourse } from '../Store/Slice/courseSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const LectureModal = ({ lectureData , setLectureData , add = false , edit = false , view = false }) => {
    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
      const dispatch = useDispatch()
      const { token } = useSelector((state) => state.auth)
      const { course } = useSelector((state) => state.course)

      useEffect(() => {
        if(view || edit) {
            setValue("lectureTitle" , lectureData.lectureTitle )
            setValue("lectureDescription" , lectureData.lectureDescription)
            setValue("lectureVideo", lectureData.lectureVideo)
        }
      } , [lectureData, view, edit, setValue])

      const isFormUpdated = () => {
        const currentValues = getValues()

        if(
            currentValues.lectureTitle !== lectureData.lectureTitle ||
            currentValues.lectureDescription !== lectureData.lectureDescription ||
            currentValues.lectureVideo !== lectureData.lectureVideo
        ) {
            return true
        } 
        return false
      }

      const handleEditSubSection = async () => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId" , lectureData.sectionId)
        formData.append("SubSectionId" , lectureData._id)

        if(lectureData.lectureTitle !== currentValues.lectureTitle) {
            formData.append("lectureTitle" , currentValues.lectureTitle)
        } 
        if(lectureData.lectureDescription !== currentValues.lectureDescription) {
            formData.append("lectureDescription" , currentValues.lectureDescription)
        } 
        if(lectureData.lectureVideo !== currentValues.lectureVideo) {
            formData.append("lectureVideo" , currentValues.lectureVideo)
        } 

        const result = await updateSubSection(formData , token)
        if(result) {
            const updatedCourseContent = course.updatedCourse.courseContent.map((section) =>
                section._id === lectureData.sectionId ? result : section
            );            

            const updatedCourse = { ...course , courseContent : updatedCourseContent }
            dispatch(setCourse(updatedCourse))
        }
        setLectureData(null)
      }

    async function onSubmit(data) {
        if (view) return 

        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            } else {
                handleEditSubSection()
            }
            return
        }

        const formData = new FormData()
        formData.append("sectionId" , lectureData.sectionId)
        formData.append("lectureTitle" , data.lectureTitle)
        formData.append("lectureDescription" , data.lectureDescription)
        formData.append("lectureVideo" , data.lectureVideo)
        
        const result = await createSubSection(formData , token)
        
        if(result) {
            const updatedCourseContent = course.updatedCourse.courseContent.map((section) => (
                section._id === result.updateSection._id ? {...section , subSection: result.updateSection.subSection} : section
            ))

            console.log(updatedCourseContent)
            const updatedCourse = { 
                ...course , 
                updatedCourse : {
                    ...course.updatedCourse,
                    courseContent: updatedCourseContent
                }
            }
            console.log(updatedCourse)
            dispatch(setCourse(updatedCourse))
        }
        setLectureData(null)
        console.log(course)
    }

    return (
        <div className={style.container}>
            <div className={style.modal}>
                <div className={style.head}>
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                    <button onClick={() => setLectureData(null)}>
                        <RxCross2 />
                    </button>
                </div>
                <div className={style.lectureDetails}>
                    <form onClick={handleSubmit(onSubmit)}>
                        <Upload 
                            name="lectureVideo"
                            label={`Video`}
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            video={true} 
                            viewData={view ? lectureData.lectureVideo : null}
                            editData={edit ? lectureData.lectureVideo : null}

                        />
                        <label htmlFor='lectureTitle'>
                            {lectureData?.inputField2} {!view && <sup style={{color:"red"}}>*</sup>}
                        </label>
                        <input 
                            disabled={view}
                            id='lectureTitle'
                            name='lectureTitle'
                            type='text'
                            placeholder='Lecture Title'
                            {...register("lectureTitle" , { required : "Lecture title is required." })}
                            className={style.input}
                        />
                        {
                            errors.lectureTitle && <span className={style.error}>{errors.lectureTitle.message}</span>
                        }

                        <label htmlFor='lectureDescription'>
                            {lectureData?.inputField3} {!view && <sup style={{color:"red"}}>*</sup>}
                        </label>
                        <textarea 
                            disabled={view}
                            type='text'
                            id='lectureDescription'
                            name='lectureDescription'
                            placeholder='Lecture Description'
                            {...register("lectureDescription" , { required : "Lecture Description is required." })}
                            className={style.input}
                        />
                        {
                            errors.lectureDescription && <span className={style.error}>{errors.lectureDescription.message}</span>
                        }

                        {
                            !view ? (
                                edit ? (
                                    <button className={style.submitButton}>
                                        Save Changes
                                    </button>
                                ) : (
                                    <button className={style.submitButton}>
                                        {lectureData?.btnText}
                                    </button>
                                )
                            ) : (
                                <></>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LectureModal