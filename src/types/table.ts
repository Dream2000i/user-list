import { PayloadAction } from "@reduxjs/toolkit";
import { FormEvent } from "react";

export type TypeUser = {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  zipcode?: string | number;
};

export type TypeNewUser = Omit<TypeUser, "id">;

export type TypeFilter = Omit<
  TypeUser,
  "id" | "name" | "username" | "email" | "phone"
> & {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
};

export type TypeUserFetch = TypeUser & {
  address: {
    zipcode?: string | number;
  };
};

export type TypeUsers = Array<TypeUser>;

export type TypeListState = {
  users: Array<TypeUser>;
  originalUsers: Array<TypeUser>;
  sorts: {
    field: keyof TypeUser;
    direction: sortDirection;
  };
  filters: TypeFilter;
};

export type TypeTableProps = {
  columns: TypeTableColumns;
  data: TypeUsers;
  changeTableSort: (e: keyof TypeUser) => void;
  filtersUsers: {
    filters: TypeFilter;
    addFilter: (e: FormEvent<HTMLInputElement>, filter: string) => void;
  };
  deleteFunc: (key: number) => void;
};

export type TypePayloadAction = PayloadAction<
  Array<TypeUserFetch> | undefined,
  string,
  { arg: void; requestId: string; requestStatus: "fulfilled" },
  never
>;

export type TypeTableColumns = Array<{
  key: keyof TypeUser;
  label: string;
  sort?: true;
  filter?: true;
}>;

export enum sortDirection {
  asc,
  desc,
}
