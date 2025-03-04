import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import style from "../Stylesheets/CourseInfo.module.css";
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/apis";
import { useEffect, useState } from "react";
import ThumbnailUpload from "./Upload";
import { useDispatch, useSelector } from "react-redux"

const CourseForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course , editCourse } = useSelector((state) => state.course)
  const [subLink, setSubLink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [newReqInstrc, setNewReqInstrc] = useState("");
  const [requirement_instructions, setReq_Instrc] = useState([]);

  async function fetchSubLinkData() {
    try {
      setLoading(true);
      const res = await apiConnector("GET", categories.CATEGORIES_URL);
      console.log(res.data.allCategory);
      setSubLink(res.data.allCategory);
      setLoading(false);
    } catch (error) {
      console.log("Fail to fetch the sublink data.");
      console.log(error.message);
    }
  }

  function handleTagFunction(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTag = event.target.value.trim();

      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }

      event.target.value = "";
    }
  }

  function removeReq_Instrc(index) {
    setReq_Instrc(requirement_instructions.filter((_, i) => i !== index));
  }

  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index));
  }

  function handleAddReq_Instrc(event) {
    event.preventDefault();

    if (!newReqInstrc.trim()) return;

    if (!requirement_instructions.includes(newReqInstrc.trim())) {
      const updatedList = [...requirement_instructions, newReqInstrc.trim()];
      setReq_Instrc(updatedList);
    }

    setNewReqInstrc("");
  }

  useEffect(() => {
    if(editCourse) {
      setValue("CourseTitle" , course.courseName)
      setValue("CourseShortDesc" , course.courseDescription)
      setValue("CoursePrice" , course.price)
      setValue("CourseTags" , course.tag)
      setValue("CourseBenifits" , course.whatYouWillLearn)
      setValue("CourseCategory" , course.Category)
      setValue("courseRequirements", course.instructions)
      setValue("CourseThumbnail" , course.thumbnail)
    }

    fetchSubLinkData();
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if(
      currentValues.courseTitle !== course.courseName ||
      currentValues.CourseShortDesc !== course.courseDescription || 
      currentValues.CoursePrice !== course.CoursePrice || 
      currentValues.CourseTags.toString() !== course.tag.toString() || 
      currentValues.CourseBenifits !== course.whatYouWillLearn ||
      currentValues.CourseCategory !== course.Category || 
      currentValues.courseRequirements.toString() !== course.instructions.toString() || 
      currentValues.CourseThumbnail !== course.thumbnail
    ) {
      return true
    } 
    else {
      return false
    }
  }

  const onSubmit = async (data) => {
    if(editCourse) {
      if(isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("courseId" , course._id)
        if(currentValues.courseTitle !== course.courseName) {
          formData.append("CourseName" , data.courseTitle)
        }
        if(currentValues.CourseShortDesc !== course.courseDescription) {
          formData.append("courseDescription" , data.CourseShortDesc)
        }
        if(currentValues.CoursePrice !== course.CoursePrice) {
          formData.append("CoursePrice" , data.CoursePrice)
        }
        if(currentValues.CourseTags.toString() !== course.tag.toString()) {
          formData.append("tag" , data.CourseTags)
        }
        if(currentValues.CourseBenifits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn" , data.CourseBenifits)
        }
        if(currentValues.CourseCategory._id !== course.Category._id) {
          formData.append("Category" , data.CourseCategory)
        }
        if(currentValues.CourseThumbnail !== course.thumbnail) {
          formData.append("thumbnail" , data.CourseThumbnail)
        }
        if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions" , JSON.stringify(data.courseTitle))
        }

        setLoading(true)
        const result = await editCourseDetails(formData , token)
        setLoading(false)

        if(result) {
          dispatch(setSteps(2))
          dispatch(setCourse(result))
        } 
      } else {
        toast.error("No Changes made to the form.")
      }

      return 
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)

    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="courseTitle">
            Course Title <span className={style.asterisk}>*</span>
          </label>
          <input
            placeholder="Course Title"
            id="courseTitle"
            type="text"
            {...register("courseTitle", {
              required: "Course Title is required",
            })}
            className={style.inputField}
          />
          {errors.courseTitle && (
            <span className={style.error}>{errors.courseTitle.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="courseDescription">
            Course Short Description <span className={style.asterisk}>*</span>
          </label>
          <textarea
            placeholder="Course Description"
            id="courseDescription"
            {...register("courseDescription", {
              required: "Course description is required",
            })}
            className={style.inputField}
          />
          {errors.courseDescription && (
            <span className={style.error}>
              {errors.courseDescription.message}
            </span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">
            Price <span className={style.asterisk}>*</span>
          </label>
          <input
            placeholder="Price"
            id="price"
            type="number"
            {...register("price", { required: "Price is required" })}
            className={style.inputField}
          />
          {errors.price && (
            <span className={style.error}>{errors.price.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="category">
            Category <span className={style.asterisk}>*</span>
          </label>
          <div className={style.selectWrapper}>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={style.inputField}
              disabled={loading}
            >
              <option value="" selected disabled>
                {loading ? "Loading categories..." : "Choose a Category"}
              </option>
              {subLink.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.category && (
            <span className={style.error}>{errors.category.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="tag">
            Tag <span className={style.asterisk}>*</span>
          </label>
          <div className={style.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={style.tag}>
                {tag}
                {"  "}
                <button
                  className={style.closeButton}
                  onClick={() => removeTag(index)}
                >
                  x
                </button>
              </span>
            ))}
          </div>

          <input
            placeholder="Tags"
            id="tag"
            name="tag"
            type="text"
            className={style.inputField}
            {...register("tag", { required: "Tag is required" })}
            onKeyDown={handleTagFunction}
          />
          {tags.length === 0 && errors.tag && (
            <span className={style.error}>{errors.tag.message}</span>
          )}
        </div>

        <ThumbnailUpload setValue={setValue} />

        <div className={style.formGroup}>
          <label htmlFor="Benifits">
            Course Benifits <span className={style.asterisk}>*</span>
          </label>
          <textarea
            placeholder="Benifits"
            id="Benifits"
            name="Benifits"
            {...register("Benifits", { required: "Benifits is required" })}
            className={style.inputField}
          ></textarea>
          {errors.Benifits && (
            <span className={style.error}>{errors.Benifits.message}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="Requirement_Instructions">
            Requirement/Instructions<span className={style.asterisk}>*</span>
          </label>
          <input
            placeholder="Requirement / Instructions"
            name="Requirement_Instructions"
            id="Requirement_Instructions"
            type="text"
            className={style.inputField}
            {...register("Requirement_Instructions", {
              required: "Requirement/Instructions are required",
            })}
            value={newReqInstrc}
            onChange={(e) => setNewReqInstrc(e.target.value)}
          />

          <button className={style.addBtn} onClick={handleAddReq_Instrc}>
            Add
          </button>

          <div className={style.Req_Instrc_container}>
            {requirement_instructions.map((req_instrc, index) => (
              <span key={index} className={style.req_instrc}>
                {req_instrc}
                <button
                  className={style.closeButton}
                  onClick={() => removeReq_Instrc(index)}
                >
                  clear
                </button>
              </span>
            ))}
          </div>
          {requirement_instructions.length === 0 &&
            errors.Requirement_Instructions && (
              <span className={style.error}>
                {errors.Requirement_Instructions.message}
              </span>
            )}
        </div>

        <div className={style.formGroup}>
          <button type="submit" className={style.submitButton}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
