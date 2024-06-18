import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      if (response.error) {
        throw new Error(response.error);
      }
      toast.success(data.msg);
      localStorage.removeItem("user-info");
      Cookies.remove("jwt");
      setAuthUser(null);
    } catch (error) {
      console.log("logout hook error", error);
      toast.error(error.response.data.msg);
    } finally {
      setLoading(true);
    }
  };

  return { loading, logout };
};

export default useLogout;
