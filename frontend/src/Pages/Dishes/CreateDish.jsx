import { useState } from 'react';

export default function CreateDish() {
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
   [name]: value
  });
 };
 // Képfájl változtatásának kezelése
 const handleFileChange = (e) => {
  setFormData({
   ...formData,
   image: e.target.files[0] // Képfájlt hozzárendeljük
  });
 };
 async function submitForm(e) {
  e.preventDefault();
  // FormData objektum létrehozása
  const formDataObj = new FormData();
  formDataObj.append('name', formData.name);
  formDataObj.append('description', formData.description);
  formDataObj.append('image', formData.image); // Képfájl hozzáadása
  formDataObj.append('price', formData.price);
  const response = await fetch("/api/dishes", {
   method: "post",
   body: formDataObj, // FormData objektum elküldése
   headers: {
    // Nem kell 'Content-Type', mert a FormData automatikusan kezeli
   }
  });
  const data = await response.json();
  console.log(data)
 }
 return (
  <form onSubmit={submitForm}>
   <input
    type="text"
    name="name"
    value={formData.name}
    onChange={handleInputChange}
    placeholder="Dish Name"
   />
   <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Dish Description"
   />
   <input
    type="file"
    name="image"
    onChange={handleFileChange} // Kép kiválasztásának kezelése
   />
   <input
    type="text"
    name="price"
    value={formData.price}
    onChange={handleInputChange}
    placeholder="Dish Price"
   />
   <button type="submit">Submit</button>
  </form>
 );
}
