/* eslint-disable react/prop-types */
import style from '../Stylesheets/LectureModal.module.css'
import { RxCross2 } from "react-icons/rx"
import Upload from '../Components/Upload'
// import { useDispatch , useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

const LectureModal = ({ lectureData }) => {
    const {
        register,
        setValue,
        // getValues,
        formState: { errors },
      } = useForm();
    
    //   const dispatch = useDispatch()
    //   const { token } = useSelector((state) => state.auth)
    //   const { course , editCourse } = useSelector((state) => state.course)

    return (
        <div className={style.container}>
            <div className={style.modal}>
                <div className={style.head}>
                    <p>{lectureData?.head}</p>
                    <button onClick={lectureData?.CancelbtnHandler}>
                        <RxCross2 />
                    </button>
                </div>
                <div className={style.lectureDetails}>
                    <Upload 
                        name="lectureVideo"
                        label={lectureData?.inputField1}
                        register={register}
                        setValue={setValue}
                        errors={errors}
                    />
                    <label htmlFor='lectureTitle'>{lectureData?.inputField2}</label>
                    <input 
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

                    <label htmlFor='lectureDescription'>{lectureData?.inputField3}</label>
                    <textarea 
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

                    <button type="submit" className={style.submitButton} onClick={lectureData?.SavebtnHandler}>
                        {lectureData?.btnText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LectureModal