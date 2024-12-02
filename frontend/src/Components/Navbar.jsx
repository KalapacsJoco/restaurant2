import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser, token, setToken, cart, setCart } =
    useContext(AppContext);

  const { t, i18n } = useTranslation(); // Nyelvkezelés
  const buttonStyle =
    "text-gray-100 bg-transparent border border-gray-100 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 px-6 py-3 mx-2";

  const totalQty = Object.values(cart).reduce((total, dish) => {
    return total + (dish.qty || 0);
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
      setCart({});
      localStorage.removeItem("cart");
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <header className="h-16 items-center text-gray-100">
      <nav className="flex justify-between h-3/4 items-center">
        {/* Navigáció */}
        <div className="flex">
        <Link to="/" className={buttonStyle}>
          {t("home")}
        </Link>
         {/* Nyelvváltó zászlók */}
         <div className="flex items-center space-x-3 ml-5">
          <button
            onClick={() => i18n.changeLanguage("hu")}
            className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-100 hover:ring-2 hover:ring-gray-400 focus:outline-none"
          >
            <img
              src="https://flagcdn.com/w40/hu.png"
              alt="Hungarian Flag"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-100 hover:ring-2 hover:ring-gray-400 focus:outline-none"
          >
            <img
              src="https://flagcdn.com/w40/gb.png"
              alt="English Flag"
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={() => i18n.changeLanguage("ro")}
            className="w-6 h-6 rounded-full overflow-hidden border-2 border-gray-100 hover:ring-2 hover:ring-gray-400 focus:outline-none"
          >
            <img
              src="https://flagcdn.com/w40/ro.png"
              alt="Romanian Flag"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
        </div>

        {user ? (
          <div className="flex">
            <div className="flex items-center mx-5">
              {t("welcome_back", { name: user.first_name })}
            </div>

            {!user.is_admin && (
              location.pathname === "/dishes" ? (
                <Link
                  to="/order"
                  className="mx-5 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {t("cart_contents")}
                  <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {totalQty}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/dishes"
                  className="mx-5 text-blue-100 bg-transparent border border-blue-100 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-6 py-3"
                >
                  {t("back_to_dishes")}
                </Link>
              )
            )}

            {user.is_admin && (
              <Link
                to={location.pathname === "/dishes" ? "/createDish" : "/dishes"}
                className="mx-5 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                {location.pathname === "/dishes"
                  ? t("add_new_dish")
                  : t("back_to_dishes")}
              </Link>
            )}

            <form onSubmit={handleLogout}>
              <button className="text-red-100 bg-transparent border border-red-100 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 px-6 py-3">
                {t("logout")}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <Link to="/login" className={buttonStyle}>
              {t("login")}
            </Link>
            <Link to="/register" className={buttonStyle}>
              {t("register")}
            </Link>
          </div>
        )}

       
      </nav>
    </header>
  );
}
