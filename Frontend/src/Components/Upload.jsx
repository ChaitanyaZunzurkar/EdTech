/* eslint-disable react/prop-types */
import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import style from '../Stylesheets/Upload.module.css'

const ThumbnailUpload = ({ setValue }) => {

    const [file , setFile] = useState(null)

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            const fileWithPreview = Object.assign(selectedFile, {
              preview: URL.createObjectURL(selectedFile),
            });
      
            setFile(fileWithPreview);
            setValue("thumbnail", selectedFile);
        }
    }, [setValue]);

    const { getRootProps , getInputProps , isDragActive } = useDropzone({
        onDrop,
        maxSize: 5 * 1024 * 1024, 
    })

    return (
        <div className={style.thumbnailContainer}>
            <label className={style.label}>
                Course Thumbnail <span className={style.asterisk}>*</span>
            </label>

            <div {...getRootProps()} className={style.dropArea}>
                <input {...getInputProps()}/>
                {
                    file ? (
                        <div className={style.imagePreview}>
                            <img src={file.preview} alt="Preview" className={style.thumbnail} />
                        </div>
                    ) : (
                        <>
                            <div className={style.iconWrapper}>
                                <Upload size={32} className={style.icon} />
                            </div>

                            <p className={style.text}>
                                {isDragActive ? "Drop the image here..." : "Drag and drop an image, or "}
                                <span className={style.browse}>Browse</span>
                            </p> 
                            <p className={style.subText}>Max 6MB each (12MB for videos)</p>
                            <p className={style.recommendation}>
                                • Aspect ratio <strong>16:9</strong> • Recommended size <strong>1024×576</strong>
                            </p>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default ThumbnailUpload