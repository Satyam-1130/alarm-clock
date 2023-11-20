import { Modal } from "antd";
import React, { useState } from "react";
import TimeDisplay from "./TimeDisplay";
import TimePickerInput from "../TimePicker";
import { clockLogo } from "../Assets/Images/clock";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../feature/user/userSlice";

const ClockComponent = (props) => {
  const { handleTimeChange, handleSetAlarm } = props;
  const user = useSelector((state) => state.user);
  const alarms = useSelector((state) => state.alarms);

  const dispatch = useDispatch();
  const [authPage, setAuthPage] = useState("signin");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(deleteUser());
  };

  return (
    <div className="container">
      <div className="set-alarm">
        <div>
          <TimeDisplay />
        </div>
        <div>
          <TimePickerInput handleTimeChange={handleTimeChange} />
          <button className="add-button" onClick={handleSetAlarm}>
            Add Alarm
          </button>
        </div>
      </div>

      <div className="right-section">
        <div className="header">
          <h1>Alarm Clock</h1>
          {user ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button onClick={showModal}>Login</button>
          )}
        </div>

        <div className="upcoming-alarm">
          {alarms.length === 0 && (
            <div className="no-alarm">
              <div>{clockLogo}</div>
              <p>No alarm set</p>
            </div>
          )}

          <div className="alarm_list">
            {alarms.map((alarm) => (
              <div key={alarm._id} className="alarm_item">
                {alarm.alarm_time}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        closable={false}
        footer={[]}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {authPage === "signin" ? (
          <SignIn handleCancel={handleCancel} setAuthPage={setAuthPage} />
        ) : (
          <SignUp setAuthPage={setAuthPage} />
        )}
      </Modal>
    </div>
  );
};

export default ClockComponent;
