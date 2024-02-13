import { useEffect } from 'react';
import { useAppDispatch } from './store/hooks';
import { getUsersAction } from './store/getUsersAction';
import UserListChange from './containers/AddUser';
import UsersList from './containers/UsersList';
import DeleteUsers from './containers/DeleteUsers';

import './styles/reset.scss';
import './styles/app.scss';


export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <UsersList />
        <div className="app__constrols">
          <DeleteUsers />
          <UserListChange />
        </div>
      </div>
    </div>
  );
}
