import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import ModifyUser from "../Components/modifyUserModal";

function Order() {
  const { cart, setCart, user } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);

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

  return (
    <>
      <section className="flex text-gray-100 w-full h-1/2">
        <article className="flex flex-col text-gray-100 w-1/2 justify-center items-center">
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
                    <td>{item.price} Ft</td>
                    <td>{totalPrices[item.id] || 0} Ft</td>
                    <td>
                      <button 
                      onClick={() => deleteItem(key)}
                      className="text-red-100 bg-transparent border border-red-500 rounded-lg shadow hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
                      >Törlés</button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right font-bold">
                    Összesen:
                  </td>
                  <td>
                    {Object.values(totalPrices).reduce(
                      (acc, price) => acc + price,
                      0
                    )}{" "}
                    Ft
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
            className="mt-4 p-2 bg-blue-500 text-white rounded"
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
