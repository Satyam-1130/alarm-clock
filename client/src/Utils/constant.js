import { useContext } from "react";
import { useSelector } from "react-redux";
import { WebSocketContext } from "../../context/websocketContext";

const socket = useContext(WebSocketContext);
const user = useSelector((state) => state.user);
const userData = useSelector((state) => state.userData);

export const handleSetAlarm = async (openNotificationWithIcon,selectedTime) => {
    if (!user) {
      openNotificationWithIcon("error","Please login");
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
              openNotificationWithIcon("error",response.message);
            } else {
              openNotificationWithIcon("success",`Alarm is created for ${selectedTime}`, selectedTime);
            }
          }
        );
      } catch (err) {
        openNotificationWithIcon("success",
          "Error while setting alarm please try again later"
        );
      }
    } else {
      openNotificationWithIcon("error","Please select time");
    }
  };