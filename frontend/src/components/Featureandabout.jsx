import React from "react";
import Feature from "./Feature";
import Dietrysection from "./Dietrysection";
import Latestrecipe from "./Latestrecipe";
import About from "./About";
import Foodcarousel from "./Foodcarousel";

const Featureandabout = () => {
  return (
    <>
      <div className="main-container">
        <Foodcarousel />
      </div>
      <Feature />
      <Dietrysection />
      <Latestrecipe />
      <About />
    </>
  );
};

export default Featureandabout;
