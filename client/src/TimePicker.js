import React, { useState } from "react";
import { TimePicker } from "antd";

const TimePickerInput = (props) => {
  const { handleTimeChange } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <TimePicker
        open={open}
        onOpenChange={setOpen}
        format="HH:mm"
        allowClear={true}
        className="timepicker-background"
        size="large"
        picker="time" 
        onChange={handleTimeChange} 
        style={{ width: "200px" }}
      />
    </div>
  );
};

export default TimePickerInput;
