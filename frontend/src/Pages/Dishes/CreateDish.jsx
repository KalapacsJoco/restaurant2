import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 1. Importáljuk a useTranslation hookot

export default function CreateDish() {
  const { t } = useTranslation(); // 2. Inicializáljuk a fordításokat
  const navigate = useNavigate();

  const inputFieldStyle =
    "my-4 text-gray-100 w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  async function submitForm(e) {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image);
    formDataObj.append("price", formData.price);

    const response = await fetch("/api/dishes", {
      method: "post",
      body: formDataObj,
    });

    const data = await response.json();
    console.log(data);
    navigate("/dishes");
  }

  return (
    <form onSubmit={submitForm} className="flex flex-col w-1/3 items-center">
      <input
        className={inputFieldStyle}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder={t("dish_name_placeholder")} 
      />
      <textarea
        className={inputFieldStyle}
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder={t("dish_description_placeholder")} 
      />
      <input
        className={inputFieldStyle}
        type="file"
        name="image"
        onChange={handleFileChange}
      />
      <input
        className={inputFieldStyle}
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder={t("price_placeholder")} 
      />
      <button
        className="w-1/2 text-blue-100 bg-transparent border border-blue-100 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-6 py-3"
        type="submit"
      >
        {t("create_dish_button")} {/* 6. "Étel létrehozása" fordítása */}
      </button>
    </form>
  );
}
