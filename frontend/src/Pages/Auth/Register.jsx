import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

export default function Register() {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const inputFieldStyle =
    "text-gray-100 w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    street: "",
    street_number: "",
  });

  const [errors, setErrors] = useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch("/api/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
      console.log(data);
    }

    console.dir(data);
  }

  return (
    <>
      <h1 className="title">{t("register_title")}</h1> {/* 3. "Regisztráció" fordítása */}

      <form
        onSubmit={handleRegister}
        className="flex flex-col items-center w-1/3 mx-auto space-y-3"
      >
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("first_name_placeholder")} 
            value={formData.first_name}
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("last_name_placeholder")} 
            value={formData.last_name}
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("email_placeholder")} 
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="password"
            placeholder={t("password_placeholder")} 
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="password"
            placeholder={t("password_confirmation_placeholder")} 
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
          />
          {errors.password_confirmation && (
            <p className="error">{errors.password_confirmation}</p>
          )}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("phone_placeholder")} 
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("street_placeholder")} 
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />
          {errors.street && <p className="error">{errors.street}</p>}
        </div>
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder={t("house_number_placeholder")} 
            value={formData.street_number}
            onChange={(e) =>
              setFormData({ ...formData, street_number: e.target.value })
            }
          />
          {errors.street_number && (
            <p className="error">{errors.street_number}</p>
          )}
        </div>
        <button className="text-blue-100 bg-transparent border border-blue-100 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-6 py-3">
          {t("register_button")} {/* 12. "Regisztráció" fordítása */}
        </button>
      </form>
    </>
  );
}
