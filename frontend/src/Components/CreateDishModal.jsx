import PropTypes from 'prop-types';
import { useState } from 'react';

export default function CreateDishModal({ show, closeModal, dish }) {
  console.log(dish?.id);
  console.log(`/api/dishes/${dish?.id}`);
  const [formData, setFormData] = useState({
    name: dish?.name || '',
    description: dish?.description || '',
    price: dish?.price || '',
    image: dish?.image || ''
  });

  if (!show) return null;



  const handleChange = (e) => {
    if (e.target.name === 'image' && e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  async function submitForm(e) {
    e.preventDefault();

    if (!dish || !dish.id) {
      console.error("Az étel nem található");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('image', formData.image);
    formDataObj.append('price', formData.price);

    try {
      const response = await fetch(`/api/dishes/${dish.id}`, {
        method: "PUT",
        body: formDataObj,
      });
      const data = await response.json();
      console.dir(data);
    } catch (e) {
      console.log(e + 'catch');
    }
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg font-bold">Étel szerkesztése</h2>
        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">Név</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium">Leírás</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium">Ár</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium">Kép URL</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mentés</button>
            <button type="button" onClick={closeModal} className="ml-4 bg-red-500 text-white p-2 rounded">Bezárás</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PropTypes beállítása
CreateDishModal.propTypes = {
  show: PropTypes.bool.isRequired,      // show mindig bool típusú kell legyen
  closeModal: PropTypes.func.isRequired, // closeModal egy függvény kell legyen
  dish: PropTypes.shape({               // dish egy objektum, ami tartalmazza a következőket
    id: PropTypes.oneOfType([            // id lehet string vagy szám
      PropTypes.string,
      PropTypes.number,
    ]),
    name: PropTypes.string,              // name egy string
    description: PropTypes.string,       // description egy string
    price: PropTypes.oneOfType([         // price lehet string vagy szám
      PropTypes.string,
      PropTypes.number,
    ]),
    image: PropTypes.string,             // image egy string
  }),
};
