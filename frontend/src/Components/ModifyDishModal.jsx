import PropTypes from 'prop-types';

import { useState } from 'react';

export default function ModifyDishModal({ show, closeModal, dish }) {

  const [formData, setFormData] = useState({
    name: dish?.name || '',
    description: dish?.description || '',
    price: dish?.price || '',
    image: dish?.image || '', // Kép URL szövegként
    imageFile: null, // A feltöltött kép fájl
  });

  if (!show) return null;

  const handleChange = (e) => {
    if (e.target.name === 'imageFile' && e.target.files) {
      setFormData({
        ...formData,
        imageFile: e.target.files[0],
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
    // const formDataObj = new FormData();
    // formDataObj.append('name', formData.name);
    // formDataObj.append('description', formData.description);
    // formDataObj.append('price', formData.price);

    // if (formData.imageFile) {
    //   formDataObj.append('image', formData.imageFile); // Fájl feltöltése
    // } else {
    //   formDataObj.append('image', formData.image); // URL-ként használt kép
    // }
    // console.log(formData)
    // //  const jsonForm = JSON.stringify(formDataObj)

    try {
      console.log(dish.id)
      const response = await fetch(`/api/dishes/${dish.id}`, {
        headers: {
          Accept: "application/json",
         'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(formData)
        // credentials: 'include', // Ha szükséges autentikáció
      });
      
      // if (response.redirected) {
      //   // Ha átirányítás történik, ezt kezelheted itt
      //   window.location.href = response.url;
      // } else {
        const data = await response.json();
      // }
      closeModal()
      window.location.reload();

    } catch (e) {
      console.log(e + 'catch');
    }

  }

  async function deleteDish() {
    console.log(dish.id)
    try {
        // Küldj egy DELETE kérést a backend API-hoz
        const response = await fetch(`/api/dishes/${dish.id}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "delete",
        });

        const data = await response.json();

        if (data.errors) {
          console.log(data.errors);
        } else {
         closeModal()
         window.location.reload();

        }


}
catch (error) {
  console.error('Error deleting dish:', error.response.data.message || error.message);
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
          <div className="mb-4">
            <label htmlFor="imageFile" className="block text-sm font-medium">Kép feltöltése</label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Mentés</button>
            <button type="button" onClick={closeModal} className="ml-4 bg-red-500 text-white p-2 rounded">Bezárás</button>
            <button onClick={deleteDish}>Törlés</button>
          </div>
        </form>
      </div>
    </div>
  );
}

ModifyDishModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  dish: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
  }),
};