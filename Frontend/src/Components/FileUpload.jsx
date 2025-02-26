import style from '../Stylesheets/Fileupload.module.css'
import { FiUpload } from "react-icons/fi"; 
import { useDropzone } from "react-dropzone";



const FileUpload = () => {
  return (
    <div className={style.fileuploadcontainer}>
      <label className={style.uploadbox}>
        <div className={style.uploadcontent}>
            <FiUpload className={style.uploadIcon} />   
            Drag and drop an image, or Browse
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
