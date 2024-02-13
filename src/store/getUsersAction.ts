import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../api/users_api";
import { TypeUserFetch } from "../types/usersList";

export const getUsersAction = createAsyncThunk("list/getUsers", async () => {
  const response = await getUsers();
  if (response.status === 200) {
    return response.data as Array<TypeUserFetch>;
  }
});
