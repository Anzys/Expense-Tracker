import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./pages/user/userSlice";
import transReducer from "./pages/dashboard/transactionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transReducer,
  },
});

export default store;
