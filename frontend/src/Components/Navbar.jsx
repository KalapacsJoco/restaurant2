import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import { useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, token, setToken, cart } = useContext(AppContext);
  const buttonStyle =
    "text-gray-100 bg-transparent border border-gray-100 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 px-6 py-3";

  const totalQty = Object.values(cart).reduce((total, dish) => {
    return total + (dish.qty || 0); // Biztosítjuk, hogy ha nincs qty, akkor 0-t adjon
  }, 0);

  async function handleLogout(e) {
    e.preventDefault();

    const res = await fetch("/api/logout", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <>
      <header className="border-b-2 h-16 items-center text-gray-100 ">
        <nav className="flex justify-between h-3/4 ">
          <Link to="/" className={buttonStyle}>
            Home
          </Link>
          {user ? (
            <div className="flex">
              <div>Üdv újra {user.first_name}</div>
              {location.pathname === "/dishes" ? (
                <Link to="/order">
                  Kosár tartalma <span>{totalQty}</span>
                </Link>
              ) : (
                <Link to="/dishes">
                  Vissza az ételekhez
                </Link>
              )}

              {/* <button className="button-52" role="button">
                Button 52
              </button> */}
              <form onSubmit={handleLogout}>
                <button className={buttonStyle}> Kijelentkezés</button>
              </form>
            </div>
          ) : (
            <div>
              <Link to="/login" className={buttonStyle}>
                Login
              </Link>
              <Link to="/register" className={buttonStyle}>
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
