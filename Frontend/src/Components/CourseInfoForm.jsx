import { useForm } from 'react-hook-form';
import style from '../Stylesheets/CourseInfo.module.css';
import { apiConnector } from '../Services/apiConnector';
import { categories } from '../Services/apis';
import { useEffect, useState } from 'react';
import { Upload } from "lucide-react";

const CourseForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [ subLink , setSubLink ] = useState([])    
  const [loading , setLoading] = useState(true)
  const [tags , setTags] = useState([])
  
      async function fetchSubLinkData() {
          try {
              setLoading(true)
              const res = await apiConnector('GET' , categories.CATEGORIES_URL);
              console.log(res.data.allCategory)
              setSubLink(res.data.allCategory);
              setLoading(false)
          } catch (error) {
              console.log("Fail to fetch the sublink data.")
              console.log(error.message)
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
      
      function removeTag(index) {
        setTags(tags.filter((_, i) => i !== index));
      }
      
  
      useEffect(() => {
          fetchSubLinkData();
      } , [])

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div className={style.formGroup}>
          <label htmlFor="courseTitle">Course Title <span className={style.asterisk}>*</span></label>
          <input
            id="courseTitle"
            type="text"
            {...register('courseTitle', { required: 'Course Title is required' })}
            className={style.inputField}
          />
          {errors.courseTitle && <span className={style.error}>{errors.courseTitle.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="courseDescription">Course Short Description <span className={style.asterisk}>*</span></label>
          <textarea
            id="courseDescription"
            {...register('courseDescription', { required: 'Course description is required' })}
            className={style.inputField}
          />
          {errors.courseDescription && <span className={style.error}>{errors.courseDescription.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">Price <span className={style.asterisk}>*</span></label>
          <input
            id="price"
            type="number"
            {...register('price', { required: 'Price is required' })}
            className={style.inputField}
          />
          {errors.price && <span className={style.error}>{errors.price.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="category">Category <span className={style.asterisk}>*</span></label>
          <div className={style.selectWrapper}>
            <select
              id="category"
              {...register("category", { required: "Category is required" })}
              className={style.inputField}
              disabled={loading}
            >
              <option value="">{loading ? "Loading categories..." : "Choose a Category"}</option>
              {subLink.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          {errors.category && <span className={style.error}>{errors.category.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="tag">Tag <span className={style.asterisk}>*</span></label>
          <div className={style.tagsContainer}>
            {tags.map((tag, index) => (
              <span key={index} className={style.tag}>
                {tag}
                <button className={style.closeButton} onClick={() => removeTag(index)}>×</button>
              </span>
            ))}
          </div>


          <input 
            id='tag'
            name='tag'
            type='text'
            className={style.inputField}
            {...register('tag' , {required: "Tag is required"})}
            onKeyDown={handleTagFunction}
            
          />
          {errors.tag && <span className={style.error}>{errors.tag.message}</span>}
        </div>


        <div className={style.thumbnailContainer}>
          <label className={style.label}>Course Thumbnail <span className={style.asterisk}>*</span></label>
          <div className={style.dropArea}>
            <div className={style.iconWrapper}>
              <Upload size={32} className={style.icon} />
            </div>
            <p className={style.text}>
              Drag and drop an image, or <span className={style.browse}>Browse</span>
            </p>
            <p className={style.subText}>Max 6MB each (12MB for videos)</p>
            <p className={style.recommendation}>
              • Aspect ratio <strong>16:9</strong> • Recommended size <strong>1024×576</strong>
            </p>
          </div>
        </div>



        <div className={style.formGroup}>
          <button type="submit" className={style.submitButton}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
