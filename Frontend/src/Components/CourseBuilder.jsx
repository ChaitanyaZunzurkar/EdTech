import { useState } from "react";
import { PlusCircle } from "lucide-react";
import style from "../Stylesheets/CourseBuilder.module.css";
import SectionBlock from "./SectionBlock";
import { toast } from 'react-hot-toast'
import { createSection, updateSubSection } from '../Services/Operations/CourseDetailsAPI'
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setCourse, setEditCourse, setStep} from "../Store/Slice/courseSlice"

const CourseBuilder = () => {
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  // const [loading , setLoading] = useState(false)
  const [editSectionName , setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm()

  async function onSubmit(data) {
    let result 
    if(editSectionName) {
      result = await updateSubSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course.courseDetails?._id || course.updatedCourse?._id
      } , token)

    } else {
      console.log(course)
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course.courseDetails?._id || course.updatedCourse?._id
      } , token)
      console.log(course)
    }

    if(result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName" , "")
    }
    // setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName" , "")
  }

  const handleEditSectionName = (sectionId , sectionName) => {
    if(sectionId === editSectionName) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goNext = () => {
    if(course?.updatedCourse?.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if(course?.updatedCourse?.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add atleast one lecture in sub-section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className={style.coursebuilder}>
      <h2 className={style.title}>Course Builder</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text" 
          {...register("sectionName" , { required: true})}
          placeholder="Add a section to build your course"
          className={style.input}
          required
        />
        {
          errors.sectionName && <span className={style.error}>{errors.sectionName.message}</span>
        }
        {
          course?.updatedCourse?.courseContent?.length > 0 &&
          course.updatedCourse.courseContent.map((section, index) => (
            <SectionBlock key={index} sectionName={section.sectionName} />
          ))
        }
        {
          editSectionName ? (
            <>  
                <button type="submit" className={style.createbutton}>
                  <PlusCircle size={18} />
                  Create Section
                </button>

                <button type="button" className={style.createbutton} onClick={handleEditSectionName}>
                  <PlusCircle size={18} />
                  Edit Section
                </button>
            </>
          ) : (
            <button type="submit" className={style.createbutton}>
              <PlusCircle size={18} />
              Create Section
            </button>
          )
        }
        {
          editSectionName && 
          <button 
            type="button"
            onClick={cancelEdit}
          >
            Cancel Edit
          </button>
        }
       </form>

       <div className={style.btnContainer}>
        <button className={style.backButton} onClick={goBack}>
          <span className={style.icon}>&larr;</span> Back
        </button>
        <button className={style.nextButton} onClick={goNext}>
          Next <span className={style.icon}>&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default CourseBuilder;
