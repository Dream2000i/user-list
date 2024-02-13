import { sortDirection } from "./helpers";

export type TypeUser = {
  id: number;
  avatar?: string;
  email: string;
  name: string;
  username: string;
  phone: string;
  selected: boolean;
  zipcode?: string | number;
};
export type TypeUsers = Array<TypeUser>;

export type TypeNewUser = Omit<TypeUser, "id" | "selected">;

export type TypeUserFetch = TypeUser & {
  address: {
    zipcode?: string | number;
  };
};

export type TypeFilter = Omit<
  TypeUser,
  "id" | "name" | "username" | "email" | "phone" | "selected"
> & {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  selected?: boolean;
};




export type TypeListState = {
  users: Array<TypeUser>;
  originalUsers: Array<TypeUser>;
  sorts: TypeSorts;
  filters: TypeFilter;
};

export type TypeSorts = {
  field: keyof TypeUser;
  direction: sortDirection;
};


