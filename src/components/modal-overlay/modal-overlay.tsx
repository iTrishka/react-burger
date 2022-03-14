import modalOverlay from "./modal-overlay.module.css";
import { IModal } from "../../services/types/data";
import { MouseEvent } from "react";



const ModalOverlay = (props:IModal) => {
    const {children, onClose} = props;

    const handleCloseModal = (e: MouseEvent) => {
        if((e.target === e.currentTarget)){
            onClose()
        }
    };

    return (
        <div className={modalOverlay.wrapper} data-name="overlay" onClick={handleCloseModal}>
            {children}
        </div>
      );
};


export default ModalOverlay;