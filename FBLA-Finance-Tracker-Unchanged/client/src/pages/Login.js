/*
Purpose: Manages the login process for the user.
Features:
A form allows users to input their email and password for login.
Upon successful login, the user's data is saved in local storage (excluding the password for security reasons), a success message is displayed, and the user is redirected to the homepage.
If the user is already logged in, they are redirected to the homepage.
A loading spinner is shown while the login request is being processed.
*/
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";
// Login component handles user authentication and redirection
function Login() {
  const [loading, setLoading] = useState(false);// State to manage loading spinner visibility

  const navigate = useNavigate(); // Removed the unnecessary argument
   // Function triggered when the login form is submitted successfully
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "finance-tracker-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login successful");
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      setLoading(false);
      message.error("Login failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("finance-tracker-user")) {
      navigate("/"); // Redirect to the home page if already logged in
    }
  }, [navigate]); // Dependency array ensures this effect runs on 'navigate' changes

  return (
    <div className="register">
      {loading && <Spinner />}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Login</h1>

            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            {/* Link to register page and login button */}

            <div className="d-flex justify-content-between align-items-center">
              <Link to="/register">
                Not Registered Yet? Click Here To Register
              </Link>
              <button className="secondary" type="submit">
                LOGIN
              </button>
            </div>
          </Form>
        </div>
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
      </div>
    </div>
  );
}

export default Login;

