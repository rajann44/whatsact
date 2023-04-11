import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FirebaseApp";
import { UserContext } from "../context/UserProvider";
import bcrypt from "bcryptjs";

const Login = () => {
  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("Login Effect ran");
  }, []);

  const handleLogin = async () => {
    try {
      const queryResult = query(
        usersReference,
        where("email", "==", loginFormData.email)
      );
      const userDocument = await getDocs(queryResult);
      userDocument.forEach((singleUserDoc) => {
        const dataFromDoc = singleUserDoc.data();
        const isUser = bcrypt.compareSync(
          loginFormData.password,
          dataFromDoc.password
        );
        if (isUser) {
          setLogin({
            name: dataFromDoc.name,
            id: dataFromDoc.id,
            isLoggedIn: true,
          });
          navigate("/chat");
          console.log("Login Success");
        } else {
          console.log("Invalid creds");
        }
      });
    } catch (error) {
      console.log("Login Failed: " + error);
    }
  };

  return (
    <div className="container w-50 p-5" style={{ backgroundColor: "#dcf8c6" }}>
      <h4 className="text-center">Log in to WhatsAct</h4>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, email: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          placeholder="secret password here"
          onChange={(e) =>
            setLoginFormData({ ...loginFormData, password: e.target.value })
          }
        />
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-success col-md-3 mx-auto text-center"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div
        className="text-center my-3"
        style={{ color: "#848484", cursor: "pointer" }}
        onClick={() => navigate("/signup")}
      >
        Don't have an account? Sign up
      </div>
    </div>
  );
};

export default Login;
