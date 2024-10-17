import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import CreateDishModal from "../../Components/createDishModal";

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
    const dishQty = qty[dish.id] || 0; // Get the current quantity of the dish, default to 0 if not set
    if (dishQty > 0) { // Only add to cart if quantity is greater than 0
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

  return (
    <div className="flex justify-center w-1/2">
      <h1>Ételek</h1>
      <ul className="flex flex-col w-full">
        {dishes.map((dish) => (
          <li key={dish.id} className="flex flex-row items-center gap-4 justify-between border">
            <img
              src={`etterem//backend/storage/app/public/${dish.image}`}
              alt={dish.name}
              className="w-24 h-24 object-cover" // Kép méretezése és illesztése
            />
            <div>
              <h2 className="text-lg font-bold">{dish.name}</h2>
              <p>{dish.description}</p>
              <p>{dish.price} RON</p>
              {user && (
                <div>
                  <span>
                    <input
                      type="number"
                      value={qty[dish.id] || 0} // Get the qty for this dish, or default to 0
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setQty((prevQty) => ({
                          ...prevQty,
                          [dish.id]: value, // Update qty for this specific dish
                        }));
                      }}
                    />
                  </span>
                  <button className="text-gray-100" onClick={() => addToCart(dish)}>
                    Kosárba
                  </button>
                </div>
              )}
              <button onClick={() => handleEditClick(dish)}>Módosítás</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Modal megjelenítése, ha az openModal igaz */}
      {openModal && (
        <CreateDishModal
          show={openModal}
          closeModal={() => setOpenModal(false)}
          dish={selectedDish} // Átadjuk a kiválasztott ételt a modalnak
        />
      )}
    </div>
  );
}

export default Dishes;
