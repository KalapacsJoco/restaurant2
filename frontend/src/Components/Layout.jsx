import {  Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function Layout() {



  return (
    <>
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/black-stone-food-background-cooking-ingredients-top-view-free-space-your-text_187166-12991.jpg?w=740')` }}>

      <Navbar/>
      <main >
        <Outlet />
      </main>
      </div>
    </>
  );
}
