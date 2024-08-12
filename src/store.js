import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./redux/auth/authSlice";
import friendSlice from "./redux/friend/friendSlice";
import notiSlice from "./redux/noti/notiSlice";

export const store = configureStore({
    reducer: {

        auth: authSlice,
        friend: friendSlice,
        noti: notiSlice
    },
})