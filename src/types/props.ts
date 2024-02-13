import { FormEvent } from "react";
import { TypeFilter, TypeNewUser, TypeSorts,  TypeUser, TypeUsers } from "./usersList";

export type TypeAddUserFormItems = Array<{
  name: keyof TypeNewUser;
  label: string;
  required: boolean;
  mask?: string;
  pattern?: RegExp;
}>;

export type TypeAddUserFormProps = {
  items: TypeAddUserFormItems;
  handleSubmit: (user: TypeNewUser) => void;
};

export type TypeDeleteUsersConfirmProps = {
  items: TypeUsers;
  handleOk: () => void;
};

export type TypeListBodyProps = {
  columns: TypeTableColumns;
  data: TypeUsers;
  handleChangeSelect: (id: number) => void;
};

export type TypeListHeadProps = {
  columns: TypeTableColumns;
  sorts: TypeSorts;
  filters: TypeFilter;
  handleChangeFilter: (e: FormEvent<HTMLInputElement> | null, filter: string) => void;
  handleClickSorting: (e: keyof TypeUser) => void;
};

export type TypeTableColumns = Array<{
  key: keyof TypeUser;
  label: string;
  sort?: true;
  filter?: true;
}>;
