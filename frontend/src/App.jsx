import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Layout from "./Components/Layout";
import Register from "./Pages/Auth/Register";
import Login from "./Pages/Auth/Login";
import { useContext } from "react";
import { AppContext } from "./Context/AppContext";
import CreateDish from "./Pages/Dishes/CreateDish";
import Index from "./Pages/Dishes/Index";
import Order from "./Pages/Order";
import './i18n';
// import Create from "./Pages/Posts/Create";

export default function App() {
const {user} = useContext(AppContext)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path="/register" element={user ? <Home/> : <Register/>} />
        <Route path="/login" element={user ? <Home/> : <Login/>} />
        <Route path="/createDish" element={<CreateDish/>} />
        <Route path="/dishes" element={<Index/>} />
        <Route path="/order" element={user ? <Order/> : <Index/> } />
        {/* <Route path="/dishes/:id" element={<CreateDishModal />} /> */}

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
