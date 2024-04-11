import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TYPE_OF_USER } from "../modules/users/modal/types/user.types";

export interface UserState {
  userList: TYPE_OF_USER[];
}

const initialState: UserState = {
  userList: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    add: (state, action) => {
      state.userList = [...state.userList, action.payload];
    },
    edit: (state, action) => {
      let tempUserList = [...state.userList];
      let userIndex = tempUserList.findIndex(
        (user) => user.key === action.payload.key
      );
      tempUserList[userIndex] = {
        ...action.payload,
        key: tempUserList[userIndex]?.key,
        user_created: tempUserList[userIndex]?.user_created,
      };
      state.userList = [...tempUserList];
    },
    delete_user: (state, action) => {
      state.userList = [
        ...state.userList.filter((u) => u.key !== action.payload.key),
      ];
    },
  },
});

export const { add, edit, delete_user } = userSlice.actions;

export default userSlice.reducer;
