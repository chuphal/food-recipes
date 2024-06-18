import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useSearch = (searched) => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const searchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/recipe?search=${searched}`, {
          withCredentials: true,
        });
        const data = response.data;
        if (response.error) {
          throw new Error(response.error);
        }

        setRecipes(data.recipes);
      } catch (error) {
        console.log("search  hook error", error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    searchRecipes(searched);
    return () => {
      // called when the component gets unmounted
      setRecipes([]);
    };
  }, [searched]);

  return { loading, recipes };
};

export default useSearch;
