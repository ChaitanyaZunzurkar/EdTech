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
  const [newReqInstrc , setNewReqInstrc] = useState('')
  const [requirement_instructions , setReq_Instrc] = useState([])
  
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
      

      function removeReq_Instrc(index) {
        setReq_Instrc(requirement_instructions.filter((_ , i) => i !== index))
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
            placeholder='Course Title'
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
            placeholder='Course Description'
            id="courseDescription"
            {...register('courseDescription', { required: 'Course description is required' })}
            className={style.inputField}
          />
          {errors.courseDescription && <span className={style.error}>{errors.courseDescription.message}</span>}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="price">Price <span className={style.asterisk}>*</span></label>
          <input
            placeholder='Price'
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
              <option value="" disabled>{loading ? "Loading categories..." : "Choose a Category"}</option>
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
                {"  "}
                <button className={style.closeButton} onClick={() => removeTag(index)}>x</button>
              </span>
            ))}
          </div>


          <input 
            placeholder='Tags'
            id='tag'
            name='tag'
            type='text'
            className={style.inputField}
            {...register('tag' , {required: "Tag is required"})}
            onKeyDown={handleTagFunction}
            
          />
          { tags.length === 0 && errors.tag && <span className={style.error}>{errors.tag.message}</span>}
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
          <label htmlFor="Benifits">Course Benifits <span className={style.asterisk}>*</span></label>
          <textarea 
            placeholder='Benifits'
            id='Benifits'
            name="Benifits"
            {...register('Benifits' , { required : "Benifits is required"})}
            className={style.inputField}
          >
          </textarea>
          { errors.Benifits && <span className={style.error}>{errors.Benifits.message}</span> }
        </div>

        <div className={style.formGroup}>
            <label htmlFor="Requirement_Instructions">Requirement/Instructions<span className={style.asterisk}>*</span></label>
            <input 
              placeholder='Requirement / Instructions'
              name='Requirement_Instructions'
              id='Requirement_Instructions'
              type='text'
              className={style.inputField}
              {...register('Requirement_Instructions' , { required: "Requirement/Instructions are required"})}
              value={newReqInstrc} 
              onChange={(e) => setNewReqInstrc(e.target.value)}
            />

            <button className={style.addBtn} onClick={handleAddReq_Instrc}>Add</button>

            <div className={style.Req_Instrc_container}>
              {requirement_instructions.map((req_instrc, index) => (
                <span key={index} className={style.req_instrc}>
                  { req_instrc }
                  <button className={style.closeButton} onClick={() => removeReq_Instrc(index)}>clear</button>
                </span>
              ))}
            </div>
            { requirement_instructions.length === 0 && errors.Requirement_Instructions && <span className={style.error}>{errors.Requirement_Instructions.message}</span>}
        </div>


        <div className={style.formGroup}>
          <button type="submit" className={style.submitButton}>Next</button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
