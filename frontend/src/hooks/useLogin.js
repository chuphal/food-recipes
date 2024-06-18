import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (user) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        user,
        {
          withCredentials: true,
        }
      );
      const data = response.data;

      if (response.error) {
        throw new Error(response.error);
      }

      toast.success(data.msg);

      //local storage
      localStorage.setItem("user-info", JSON.stringify(data.user));
      // context
      setAuthUser(user);
    } catch (error) {
      console.log("login hook error", error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
