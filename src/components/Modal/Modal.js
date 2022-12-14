import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from 'components/Modal/Modal.module.css';

function Modal({ onClickModal, largeFoto }) {
  useEffect(() => {
    const onCloseByEscape = e => {
      if (e.code === 'Escape') {
        onClickModal();
      }
    };
    window.addEventListener('keydown', onCloseByEscape);
    return () => {
      window.removeEventListener('keydown', onCloseByEscape);
    };
  }, [onClickModal]);

  // componentDidMount() {
  //   window.addEventListener('keydown', onCloseByEscape);
  // }
  // componentWillUnmount() {
  //   window.removeEventListener('keydown', onCloseByEscape);
  // }

  const onClosebyBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClickModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={onClosebyBackdrop}>
      <div className={css.Modal}>
        <img src={largeFoto} alt="" width="800"></img>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClickModal: PropTypes.func.isRequired,
  largeFoto: PropTypes.string.isRequired,
};

export default Modal;
