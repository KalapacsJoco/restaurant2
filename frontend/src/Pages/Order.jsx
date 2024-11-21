import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import ModifyUser from "../Components/ModifyUserModal";

function Order() {
  const { cart, setCart, user, token } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);
  // console.log(cart)

  const [qty, setQty] = useState(() => {
    // Initialize qty state by extracting qty from each cart item
    const initialQty = {};
    Object.keys(cart).forEach((id) => {
      initialQty[id] = cart[id].qty; // Extract the qty from each item
    });
    return initialQty;
  });

  const deleteItem = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart }; // Másolat készítése a jelenlegi kosárról
      delete newCart[id]; // Az elem törlése az adott id alapján
      return newCart; // Visszaadjuk a frissített objektumot
    });
  };

  const [totalPrices, setTotalPrices] = useState({});

  useEffect(() => {
    const newTotalPrices = {};
    Object.keys(cart).forEach((id) => {
      newTotalPrices[id] = (qty[id] || 0) * cart[id].price; // Számítás minden egyes ételhez
    });
    setTotalPrices(newTotalPrices);
  }, [qty, cart]); // Figyelje a qty és cart változását

  const submitOrder = async () => {
    // Ellenőrizzük, hogy a kosár nem üres, és van-e bejelentkezett felhasználó
    if (!user) {
      console.error("Nincs bejelentkezve a felhasználó");
      return;
    }
    if (Object.keys(cart).length === 0) {
      console.error("A kosár üres");
      return;
    }
  
    const requestBody = {
      user_id: user.id, // A bejelentkezett felhasználó ID-ja
      status: "pending", // Állapot megadása
      total_price: Object.values(totalPrices).reduce((acc, price) => acc + price, 0), // A teljes ár összegzése
      items: Object.keys(cart).map((key) => ({
        dish_id: cart[key].id, // Az étel ID-ja
        quantity: qty[key], // A rendelt mennyiség
        price: cart[key].price, // Egységár
      })), // A kosár tételeit tömbbé alakítjuk
    };
  
    console.log(requestBody);
  
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json(); // A válasz adatainak feldolgozása
      if (response.ok) {
        console.log("Rendelés sikeresen elküldve:", data);
        // Kosár ürítése sikeres rendelés után
        setCart({});
      } else {
        console.error("Hiba a rendelés során:", data);
      }
    } catch (error) {
      console.error("Hiba a rendelés beküldése során:", error);
    }
  };
  
  return (
    <>
      <section className="flex text-gray-100 w-full h-1/2">
        <article className="ml-11 flex flex-col text-gray-100 w-1/2 justify-center items-center">
          <h1>Rendelés</h1>
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>Sorszám</th>
                  <th>Étel neve</th>
                  <th>Mennyiség</th>
                  <th>Egységár</th>
                  <th>Összesen</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cart).map(([key, item], index) => (
                  <tr key={key}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        className="text-gray-300 w-20 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
                        type="number"
                        value={qty[item.id] || 0} // Get the qty for this dish, or default to 0
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setQty((prevQty) => ({
                            ...prevQty,
                            [item.id]: value, // Update qty for this specific dish
                          }));
                        }}
                      />
                    </td>
                    <td>{item.price} Ron</td>
                    <td>{totalPrices[item.id] || 0} Ron</td>
                    <td>
                      <button
                        onClick={() => deleteItem(key)}
                        className="text-red-100 bg-transparent border border-red-500 rounded-lg shadow hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right font-bold">
                    Összesen:
                  </td>
                  <td className="text-lg" >
                    {Object.values(totalPrices).reduce(
                      (acc, price) => acc + price,
                      0
                    )}{" "}
                    Ron
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            className="text-green-100 bg-transparent border border-green-500 rounded-lg shadow hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
            onClick={submitOrder}
          >
            Megrendelem
          </button>
        </article>

        <article className="flex flex-col text-gray-100 w-1/2 justify-center items-center">
          {openModal ? (
            // Ha openModal true, akkor megjelenítjük a ModifyUser formot
            <ModifyUser
              show={openModal}
              closeModal={() => setOpenModal(false)}
              user={user}
            />
          ) : (
            // Ha openModal false, akkor megjelenítjük a felhasználó adatait
            <>
              {user ? (
                <>
                  <ul>Név: {user.first_name + " " + user.last_name}</ul>
                  <ul>Email: {user.email}</ul>
                  <ul>Telefonszám: {user.phone}</ul>
                  <ul>Utca: {user.street}</ul>
                  <ul>Házszám: {user.street_number}</ul>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-blue-100 bg-transparent border border-blue-500 rounded-lg shadow hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
                  >
                    Módosítás
                  </button>
                </>
              ) : (
                <p>Nincs felhasználói adat.</p>
              )}
            </>
          )}
        </article>
      </section>
    </>
  );
}

export default Order;
