import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers } from "../../api/users_api";
import { TypeUser, TypeUserFetch, TypeUsers, sortDirection } from "../../types/table";

export const getUsersAction = createAsyncThunk("list/getUsers", async () => {
  const response = await getUsers();
  if (response.status === 200) {
    return response.data as Array<TypeUserFetch>;
  }
});

export const sortByField = (
  array: TypeUsers,
  field: keyof TypeUser,
  reverse: boolean = false
) => {
  const sortedArray = [...array];

  sortedArray.sort((a, b) => {
    const one = !isNaN(Number(a[field])) ? Number(a[field]) : a[field] || '';
    const two = !isNaN(Number(b[field])) ? Number(b[field]) : b[field] || '';
    if (one < two) {
      return -1;
    } else if (one > two) {
      return 1;
    } else {
      return 0;
    }
  });

  return !reverse ? sortedArray : sortedArray.reverse();
};
