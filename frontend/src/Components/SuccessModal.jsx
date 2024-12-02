import PropTypes from "prop-types";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

function SuccessModal({ show, onClose }) {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat

  if (!show) return null; // Ha show false, nem renderel semmit

  return (
    <div className="success-modal-container fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-green-500">{t("order_successful_title")}</h1> {/* 3. "Rendelés sikeres" fordítása */}
        <p className="text-gray-700 mt-2">{t("order_successful_message")}</p> {/* 4. "Rendelését rögzítettük! Köszönjük." fordítása */}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
        >
          {t("close")} {/* 5. "Bezárás" fordítása */}
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
