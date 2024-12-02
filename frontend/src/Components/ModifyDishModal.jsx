import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // 1. Importáljuk a useTranslation hookot

export default function ModifyDishModal({ show, closeModal, dish }) {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const inputFieldStyle =
    "text-gray-100 w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    imageFile: null,
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || '',
        description: dish.description || '',
        price: dish.price || '',
        image: dish.image || '',
        imageFile: null,
      });
    }
  }, [dish]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile' && files) {
      setFormData((prevState) => ({
        ...prevState,
        imageFile: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!dish || !dish.id) {
      console.error(t("dish_not_found")); // 3. "Az étel nem található" fordítása
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    formDataObj.append('price', formData.price);

    if (formData.imageFile) {
      formDataObj.append('image', formData.imageFile);
    }

    try {
      const response = await fetch(`/api/dishes/${dish.id}`, {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        console.error(t("modify_error"), response.statusText); // 4. "Hiba a módosítás során" fordítása
        return;
      }

      const data = await response.json();
      console.log(data);
      closeModal();
      window.location.reload();
    } catch (e) {
      console.error(t("modify_error"), e); // 5. "Hiba a módosítás során" fordítása
    }
  };

  const deleteDish = async () => {
    if (!dish || !dish.id) {
      console.error(t("dish_not_found")); // 6. "Az étel nem található" fordítása
      return;
    }

    try {
      const response = await fetch(`/api/dishes/${dish.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(t("delete_error"), response.statusText); // 7. "Hiba a törlés során" fordítása
        return;
      }

      const data = await response.json();
      console.log(data);
      closeModal();
      window.location.reload();
    } catch (e) {
      console.error(t("delete_error"), e); // 8. "Hiba a törlés során" fordítása
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center text-gray-100">
      <div className="rounded shadow-lg w-1/3 p-6 bg-gray-800">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">{t("edit_dish")}</h2> {/* 9. "Étel szerkesztése" fordítása */}
          <button
            type="button"
            onClick={closeModal}
            className="ml-4 bg-red-500 text-white p-2 rounded"
          >
            {t("close")} {/* 10. "Bezárás" fordítása */}
          </button>
        </div>
        <form onSubmit={submitForm}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              {t("name")} {/* 11. "Név" fordítása */}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={inputFieldStyle}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              {t("description")} {/* 12. "Leírás" fordítása */}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={inputFieldStyle}
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium">
              {t("price")} {/* 13. "Ár" fordítása */}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={inputFieldStyle}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              {t("current_image")} {/* 14. "Jelenlegi kép" fordítása */}
            </label>
            <img
              src={`http://127.0.0.1:8000/${formData.image}`}
              alt={t("dish_image")} // 15. "Étel kép" fordítása
              className="w-1/2 h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="imageFile" className="block text-sm font-medium">
              {t("upload_image")} {/* 16. "Kép feltöltése" fordítása */}
            </label>
            <input
              type="file"
              id="imageFile"
              name="imageFile"
              onChange={handleChange}
              className={inputFieldStyle}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">
              {t("save")} {/* 17. "Mentés" fordítása */}
            </button>
            <button
              type="button"
              onClick={deleteDish}
              className="bg-red-500 text-white p-2 rounded"
            >
              {t("delete")} {/* 18. "Törlés" fordítása */}
            </button>
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
