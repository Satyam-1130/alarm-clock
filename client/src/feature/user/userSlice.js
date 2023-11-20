import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
  userData: {},
  alarms: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state) => {
      state.user = true;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    deleteUser: (state) => {
      state.user = false;
      state.userData = {};
      state.alarms=[]
    },
    setAlarm: (state, action) => {
      state.alarms.push(action.payload);
    },
    setAllAlarms: (state, action) => {
      state.alarms = action.payload;
    },
    deleteAlarm: (state, action) => {
      const alarm_id = action.payload
      state.alarms = state.alarms.filter((alarm)=>alarm._id !== alarm_id)
    }
  },
});

export const { setUser, deleteUser, setUserData, setAlarm, deleteAlarm, setAllAlarms } = userSlice.actions;

export default userSlice.reducer;
