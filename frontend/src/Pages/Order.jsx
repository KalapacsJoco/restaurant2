import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Order() {
  const { cart, user } = useContext(AppContext); // Hozzáférünk a user és cart objektumokhoz

  return (
    <>
      <section className="text-gray-100"> 
        <article className="flex flex-col text-gray-100 w-50">
          <h1>Rendelés</h1>
          <div>
            <table>
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
                    <td>{index + 1}</td> {/* Sorszám */}
                    <td>{item.name}</td> {/* Étel neve */}
                    <td>{item.qty}</td> {/* Mennyiség */}
                    <td>{item.price} Ft</td> {/* Ár */}
                    <td>{item.price * item.qty} Ft</td> {/* Összesen */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article>
          {/* Ellenőrizzük, hogy a user létezik-e, mielőtt megjelenítjük az adatait */}
          {user ? (
            <>
              <ul>{user.first_name}</ul>
              <ul>{user.last_name}</ul>
              <ul>{user.email}</ul>
              <ul>{user.phone}</ul>
              <ul>{user.street}</ul>
              <ul>{user.street_number}</ul>
            </>
          ) : (
            <p>Nincs felhasználói adat.</p> // Hiba esetén vagy ha a user nem létezik
          )}
        </article>
      </section>
    </>
  );
}

export default Order;
