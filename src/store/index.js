import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todoSlice";

const store = configureStore({
    reducer: {
        todosReducer: todosReducer
    }
})

export default store;
