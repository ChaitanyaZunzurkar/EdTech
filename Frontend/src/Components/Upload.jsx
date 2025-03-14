/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import style from "../Stylesheets/Upload.module.css";

export default function ThumbnailUpload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: false,
    noKeyboard: false,
    accept: !video ? { "image/*": [".jpeg", ".jpg", ".png"] } : { "video/*": [".mp4"] },
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className={style.thumbnailContainer}>
      <label className={style.label} htmlFor={name}>
        {label} {!viewData && <sup className={style.asterisk}>*</sup>}
      </label>
      <div
        className={`${isDragActive ? style.active : style.inactive} ${style.dropzone}`}
        {...getRootProps()}
        onClick={() => inputRef.current?.click()}
      >
        <input {...getInputProps()} ref={inputRef} />
        {previewSource ? (
          <div className={style.previewContainer}>
            {!video ? (
              <img src={previewSource} alt="Preview" className={style.previewImage} />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className={style.cancelButton}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className={style.placeholderContent}>
            <div className={style.iconWrapper}>
              <FiUploadCloud className={style.uploadIcon} />
            </div>
            <p className={style.uploadText}>
              Drag and drop an {!video ? "image" : "video"}, or click to <span className={style.browseText}>Browse</span> a file
            </p>
            <ul className={style.uploadGuidelines}>
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className={style.errorText}>{label} is required</span>
      )}
    </div>
  );
}