import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

function ModifyUser({ show, closeModal, user }) {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const [errors, setErrors] = useState({});
  const inputFieldStyle =
    "w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: user?.street || "",
    street_number: user?.street_number || "",
  });

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  async function modifyUser(e) {
    e.preventDefault();
    console.log(`/api/user/${user.id}`);
    const response = await fetch(`/api/user/${user.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "put",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      console.log(data);
    }

    console.dir(data);

    closeModal();
    window.location.reload();
  }

  return (
    <>
      <h1 className="title">{t("modify_user_title")}</h1> {/* 3. "Felhasználó módosítása" fordítása */}

      <form
        onSubmit={modifyUser}
        className="flex flex-col items-center w-1/3 mx-auto space-y-3"
      >
        <div className="w-full">
          <label htmlFor="first_name" className="block text-sm font-medium">
            {t("first_name")} {/* 4. "Keresztnév" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="last_name" className="block text-sm font-medium">
            {t("last_name")} {/* 5. "Vezetéknév" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="email" className="block text-sm font-medium">
            {t("email")} {/* 6. "Email" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="phone" className="block text-sm font-medium">
            {t("phone")} {/* 7. "Telefonszám" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="street" className="block text-sm font-medium">
            {t("street")} {/* 8. "Utca" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>

        <div className="w-full">
          <label htmlFor="street_number" className="block text-sm font-medium">
            {t("house_number")} {/* 9. "Házszám" fordítása */}
          </label>
          <input
            className={inputFieldStyle}
            type="text"
            name="street_number"
            value={formData.street_number}
            onChange={handleChange}
          />
          {errors.street_number && <p className="error">{errors.street_number}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="text-blue-100 bg-transparent border border-blue-500 rounded-lg shadow hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
          >
            {t("save")} {/* 10. "Módosítás" fordítása */}
          </button>

          <button
            type="button"
            className="text-red-100 bg-transparent border border-red-500 rounded-lg shadow hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
            onClick={closeModal}
          >
            {t("cancel")} {/* 11. "Mégse" fordítása */}
          </button>
        </div>
      </form>
    </>
  );
}

ModifyUser.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    street: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    street_number: PropTypes.string,
  }).isRequired,
};

export default ModifyUser;
