import { createSlice } from "@reduxjs/toolkit";
import { TypeListState } from "../types/table";

const initialState: TypeListState = {
  users: [],
};

export const listSlice = createSlice({
  name: "list",

  initialState,

  reducers: {},
});

export const actions = listSlice.actions;

export default listSlice.reducer;
