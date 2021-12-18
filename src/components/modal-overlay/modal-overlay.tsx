import modalOverlay from "./modal-overlay.module.css";
import PropTypes from 'prop-types';

const ModalOverlay = (props) => {
    const {children, onClose} = props;

    const handleCloseModal = (e) => {
        if(e.target === document.querySelector('div[data-name="overlay"]')){
            onClose()
        }
    };

    return (
        <div className={modalOverlay.wrapper} data-name="overlay" onClick={handleCloseModal}>
            {children}
        </div>
      );
};

// ModalOverlay.propsType ={
//     props: PropTypes.object,
// };

export default ModalOverlay;