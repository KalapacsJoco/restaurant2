import { useContext } from "react";
import { AppContext } from "../Context/AppContext";

function Order() {
  const { cart } = useContext(AppContext);
  // const [qty, setQty] = useState({cart.qty})
  const { user } = useContext(AppContext);

  return (
    <>
    <section className="text-gray-100"> 
      <article className="flex flex-col text-gray-100 w-50">
        <h1>Rendelés</h1>
          <div className="">
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
                  <tr key={key}> {/* Itt használjuk a key attribútumot */}
                    <td>{index + 1}</td> {/* Sorszám */}
                    <td>{item.name}</td> {/* Étel neve */}
                    <td>{item.qty}</td> {/* Étel neve */}
                    {/* <input type="number" > </input> */}
                    <td>{item.price} Ft</td> {/* Ár */}
                    <td>{item.price * item.qty}  Ft</td> 
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </article>
      <article>
        <ul> {user.first_name}</ul>
        <ul> {user.last_name}</ul>
        <ul> {user.email}</ul>
        <ul> {user.phone}</ul>
        <ul> {user.street}</ul>
        <ul> {user.street_number}</ul>

      </article>
      </section>
    </>
  );
}

export default Order;
