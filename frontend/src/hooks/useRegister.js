import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const register = async (user) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        user,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (response.error) {
        throw new Error(response.error);
      }
      console.log(data);
      toast.success(data.msg);

      // local storage
      localStorage.setItem("user-info", JSON.stringify(data.user));
      // set context
      setAuthUser(data.user);
    } catch (error) {
      console.log("register hook error", error.response.data.msg);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
  return { loading, register };
};

export default useRegister;
