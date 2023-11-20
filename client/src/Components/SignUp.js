import React from "react";
import axios from "axios";
import { useState } from "react";
import { notification } from "antd";

const SignUp = (props) => {
  const { setAuthPage } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/signup", {
        name,
        email,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        openNotificationWithIcon("success", "Sign up Successfull!");
        setEmail("");
        setPassword("");
        setAuthPage("signin");
      }
    } catch (err) {
      openNotificationWithIcon("error", "Error while sign up");
    }
  };
  return (
    <div className="form">
      {contextHolder}
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <lable>Name</lable>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <lable>Email</lable>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <lable>Password</lable>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span onClick={() => setAuthPage("signin")}>Sign in</span>
      </p>
    </div>
  );
};

export default SignUp;
