import { useForm } from "react-hook-form"
import style from '../Stylesheets/PublishCourse.module.css'

const PublishCourse = () => {
  const { register , handleSubmit , formState: {errors}} = useForm();
  const onSubmit = async () => {
    console.log("working")
  }

  return (
    <div className={style.container}>
      <span className={style.StateTitle}>Publish Course</span>
      <form onClick={handleSubmit(onSubmit)} className={style.publishForm}>
          <label className={style.publishlabel}>
            <input 
              type="checkbox"
              name="public"
              id="public"
              className={style.input}
              {...register("public" , { required : "Please check the checkbox to proceed."})}
            />
            {
              errors.public && <span className={style.error}>{errors.public.message}</span>
            }
            <span className={style.label}>Make this course Public</span>
          </label>

          <div className={style.btnSection}>
              <button className={style.backBtn}>
                Back
              </button>
              <div className={style.courseProceedBtn}>
                <button >
                  Save as Draft
                </button>
                <button >
                  Save and Publish
                </button>
              </div>
          </div>
      </form>
    </div>
  )
}

export default PublishCourse