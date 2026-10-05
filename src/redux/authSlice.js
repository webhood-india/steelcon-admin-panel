import { createSlice } from "@reduxjs/toolkit";

const storedUser = (() => {
  try { return JSON.parse(localStorage.getItem("steelconUser")); } catch { return null; }
})();

const initialState = {
  user: storedUser || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("steelconUser", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) localStorage.setItem("token", action.payload);
      else localStorage.removeItem("token");
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("steelconUser");
    },
  },
});
export const { setUser, setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
