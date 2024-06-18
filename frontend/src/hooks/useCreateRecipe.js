import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useCreateRecipe = () => {
  const [loading, setLoading] = useState(false);

  const recipeCreater = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/recipe", formData, {
        withCredentials: true,
      });
      const data = response.data;
      if (response.error) {
        throw new Error(response.error);
      }
      console.log(data);
      toast.success(data.msg);
    } catch (error) {
      console.log("create recipe hook error", error.response.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, recipeCreater };
};

export default useCreateRecipe;
