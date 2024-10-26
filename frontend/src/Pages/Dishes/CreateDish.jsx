import { useState } from "react";

export default function CreateDish() {
  const inputFieldStyle =
    "my-4 text-gray-100 w-full p-2 border border-gray-300 rounded-md caret-amber-100 bg-transparent placeholder-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75";

  //  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null, // Kezdetben null értékkel
    price: "",
  });
  // Ezzel a függvénnyel kezeljük az űrlap mezők változásait
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Képfájl változtatásának kezelése
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Képfájlt hozzárendeljük
    });
  };
  async function submitForm(e) {
    e.preventDefault();
    // FormData objektum létrehozása
    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("description", formData.description);
    formDataObj.append("image", formData.image); // Képfájl hozzáadása
    formDataObj.append("price", formData.price);
    const response = await fetch("/api/dishes", {
      method: "post",
      body: formDataObj, // FormData objektum elküldése
      headers: {
        // Nem kell 'Content-Type', mert a FormData automatikusan kezeli
      },
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <form onSubmit={submitForm} className="flex flex-col w-1/3 items-center">
      <input
        className={inputFieldStyle}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Étel neve"
      />
      <textarea
        className={inputFieldStyle}
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Étel leírása"
      />
      <input
        className={inputFieldStyle}
        type="file"
        name="image"
        onChange={handleFileChange} // Kép kiválasztásának kezelése
      />
      <input
        className={inputFieldStyle}
        type="text"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Ár"
      />
      <button 
      className="w-1/2 text-blue-100 bg-transparent border border-blue-100 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 px-6 py-3"
      type="submit"
      >Étel létrehozása</button>
    </form>
  );
}
