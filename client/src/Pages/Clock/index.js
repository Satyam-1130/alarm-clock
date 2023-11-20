import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";

import ClockComponent from "../../Components/ClockComponent";
import { WebSocketContext } from "../../context/websocketContext";
import { Modal, notification } from "antd";

import "./style.css";
import { setAlarm, deleteAlarm } from "../../feature/user/userSlice";

const Clock = () => {
  const socket = useContext(WebSocketContext);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userData = useSelector((state) => state.userData);

  const [selectedTime, setSelectedTime] = useState("");
  const [alarmNotification, setAlarmNotification] = useState("");

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setAlarmNotification('')
    setIsModalOpen(false);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });

    socket.on(userData._id, (newAlarm) => {
      console.log(newAlarm);
      handleOff(newAlarm);
    });

    return () => {
      console.log("Unregistering events...");
      socket.off("connect");
      socket.off(userData._id);
    };
  }, [user]);

  const handleOff = async (alarm) => {
    const { alarm_notification, alarm_id } = alarm;
    setAlarmNotification(alarm_notification);
    showModal();
    setTimeout(()=>{
      handleCancel();
    },100000)
    dispatch(deleteAlarm(alarm_id));
    socket.emit("removeAlarm", alarm_id);
  };

  const handleTimeChange = (time, timeString) => {
    setSelectedTime(timeString);
    console.log("Selected Time:", timeString);
  };

  const handleSetAlarm = async () => {
    if (!user) {
      openNotificationWithIcon("error", "Please login");
      return;
    }

    if (user && selectedTime !== "") {
      try {
        socket.emit(
          "createAlarm",
          {
            alarm_time: selectedTime,
            user_id: userData._id,
          },
          (response) => {
            if (response.status === "error") {
              openNotificationWithIcon("error", response.message);
            } else {
              const alarm = response.alarm;
              dispatch(setAlarm(alarm));
              openNotificationWithIcon(
                "success",
                `Alarm is created for ${selectedTime}`,
                selectedTime
              );
            }
          }
        );
      } catch (err) {
        openNotificationWithIcon(
          "success",
          "Error while setting alarm please try again later"
        );
      }
    } else {
      openNotificationWithIcon("error", "Please select time");
    }
  };

  return (
    <div className="Clock">
      {contextHolder}
      <ClockComponent
        handleTimeChange={handleTimeChange}
        handleSetAlarm={handleSetAlarm}
      />
      <Modal
        closable={false}
        footer={[]}
        open={isModalOpen}
      >
        <div className="alarmNotification">
          <div className="gif">
            <img src={require("../../Assets/Images/heckar.gif")} alt="#" />
          </div>
          <div className="notification">
            <p>{alarmNotification}</p>
            <button onClick={handleCancel}>Off Alarm</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Clock;
