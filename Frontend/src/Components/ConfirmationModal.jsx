/* eslint-disable react/prop-types */
import style from "../Stylesheets/ConfirmationModal.module.css";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <p className={style.modaltext1}>{ modalData.text1 }</p>
        <p className={style.modaltext2}>{ modalData.text2 }</p>
        <div className={style.btnContainer}> 
          <button className={style.continueBtn} onClick={modalData.btn1Handler}>
            { modalData.btn1Text }
          </button>
          <button className={style.cancelBtn} onClick={modalData.btn2Handler}>
            { modalData.btn2Text }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
