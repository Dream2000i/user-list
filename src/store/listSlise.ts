import {
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import {
  TypeListState,
  TypeNewUser,
  TypePayloadAction,
  TypeUser,
  TypeFilter,
  sortDirection,
} from "../types/table";

import { getUsersAction, sortByField } from "./utils.ts/utils";
import { RootState } from "./store";

const initialState: TypeListState = {
  originalUsers: [],
  users: [],
  sorts: {
    field: "id",
    direction: sortDirection.asc,
  },
  filters: {},
};

export const listSlice = createSlice({
  name: "list",

  initialState,

  reducers: {
    changeTableSort(state, action: PayloadAction<keyof TypeUser>) {
      const sortField = action.payload;
      const currentSort = {
        ...state.sorts,
      };

      let users = [...state.users];
      if (currentSort.field === sortField) {
        users = users.reverse();
        currentSort.direction =
          currentSort.direction === sortDirection.asc
            ? sortDirection.desc
            : sortDirection.asc;
      } else {
        currentSort.direction = sortDirection.asc;
        currentSort.field = sortField;
        users = sortByField(users, currentSort.field);
      }
      state.users = users;
      state.sorts = currentSort;
    },

    filtersUsers(state, action: PayloadAction<TypeFilter>) {
      const new_filters = { ...state.filters, ...action.payload };
      let users = [...state.originalUsers];
      const { field, direction } = { ...state.sorts };

      users = users.filter((item) => {
        const user = item as TypeUser;
        let include = true;

        for (const [key, value] of Object.entries(new_filters)) {
          if (value) {
            const filter = key as keyof TypeUser;
            include = String(user[filter]).includes(String(value));
            console.log(include);
            if (!include) return false;
          }
        }
        return include;
      });

      state.filters = new_filters;
      state.users = sortByField(users, field, direction === sortDirection.asc);
    },

    addUser(state, action: PayloadAction<TypeNewUser>) {
      const id = Date.now();
      const user = { ...action.payload, id };
      state.users = [...state.users, user];
      state.originalUsers = [...state.originalUsers, user];
    },

    deleteUser(state, action: PayloadAction<number>) {
      let users = [...state.users];
      let originalUsers = [...state.originalUsers];
      state.users = users.filter((user) => user.id !== action.payload);
      state.originalUsers = originalUsers.filter(
        (user) => user.id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        getUsersAction.fulfilled,
        (state: TypeListState, action: TypePayloadAction) => {
          if (action.payload) {
            action.payload.forEach((item) => {
              item["zipcode"] = item["address"]["zipcode"] ?? "";
            });
            state.users = action.payload;
            state.originalUsers = action.payload;
          }
        }
      )
      .addCase(getUsersAction.rejected, (_state: TypeListState, action) => {
        console.error(`Error: ${action.error.message}`);
      });
  },
});

export const selectUsers = (rootState: RootState) => rootState.list.users;
export const selectFilters = (rootState: RootState) => rootState.list.filters;

export const { changeTableSort, filtersUsers, addUser, deleteUser } =
  listSlice.actions;

export default listSlice.reducer;
