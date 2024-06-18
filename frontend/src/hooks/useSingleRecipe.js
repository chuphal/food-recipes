import axios from "axios";
import React, { useEffect, useState } from "react";

const useSingleRecipe = (recipeId) => {
  const [loading, setLoading] = useState(false);
  const [singleItem, setSingleItem] = useState({
    name: "",
    description1: "",
    description2: "",
    ingredients: [],
    steps: [],
    createdAt: "",
  });

  //   const recipeId = localStorage.getItem("recipeId");

  useEffect(() => {
    const getSingleItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/recipe/${recipeId}`,
          {
            withCredentials: true,
          }
        );
        const data = response.data;
        if (response.error) {
          throw new Error(response.error);
        }

        setSingleItem(data.recipe);
      } catch (error) {
        console.log("get single item hook error", error);
        toast.error(error.response.data.msg);
      } finally {
        setLoading(false);
      }
    };

    getSingleItem();
  }, []);

  return { loading, singleItem };
};

export default useSingleRecipe;
