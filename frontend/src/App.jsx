import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";

import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signupin from "./pages/Signupin";
import Registerform from "./components/Registerform";
import Loginform from "./components/Loginform";
import { useAuthContext } from "./context/AuthContext";
import Createrecipeform from "./components/Createrecipeform";
import Foodcarousel from "./components/Foodcarousel";
import Featureandabout from "./components/Featureandabout";
import Singlerecipecard from "./components/Singlerecipecard";
import Recipeformat from "./components/Recipeformat";

import Rendersearch from "./components/Rendersearch";
import Allrecentrecipes from "./components/Allrecentrecipes";
import Updaterecipe from "./components/Updaterecipe";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home />}
          children={[
            <Route key={1} path="/" element={<Featureandabout />} />,
            <Route
              key={2}
              path="/createrecipe"
              element={
                <div className="main-container">
                  <Createrecipeform />
                </div>
              }
            />,
            <Route
              key={3}
              path="/recipe"
              element={
                <div className="main-container">
                  <Allrecentrecipes />{" "}
                </div>
              }
            />,
            <Route
              key={4}
              path="/recipe/:recipeId"
              element={
                <div className="main-container">
                  <Recipeformat />
                </div>
              }
            />,
            <Route
              key={5}
              path="/search"
              element={
                <div className="main-container">
                  <Rendersearch />
                </div>
              }
            />,
            <Route
              key={6}
              path="/updaterecipe/:recipeId"
              element={
                <div className="main-container">
                  <Updaterecipe />
                </div>
              }
            />,
          ]}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Signupin />}
          children={[
            <Route key={1} path="/register" element={<Registerform />} />,
          ]}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Signupin />}
          children={[<Route key={1} path="/login" element={<Loginform />} />]}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
