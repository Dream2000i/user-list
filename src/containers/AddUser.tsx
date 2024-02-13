import NewUser from "../components/AddUserForm/AddUserForm";
import { useAppDispatch } from "../store/hooks";
import { addUser } from "../store/listSlise";
import { TypeNewUser } from "../types/usersList";
import { EMAIL_PATTERN, PHONE_PATTERN } from "../constants/constants";
import { TypeAddUserFormItems } from "../types/props";

const formItems: TypeAddUserFormItems = [
  {
    name: "name",
    label: "Имя",
    required: true,
  },
  {
    name: "username",
    label: "Логин",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    required: true,
    pattern: EMAIL_PATTERN,
  },
  {
    name: "phone",
    label: "Телефон",
    required: true,
    mask: "+7 000 000 00-00",
    pattern: PHONE_PATTERN,
  },
  {
    name: "zipcode",
    required: false,
    label: "Почтовый индекс",
  },
];

export default function UserListChange() {

  const dispatch = useAppDispatch();
  const handleAddUser = (user: TypeNewUser) => dispatch(addUser(user));

  return (
      <NewUser handleSubmit={handleAddUser} items={formItems} />
  )
}