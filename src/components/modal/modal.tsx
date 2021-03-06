import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { IModal } from '../../services/types/data';

import ModalStyle from './modal.module.css';

const Modal = (props:IModal) => {
    const {header, onClose} = props;
    const modalRoot: any = document.getElementById("reactModals");

    React.useEffect(() => {
        const close = (e: KeyboardEvent) => {
          if(e.key === "Escape"){
            onClose()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[onClose])

    return ReactDOM.createPortal(
        <ModalOverlay  onClose={onClose}>
            <div className={`${ModalStyle.modalWrapper} pl-10 pt-10 pr-10 pb-15`}>
                <section className={ModalStyle.header}>
                    <p className="text text_type_main-large">{header}</p> 
                    <span className='icon_close'><CloseIcon type="primary" onClick={onClose}/></span>
                </section>
                {props.children}
            </div>
        </ModalOverlay>
        ,
        modalRoot
      );
};  


export default Modal;