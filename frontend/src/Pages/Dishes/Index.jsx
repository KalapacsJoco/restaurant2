import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import ModifyDishModal from "../../Components/ModifyDishModal";

function Dishes() {
  const [dishes, setDishes] = useState([]);
  const user = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null); 
  const { setCart } = useContext(AppContext);
  const [qty, setQty] = useState({}); 

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json(); 
        setDishes(data); 
      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchDishes();
  }, []);

  const handleEditClick = (dish) => {
    setSelectedDish(dish); 
    setOpenModal(true); 
  };

  const addToCart = (dish) => {
    console.log(dish.image);
    const dishQty = qty[dish.id] || 0; 
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
      console.warn("Hibás mennyiség");
    }
  };

  return (
    <div className="flex justify-center">
      {!openModal && (
        <div className="flex justify-center w-1/2 h-full max-h-[90vh] overflow-y-auto relative scrollbar-hide">
          <ul className="flex flex-col w-full overscroll-contain">
            {dishes.map((dish) => (
              <li
                key={dish.id}
                className="flex flex-row items-center gap-4 justify-between border rounded-lg mr-4 my-4"
              >
                <img
                  src={`http://127.0.0.1:8000/${dish.image}`}
                  alt={dish.name}
                  className="w-1/2 h-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold text-gray-100">{dish.name}</h2>
                  <p className="text-gray-300">{dish.description}</p>

                  {user && (
                    <div className="flex my-3">
                      <h3 className="text-gray-300 pr-5 text-lg">
                        {dish.price} RON
                      </h3>

                      {user.user ? (
                        user.user.is_admin ? (
                          <button
                            className="text-green-100 bg-transparent border border-green-500 rounded-lg shadow hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 px-4 ml-4 transition-colors duration-200"
                            onClick={() => handleEditClick(dish)}
                          >
                            Módosítás
                          </button>
                        ) : (
                          <span>
                            <input
                              className="text-gray-300 w-20 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                              type="number"
                              value={qty[dish.id] || 1}
                              onChange={(e) => {
                                const value = Number(e.target.value);
                                setQty((prevQty) => ({
                                  ...prevQty,
                                  [dish.id]: value,
                                }));
                              }}
                            />
                            <button
                              className="text-blue-100 bg-transparent border border-blue-500 rounded-lg shadow hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4 ml-4 transition-colors duration-200"
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
