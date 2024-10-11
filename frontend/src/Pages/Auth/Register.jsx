import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const inputFieldStyle =
    "w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

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
      <h1 className="title">Regisztráció</h1>

      <form onSubmit={handleRegister} className=" flex flex-col items-center w-1/3 mx-auto space-y-3">
        <div className="w-full">
          <input
            className={inputFieldStyle}
            type="text"
            placeholder="Vezetéknév"
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
            placeholder="Keresztnév"
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
            placeholder="Email cím"
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
            placeholder="Jelszó"
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
            placeholder="Jelszó újra"
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
            placeholder="Telefonszám"
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
            placeholder="Utca"
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
            placeholder="Házszám"
            value={formData.street_number}
            onChange={(e) =>
              setFormData({ ...formData, street_number: e.target.value })
            }
          />
          {errors.street_number && (
            <p className="error">{errors.street_number}</p>
          )}
        </div>
        <button className="text-gray-100 bg-transparent border border-gray-100 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 px-6 py-3">Regisztráció</button>
      </form>
    </>
  );
}
