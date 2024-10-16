import { useContext, useState } from "react";
import { AppContext } from "../Context/AppContext";

function Order() {
  const { cart, user } = useContext(AppContext);
  const [qty, setQty] = useState(cart.qty)
  console.log(qty)


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
                    <td><input 
                      type="text"
                      onChange={(e) => {
                        setQty( e.target.value)
                      }}
                      value={qty}
                    /></td>
                    <td>{item.price} Ft</td>
                    <td>{item.price * item.qty} Ft</td>
                    <td><button>Törlés</button></td>
                  </tr>
                )
                )}
                <tr>
                  <td colSpan="4" className="text-right font-bold">Összesen:</td>
                  <td>Ft</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>

        <article className="flex flex-col text-gray-100 w-1/2 justify-center items-center">
          {user ? (
            <>
              <ul>Név: {user.first_name + ' ' + user.last_name}</ul>
              <ul>Email: {user.email}</ul>
              <ul>Telefonszám: {user.phone}</ul>
              <ul>Utca: {user.street}</ul>
              <ul>Házszám: {user.street_number}</ul>
              <button className="mt-4 p-2 bg-blue-500 text-white rounded">Módosítás</button>
            </>
          ) : (
            <p>Nincs felhasználói adat.</p>
          )}
        </article>
      </section>
    </>
  );
}

export default Order;
