import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useGetLatestRecipes = (page) => {
  const [loading, setLoading] = useState(false);
  const [latestRecipes, setLatestRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const getLatestRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/recipe?page=${page}`, {
          withCredentials: true,
        });
        const data = response.data;
        if (response.error) {
          throw new Error(response.error);
        }
        setLatestRecipes(data.recipes);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.log("get latest recipes hook error", error);
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    getLatestRecipes();
  }, [page]);

  return { loading, latestRecipes, totalPages };
};

export default useGetLatestRecipes;
