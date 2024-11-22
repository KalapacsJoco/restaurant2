import { useState } from "react";
import PropTypes from "prop-types";

function ModifyUser({ show, closeModal, user }) {
  //   console.log(user);
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
      <h1 className="title">Felhasználó Módosítása</h1>

      <form
        onSubmit={modifyUser}
        className=" flex flex-col items-center w-1/3 mx-auto space-y-3"
      >
        <div className="w-full">
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
          <input
            className={inputFieldStyle}
            type="text"
            name="street_number"
            value={formData.street_number}
            onChange={handleChange}
          />
          {errors.street_number && (
            <p className="error">{errors.street_number}</p>
          )}
        </div>
        <div className="flex flex-end">
          <button
            type="submit"
            className="text-blue-100 bg-transparent border border-blue-500 rounded-lg shadow hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
          >
            Módosítás
          </button>

          <button
            type="button"
            className="text-red-100 bg-transparent border border-red-500 rounded-lg shadow hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
            onClick={closeModal}
          >
            Mégse
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // string vagy number lehet
    first_name: PropTypes.string, // kötelező string típus
    last_name: PropTypes.string, // kötelező string típus
    email: PropTypes.string, // helyes típusa string, nincs email prop type
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // string vagy number lehet
    street: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // string vagy number lehet
    street_number: PropTypes.string, // string típus
  }).isRequired, // user prop kötelező
};

export default ModifyUser;
