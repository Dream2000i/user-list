import DeleteUsersConfirm from '../components/DeleteUsersConfirm/DeleteUsersConfirm'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUsers, deleteUsers } from '../store/listSlise';

export default function DeleteUsers() {
  const dispatch = useAppDispatch();
  const usersSelected = useAppSelector(selectUsers).filter(({ selected }) => selected);

  const handleDeleteUsers = () => dispatch(deleteUsers());

  return (
    <DeleteUsersConfirm handleOk={handleDeleteUsers} items={usersSelected} />
  )
}
