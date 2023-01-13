import React from 'react';

import './css/ErrorModal.css';

const ErrorModal = React.memo(({ onClose, errorMessage }) => {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{errorMessage}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;