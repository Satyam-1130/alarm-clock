import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, setUserData, setAllAlarms } from "../feature/user/userSlice";
import { notification } from "antd";

const SignIn = (props) => {
  const { setAuthPage, handleCancel } = props;
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user/signin", {
        email,
        password,
      });
      if (response.status === 200 || response.status === 201) {
        openNotificationWithIcon("success", "Sign in Successfull!");
        const userData = response.data.userData;
        const alarmData = response.data.alarmData;

        dispatch(setUser());
        dispatch(setUserData(userData));
        dispatch(setAllAlarms(alarmData))
        handleCancel();
      }
    } catch (err) {
      console.log(err)
      openNotificationWithIcon("error", "Error while sign in");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="form">
      {contextHolder}

      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <lable>Email</lable>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <lable>Password</lable>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Sign In</button>
      </form>
      <p>
        New User? <span onClick={() => setAuthPage("signup")}>Sign up</span>
      </p>
    </div>
  );
};

export default SignIn;
