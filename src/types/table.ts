export type TypeUser = {
  id: number;
  img?: string;
  username: string;
  email: string;
  phone: string;
  zipcode?: string;
};

export type TypeListState = {
  users: Array<TypeUser>;
};
