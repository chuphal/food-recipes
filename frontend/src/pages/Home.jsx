import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Foodcarousel from "../components/Foodcarousel";
import Footer from "../components/Footer";
import Dietrysection from "../components/Dietrysection";
import Latestcard from "../components/Latestcard";
import Latestrecipe from "../components/Latestrecipe";
import About from "../components/About";
import Feature from "../components/Feature";
import Recipeformat from "../components/Recipeformat";
import Createrecipeform from "../components/Createrecipeform";
import { Outlet, Route, Routes } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;

{
  /* <div className="main-container">
      
      </div>

      <Routes>
        <Route path="/" element={<Featureandabout />} />
      </Routes> */
}
