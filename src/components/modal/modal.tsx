import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import ModalStyle from './modal.module.css';

const Modal = (props) => {
    const {header, onClose} = props;
    const modalRoot = document.getElementById("reactModals")!;

    React.useEffect(() => {
        const close = (e) => {
          if(e.keyCode === 27){
            onClose()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    return ReactDOM.createPortal(
        <ModalOverlay  onClose={onClose}>
            <div className={`${ModalStyle.modalWrapper} pl-10 pt-10 pr-10 pb-15`}>
                <section className={ModalStyle.header}>
                    <p className="text text_type_main-large">{header}</p> 
                    <CloseIcon type="primary" onClick={onClose}/>
                </section>
                {props.children}
            </div>
        </ModalOverlay>
        ,
        modalRoot
      );
};  

Modal.propTypes  = {
  header: PropTypes.oneOfType([
    PropTypes.string, PropTypes.oneOf([null])]).isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
]).isRequired
}


export default Modal;