import axios from "axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://staging-sso.agrotrust.io/sso/api/user/login";

const login = async (values) => {
  //   const finalObj = {
  //     email: values.email,
  //     password: values.password,
  //   };
  //   // return axios.post(API_URL, finalObj).then((response) => {
  //   //   if (response.data) {
  //   //     const user = jwt_decode(response.data.token);
  //   //     localStorage.setItem("user", JSON.stringify(user));
  //   //     return user;
  //   //   }
  //   //   return;
  //   // });
  //   return toast.promise(
  //     new Promise(async (resolve, reject) => {
  //       let response = await axios.post(API_URL, finalObj);
  //       try {
  //         if (response) {
  //           const user = jwt_decode(response.data.token);
  //           const token = response.data.token;
  //           localStorage.setItem("agrotrust_farmdb_user", JSON.stringify(user));
  //           localStorage.setItem("token", token);
  //           resolve(user);
  //           return user;
  //         }
  //       } catch (error) {
  //         reject(error);
  //         console.log(error);
  //       }
  //     }),
  //     {
  //       pending: "Signing In...",
  //       success: "Sign In Successfully 👌",
  //       error: "Error Signing Up 🤯",
  //     }
  //   );
};

const logout = () => {
  localStorage.removeItem("agrotrust_farmdb_user");
};

export { login, logout, API_URL };
