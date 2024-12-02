import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  async function getUser() {
    if (!token) return;

    const response = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data);
    } else {
      console.error(t("user_load_error")); // 3. "Felhasználó betöltése sikertelen" fordítása
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider value={{ token, setToken, user, setUser, cart, setCart }}>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
