import { useContext, useState, useEffect } from "react";
import { AppContext } from "../Context/AppContext";
import ModifyUser from "../Components/ModifyUserModal";
import SuccessModal from "../Components/SuccessModal";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

function Order() {
  const { cart, setCart, user, token } = useContext(AppContext);
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const [openModal, setOpenModal] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [qty, setQty] = useState(() => {
    const initialQty = {};
    Object.keys(cart).forEach((id) => {
      initialQty[id] = cart[id].qty;
    });
    return initialQty;
  });

  const deleteItem = (id) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
  };

  const [totalPrices, setTotalPrices] = useState({});

  useEffect(() => {
    const newTotalPrices = {};
    Object.keys(cart).forEach((id) => {
      newTotalPrices[id] = (qty[id] || 0) * cart[id].price;
    });
    setTotalPrices(newTotalPrices);
  }, [qty, cart]);

  const submitOrder = async () => {
    if (!user) {
      console.error(t("user_not_logged_in")); // 3. Felhasználó nincs bejelentkezve fordítása
      return;
    }
    if (Object.keys(cart).length === 0) {
      console.error(t("cart_empty")); // 4. A kosár üres fordítása
      return;
    }

    const requestBody = {
      user_id: user.id,
      status: "pending",
      total_price: Object.values(totalPrices).reduce((acc, price) => acc + price, 0),
      items: Object.keys(cart).map((key) => ({
        dish_id: cart[key].id,
        quantity: qty[key],
        price: cart[key].price,
      })),
    };

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(t("order_successful"), data); // 5. Rendelés sikeres fordítása
        setCart({});
        setIsSuccessModalOpen(true);
      } else {
        console.error(t("order_error"), data); // 6. Rendelés hiba fordítása
      }
    } catch (error) {
      console.error(t("order_submission_error"), error); // 7. Rendelés beküldési hiba fordítása
    }
  };

  return (
    <>
      <section className="flex text-gray-100 w-full h-1/2">
        <article className="ml-11 flex flex-col text-gray-100 w-1/2 justify-center items-center">
          <h1>{t("order")}</h1> {/* 8. "Rendelés" fordítása */}
          <div>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>{t("serial_number")}</th> {/* 9. "Sorszám" fordítása */}
                  <th>{t("dish_name")}</th> {/* 10. "Étel neve" fordítása */}
                  <th>{t("quantity")}</th> {/* 11. "Mennyiség" fordítása */}
                  <th>{t("unit_price")}</th> {/* 12. "Egységár" fordítása */}
                  <th>{t("total")}</th> {/* 13. "Összesen" fordítása */}
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
                        value={qty[item.id] || 0}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          setQty((prevQty) => ({
                            ...prevQty,
                            [item.id]: value,
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
                        {t("delete")} {/* 14. "Törlés" fordítása */}
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right font-bold">
                    {t("grand_total")}: {/* 15. "Összesen" fordítása */}
                  </td>
                  <td className="text-lg">
                    {Object.values(totalPrices).reduce((acc, price) => acc + price, 0)}{" "}
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
            {t("submit_order")} {/* 16. "Megrendelem" fordítása */}
          </button>
        </article>

        <article className="flex flex-col text-gray-100 w-1/2 justify-center items-center">
          {openModal ? (
            <ModifyUser
              show={openModal}
              closeModal={() => setOpenModal(false)}
              user={user}
            />
          ) : (
            <>
              {user ? (
                <>
                  <ul>{t("name")}: {user.first_name + " " + user.last_name}</ul>
                  <ul>{t("email")}: {user.email}</ul>
                  <ul>{t("phone")}: {user.phone}</ul>
                  <ul>{t("street")}: {user.street}</ul>
                  <ul>{t("house_number")}: {user.street_number}</ul>
                  <button
                    onClick={() => setOpenModal(true)}
                    className="text-blue-100 bg-transparent border border-blue-500 rounded-lg shadow hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-4  ml-4 my-2 transition-colors duration-200"
                  >
                    {t("modify")} {/* 17. "Módosítás" fordítása */}
                  </button>
                </>
              ) : (
                <p>{t("no_user_data")}</p> 
              )}
            </>
          )}
        </article>
      </section>

      <SuccessModal
        show={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </>
  );
}

export default Order;
