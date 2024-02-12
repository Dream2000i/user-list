import { TypeTableColumns,  sortDirection } from "../types/table";

export const API_URL: string = "https://jsonplaceholder.typicode.com";
export const API_USERS: string = "users";

export const TABLE_COLUMNS: TypeTableColumns = [
  {
    key: "id",
    label: "Id",
    sort: true,
  },
  {
    key: "avatar",
    label: "Фото",
  },
  {
    key: "name",
    label: "Имя",
    sort: true,
    filter: true,
  },
  {
    key: "username",
    label: "Логин",
  },
  {
    key: "email",
    label: "Email",
    filter: true,
  },
  {
    key: "phone",
    label: "Телефон",
    filter: true,
  },
  {
    key: "zipcode",
    label: "Почтовый индекс",
    sort: true,
  },
];
