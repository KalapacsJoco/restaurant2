import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import CreateDishModal from "../../Components/createDishModal";

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const user = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null); // Kiválasztott étel
  const {setCart} = useContext(AppContext)


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
    setCart((prevCart) => {
      // Ellenőrizzük, hogy az adott dish már benne van-e a cart-ban
      if (prevCart[dish.id]) {
        // Ha létezik, csak növeljük a qty értékét
        return {
          ...prevCart,
          [dish.id]: {
            ...prevCart[dish.id],  // Megtartjuk a meglévő dish tulajdonságokat
            qty: prevCart[dish.id].qty + 1, // Növeljük a qty értékét
          },
        };
      } else {
        // Ha nem létezik, adjuk hozzá qty: 1 értékkel
        return {
          ...prevCart,
          [dish.id]: {
            ...dish,  // Az összes dish tulajdonságot átvesszük
            qty: 1,  // Új termék esetén qty-t 1-re állítjuk
          },
        };
      }
    });
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
              {user && <button onClick={() => addToCart(dish)}>Kosárba </button>
            }
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
