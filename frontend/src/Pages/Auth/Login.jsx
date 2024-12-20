import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

export default function Login() {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const inputFieldStyle =
    "text-gray-100 w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("/api/login", {
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
      navigate("/dishes");
    }
  }

  return (
    <>
      <h1 className="title">{t("login_title")}</h1> {/* 3. "Bejelentkezés" fordítása */}

      <form onSubmit={handleLogin} className="w-1/3 mx-auto space-y-6">
        <div>
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
        <div>
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

        <button className="text-blue-100 bg-transparent border border-blue-100 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-6 py-3">
          {t("login_button")} {/* 6. "Bejelentkezés" gomb fordítása */}
        </button>
      </form>
    </>
  );
}
