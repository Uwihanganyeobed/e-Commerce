import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProviders from "../auth-providers/AuthProviders";
const MyLogIn = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    access: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    // console.log("login fn", formData);
    let responseData;
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      toast.success(`Welcome 😃 again! ${formData.name}`, {
        position: "top-right",
      });
      window.location.replace("/");
    } else {
      toast.error(responseData.errors, {
        position: "top-center",
      });
    }
  };
  const signup = async () => {
    // console.log("Singup fn ", formData);
    let responseData;
    await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      toast.success(`Welcome 😃! ${formData.name}`, {
        position: "top-right",
      });
      window.location.replace("/");
      
    } else {
      toast.error(responseData.errors, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="form__login">
      <ToastContainer />
      <div className="form__login-header">
        <h3>{state}</h3>
      </div>
     <AuthProviders />
      <div className="form__login-or">
        <hr />
        <p>or</p>
        <hr />
      </div>
      <div className="form__login-form">
        {state === "Sign Up" ? (
          <>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              placeholder="Name"
            />
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={changeHandler}
              placeholder="Age"
            />
            <input
              type="number"
              name="phone"
              value={formData.phone}
              onChange={changeHandler}
              placeholder="Phone"
            />
            <select
              name="access"
              value={formData.access}
              onChange={changeHandler}
            >
              <option value="">Select Access level</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Accountant">Accountant</option>
              <option value="Security">Security</option>
              <option value="User">User</option>
            </select>
          </>
        ) : (
          <></>
        )}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
          placeholder="Password"
        />
        <button
          className="form__login-btn"
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        <div className="autha">
          {state === "Sign Up" ? (
            <p>
              Already have an Account?{" "}
              <span>
                <label
                  onClick={() => {
                    setState("Login");
                  }}
                >
                  Login
                </label>
              </span>
            </p>
          ) : (
            <p>
              Not a member yet?{" "}
              <span>
                <label
                  onClick={() => {
                    setState("Sign Up");
                  }}
                >
                  Sign Up
                </label>
              </span>
            </p>
          )}
        </div>
      </div>
      <Link to="/forgot">
        <h4 className="forgot">Forgot password?</h4>
      </Link>
    </div>
  );
};

export default MyLogIn;
