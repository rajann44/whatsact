import { addDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { usersReference } from "../firebase/FirebaseApp";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    id: "",
  });

  useEffect(() => {
    console.log("Signup Effect ran");
  }, []);

  const handleSubmit = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(signupFormData.password, salt);
      await addDoc(usersReference, {
        name: signupFormData.name,
        email: signupFormData.email,
        password: hash,
        id: Math.random().toString(36).slice(2),
      });
      console.log("User signup successful");
    } catch (error) {
      console.log("User signup failed " + error);
    }
  };

  return (
    <div className="container w-50 p-5" style={{ backgroundColor: "#dcf8c6" }}>
      <h4 className="text-center">Sign up to WhatsAct</h4>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="your fullname here"
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, name: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) =>
            setSignupFormData({ ...signupFormData, email: e.target.value })
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
            setSignupFormData({ ...signupFormData, password: e.target.value })
          }
        />
      </div>
      <div className="row">
        <button
          type="button"
          className="btn btn-success col-md-3 mx-auto text-center"
          onClick={handleSubmit}
        >
          Signup
        </button>
      </div>
      <div
        className="text-center my-3"
        style={{ color: "#848484", cursor: "pointer" }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Log in
      </div>
    </div>
  );
};

export default Signup;
