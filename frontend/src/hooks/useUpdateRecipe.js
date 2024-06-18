import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const useUpdateRecipe = () => {
  const [loading, setLoading] = useState(false);

  const recipeUpdater = async (formData, recipeId) => {
    console.log("inside recipe updater", formData, recipeId);
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/recipe/${recipeId}`,
        formData,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      if (response.error) {
        console.log(response);
        throw new Error(response.error);
      }
      console.log(data);
      toast.success(data.msg);
    } catch (error) {
      console.log("create recipe hook error", error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, recipeUpdater };
};

export default useUpdateRecipe;
