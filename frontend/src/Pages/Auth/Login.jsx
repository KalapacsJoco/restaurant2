import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Login() {
    const {setToken} = useContext(AppContext)
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch('/api/login', {
              headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
      method: 'post',
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // console.log(data)

    if (data.errors) {
      setErrors(data.errors);
    } else {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate("/")
    }

  }

  return (
    <>
      <h1 className="title">Bejelentkezés</h1>

      <form onSubmit={handleLogin} className="w-1/3 mx-auto space-y-6">

        <div>
          <input
          className="w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            type="text"
            placeholder="Email cím"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <input
          className="w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            type="password"
            placeholder="Jelszó"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
                    {errors.password && <p className="error">{errors.password}</p>}

        </div>

        <button className="text-gray-100 bg-transparent border border-gray-100 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 px-6 py-3">Bejelentkezés</button>
      </form>
    </>
  );
}
