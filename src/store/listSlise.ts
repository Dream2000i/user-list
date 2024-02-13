import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  TypeListState,
  TypeNewUser,
  TypeUser,
  TypeFilter,
} from "../types/usersList";

import { sortByField } from "./utils";
import { RootState } from "./store";
import { sortDirection, TypePayloadAction } from "../types/helpers";
import { getUsersAction } from "./getUsersAction";

const initialState: TypeListState = {
  filteredUsers: [],
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
      if (currentSort.field === sortField) {
        currentSort.direction =
          currentSort.direction === sortDirection.asc
            ? sortDirection.desc
            : sortDirection.asc;
      } else {
        currentSort.direction = sortDirection.asc;
      }
      currentSort.field = sortField;
      const users = sortByField(
        [...state.users],
        currentSort.field,
        currentSort.direction !== sortDirection.asc
      );
      state.users = users;
      state.sorts = currentSort;
    },

    filtersUsers(state, action: PayloadAction<TypeFilter>) {
      const new_filters = { ...state.filters, ...action.payload };
      let users = [...state.users, ...state.filteredUsers];
      const { field, direction } = { ...state.sorts };

      const filteredUsers = [] as Array<TypeUser>;

      users = users.filter((user) => {
        let include = true;

        for (const [key, value] of Object.entries(new_filters)) {
          if (value) {
            const filter = key as keyof TypeUser;
            include = String(user[filter]).toLowerCase().includes(String(value).toLowerCase());
            if (!include) {
              filteredUsers.push(user);
              return false;
            }
          }
        }
        return include;
      });

      state.filters = new_filters;
      state.users = sortByField(users, field, direction !== sortDirection.asc);
      state.filteredUsers = filteredUsers;
    },

    addUser(state, action: PayloadAction<TypeNewUser>) {
      const id = Date.now();
      const user = { ...action.payload, id, selected: false };
      const users = [...state.users, user];
      const { field, direction } = { ...state.sorts };
      state.users = sortByField(users, field, direction !== sortDirection.asc);
    },

    selectUser(state, action: PayloadAction<number>) {
      const users = [...state.users];
      state.users = users.map((user) => {
        if (user.id === action.payload) {
          user.selected = !user.selected;
        }
        return user;
      });
    },

    deleteUsers(state) {
      const users = [...state.users];
      state.users = users.filter((user) => !user.selected);
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
              item["selected"] = false;
            });
            state.users = action.payload;
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
export const selectSorts = (rootState: RootState) => rootState.list.sorts;

export const {
  changeTableSort,
  filtersUsers,
  addUser,
  deleteUsers,
  selectUser,
} = listSlice.actions;

export default listSlice.reducer;
