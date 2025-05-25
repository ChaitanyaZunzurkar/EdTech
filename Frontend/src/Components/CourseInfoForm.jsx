import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import style from "../Stylesheets/CourseInfo.module.css";
import { apiConnector } from "../Services/apiConnector";
import { categories } from "../Services/apis";
import { useEffect, useState } from "react";
import ThumbnailUpload from "./Upload";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from '../utils/constants';
import { setCourse , setStep } from '../Store/Slice/courseSlice.js';
import { createCourse , editCourseDetails } from "../Services/Operations/CourseDetailsAPI.js";

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
      setValue("courseTitle", course.courseName);
      setValue("CourseShortDesc" , course.courseDescription)
      setValue("CoursePrice" , course.price)
      setValue("CourseTags" , course.tag)
      setValue("CourseBenifits" , course.whatYouWillLearn)
      setValue("courseCategory", course.Category?._id || "");
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
      currentValues.category !== course.Category._id || 
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
        let formData = new FormData()

        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", currentValues.courseName);
        }
        
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", currentValues.courseDescription);
        }
        
        if (currentValues.price !== course.price) {
          formData.append("price", currentValues.price);
        }

        if (JSON.stringify(currentValues.tag) !== JSON.stringify(course.tag)) {
          formData.append("tag", JSON.stringify(currentValues.tag));
        }
        
        if (currentValues.Category !== course.Category) {
          formData.append("Category", currentValues.Category);
        }
        
        if (currentValues.CourseThumbnail && currentValues.CourseThumbnail[0] !== course.thumbnail) {
          formData.append("thumbnail", currentValues.CourseThumbnail[0]);
        }
        
        if (JSON.stringify(currentValues.instructions) !== JSON.stringify(course.instructions)) {
          formData.append("instructions", JSON.stringify(currentValues.instructions));
        }
        
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", currentValues.whatYouWillLearn);
        }
        
        setLoading(true)
        const result = await editCourseDetails(formData , token)
        setLoading(false)

        if(result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        } 
      } else {
        toast.error("No Changes made to the form.")
      }

      return 
    }

    let formData = new FormData()
    formData.append("courseName", data.CourseTitle);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("tag", JSON.stringify(data.tag));
    formData.append("whatYouWillLearn", data.Benifits);
    formData.append("Category", data.category);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("instructions", JSON.stringify(data.Requirement_Instructions));
    formData.append("thumbnail", data.courseImage);

    setLoading(true)

    const result = await createCourse(formData, token)
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
            {...register("CourseTitle", {
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

        <ThumbnailUpload 
          name="courseImage"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
        />

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
            onChange={(e) => setNewReqInstrc(e.target.value)}  // Ensure state updates
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
