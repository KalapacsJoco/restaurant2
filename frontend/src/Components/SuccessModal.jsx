import PropTypes from "prop-types";


function SuccessModal({ show, onClose }) {
    if (!show) return null; // Ha show false, nem renderel semmit
  
    return (
      <div className="success-modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-green-500">Rendelés sikeres</h1>
          <p className="text-gray-700 mt-2">Rendelését rögzítettük! Köszönjük.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            Bezárás
          </button>
        </div>
      </div>
    );
  }

  SuccessModal.propTypes = {
    show: PropTypes.bool.isRequired, // Kötelező boolean prop
    onClose: PropTypes.func.isRequired, // Kötelező callback függvény
  };
  
  export default SuccessModal;
  