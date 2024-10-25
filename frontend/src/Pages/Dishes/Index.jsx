import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import ModifyDishModal from "../../Components/ModifyDishModal";

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const user = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null); // Kiválasztott étel
  const { setCart } = useContext(AppContext);
  const [qty, setQty] = useState({}); // Store qty as an object with dish IDs as keys

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json(); // JSON feldolgozás
        setDishes(data); // Ételek beállítása
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const handleEditClick = (dish) => {
    setSelectedDish(dish); // Beállítja a kiválasztott ételt
    setOpenModal(true); // Modal megnyitása
  };

  const addToCart = (dish) => {
    console.log(dish.image);
    const dishQty = qty[dish.id] || 0; // Get the current quantity of the dish, default to 0 if not set
    if (dishQty > 0) {
      // Only add to cart if quantity is greater than 0
      setCart((prevCart) => {
        // Ellenőrizzük, hogy az adott dish már benne van-e a cart-ban
        if (prevCart[dish.id]) {
          // Ha létezik, csak növeljük a qty értékét
          return {
            ...prevCart,
            [dish.id]: {
              ...prevCart[dish.id], // Megtartjuk a meglévő dish tulajdonságokat
              qty: prevCart[dish.id].qty + dishQty, // Növeljük a qty értékét
            },
          };
        } else {
          // Ha nem létezik, adjuk hozzá a qty értékkel
          return {
            ...prevCart,
            [dish.id]: {
              ...dish, // Az összes dish tulajdonságot átvesszük
              qty: dishQty, // Új termék esetén qty-t hozzáadjuk
            },
          };
        }
      });
    } else {
      console.warn("Hibás mennyiség");
    }
  };

  // console.dir(dishes);
  // console.dir(user)

  return (
    <div className="flex justify-center w-1/2 h-full max-h-[90vh] overflow-y-auto relative scrollbar-hide">
      <ul className="flex flex-col w-full overscroll-contain">
        {dishes.map((dish) => (
          <li
            key={dish.id}
            className="flex flex-row items-center gap-4 justify-between border my-4"
          >
            <img
              src={`http://127.0.0.1:8000/${dish.image}`}
              alt={dish.name}
              className="w-1/2 height-200 object-cover" // Kép méretezése és illesztése
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-100">{dish.name}</h2>
              <p className="text-gray-300">{dish.description}</p>

              {user && (
                <div className="flex my-3">
                  <h3 className="text-gray-300 pr-5 text-lg">{dish.price} RON</h3>

                  {user.user ? (
                    user.user.is_admin ? (
                      <button
                      className="text-green-100 bg-transparent border border-green-500 rounded-lg shadow hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 px-4  ml-4 transition-colors duration-200"
                      onClick={() => handleEditClick(dish)}>
                        
                        Módosítás
                      </button>
                    ) : (
                      <span>
                      <input
                        className="text-gray-300 w-20 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                        type="number"
                        value={qty[dish.id] || 1} // Get the qty for this dish, or default to 0
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setQty((prevQty) => ({
                            ...prevQty,
                            [dish.id]: value, // Update qty for this specific dish
                          }));
                        }}
                      />
                                            <button
                      className="text-green-100 bg-transparent border border-green-500 rounded-lg shadow hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 px-4  ml-4 transition-colors duration-200"
                        onClick={() => addToCart(dish)}
                      >
                        Kosárba
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
      {/* Modal megjelenítése, ha az openModal igaz */}
      {openModal && (
        <ModifyDishModal
          show={openModal}
          closeModal={() => setOpenModal(false)}
          dish={selectedDish} // Átadjuk a kiválasztott ételt a modalnak
        />
      )}
    </div>
  );
}

export default Dishes;
