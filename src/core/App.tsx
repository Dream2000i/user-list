import { FormEvent, useEffect } from 'react';
import Table from '../components/Table/Table';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import './app.scss';
import { getUsersAction } from '../store/utils.ts/utils';
import { addUser, changeTableSort, deleteUser, filtersUsers, selectFilters, selectUsers } from '../store/listSlise';
import { TABLE_COLUMNS } from '../constant/constant';
import { TypeNewUser, TypeUser } from '../types/table';



function App() {

  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUsers);
  const filters = useAppSelector(selectFilters);

  const clickAddUser = (user: TypeNewUser) => dispatch(addUser(user));
  const clickDeleteUser = (id: number) => dispatch(deleteUser(id));
  const clickSortingTable = (key: keyof TypeUser) => dispatch(changeTableSort(key));
  const addFilter = (e: FormEvent<HTMLInputElement>, filter: string) => {
    const input = e.target as HTMLInputElement;
    dispatch(filtersUsers({ [filter]: input.value }));
  }

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <div className="app">
      <div className="app__container">
        <Table data={data} columns={TABLE_COLUMNS} changeTableSort={clickSortingTable} filtersUsers={{ 'filters': filters, addFilter: addFilter }} deleteFunc={clickDeleteUser} />
      </div>
    </div>
  );
}

export default App;
