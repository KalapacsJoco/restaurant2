import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import ModifyDishModal from "../../Components/ModifyDishModal";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

function Dishes() {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const [dishes, setDishes] = useState([]);
  const user = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const { setCart } = useContext(AppContext);
  const [qty, setQty] = useState({}); // Mennyiségek állapota

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();
        setDishes(data);

        const initialQty = {};
        data.forEach((dish) => {
          initialQty[dish.id] = 1; // Alapértelmezett érték: 1
        });
        setQty(initialQty);
      } catch (error) {
        console.error(t("fetch_dishes_error"), error); // 3. "Ételek betöltése hiba" fordítása
      }
    };
    fetchDishes();
  }, [t]);

  const handleEditClick = (dish) => {
    setSelectedDish(dish);
    setOpenModal(true);
  };

  const addToCart = (dish) => {
    const dishQty = qty[dish.id] || 1;
    if (dishQty > 0) {
      setCart((prevCart) => {
        if (prevCart[dish.id]) {
          return {
            ...prevCart,
            [dish.id]: {
              ...prevCart[dish.id],
              qty: prevCart[dish.id].qty + dishQty,
            },
          };
        } else {
          return {
            ...prevCart,
            [dish.id]: {
              ...dish,
              qty: dishQty,
            },
          };
        }
      });
    } else {
      console.warn(t("invalid_quantity")); // 4. "Hibás mennyiség" fordítása
    }
  };

  return (
    <div className="flex justify-center overflow-y-auto">
      {!openModal && (
        <div className="flex justify-center w-3/5 max-h-[90vh] relative h-screen">
          <ul className="flex flex-col w-full overscroll-contain">
            {dishes.map((dish) => (
              <li
                key={dish.id}
                className="flex flex-row items-center gap-4 justify-between border border-gray-700 rounded-lg mr-4 my-4 p-4 bg-gray-900 shadow-md transform hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={`http://127.0.0.1:8000/${dish.image}`}
                  alt={dish.name}
                  className="w-1/2 h-full object-cover rounded-lg"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-yellow-500">
                    {dish.name}
                  </h2>
                  <p className="text-gray-400">{dish.description}</p>

                  {user && (
                    <div className="flex my-3">
                      <h3 className="text-gray-400 pr-5 text-lg">
                        {dish.price} RON
                      </h3>

                      {user.user ? (
                        user.user.is_admin ? (
                          <button
                            className="text-green-100 bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 transition-colors duration-200"
                            onClick={() => handleEditClick(dish)}
                          >
                            {t("edit")} {/* 5. "Módosítás" fordítása */}
                          </button>
                        ) : (
                          <span>
                            <input
                              className="text-gray-300 w-20 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                              type="number"
                              value={qty[dish.id]}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setQty((prevQty) => ({
                                  ...prevQty,
                                  [dish.id]: value,
                                }));
                              }}
                            />
                            <button
                              className="text-blue-100 bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 ml-4 transition-colors duration-200"
                              onClick={() => addToCart(dish)}
                            >
                              {t("add_to_cart")} {/* 6. "Kosárba" fordítása */}
                            </button>
                          </span>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {openModal && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 z-50 flex justify-center items-center">
            <ModifyDishModal
              show={openModal}
              closeModal={() => setOpenModal(false)}
              dish={selectedDish}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Dishes;
