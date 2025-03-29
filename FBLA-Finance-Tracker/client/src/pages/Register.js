/*
Purpose: Handles user registration functionality.
Features:
A form is displayed for the user to enter their name, email, and password.
On successful registration, a success message is shown, and the user is redirected to the login page.
If the user is already logged in (i.e., there's a stored user in local storage), they are redirected to the homepage.
*/
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";
// Register component for user registration
function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook to handle navigation between pages
  const onFinish = async (values) => {
    try {
      setLoading(true);// Show loading spinner during registration process
      await axios.post("/api/users/register", values);// API call to register user
      message.success("Registration Successful");
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };
   // Redirect to home if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("finance-tracker-user")) {
      navigate("/"); // Redirects to the home page
    }
  }, [navigate]);  // Dependency array ensures the effect runs when 'navigate' changes

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        {/* Lottie animation for visual appeal */}
        <div className="col-md-5">
          <div className="lottie">
            <dotlottie-player
              src="https://lottie.host/b7133958-4ce3-4354-9891-b1160e041d7e/hPL9uaMENK.lottie"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></dotlottie-player>
          </div>
        </div>
         {/* Registration form */}
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>REGISTER</h1>

            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
              {/* Link to login page and register button */}
            <div className="d-flex justify-content-between align-items-center">
              <Link to="/login">Already Registered? Click Here To Login</Link>
              <button className="secondary" type="submit">
                REGISTER
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
