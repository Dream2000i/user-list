import { FormEvent } from 'react'
import ListBody from '../components/ListBody/ListBody'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectUsers, selectFilters, changeTableSort, selectUser, filtersUsers, selectSorts } from '../store/listSlise';
import { TypeUser } from '../types/usersList';
import ListHead from '../components/ListHead/ListHead';
import List from '../components/List/List';
import { TypeTableColumns } from '../types/props';


export const columns: TypeTableColumns = [
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


export default function UsersList() {

    const dispatch = useAppDispatch();
    const data = useAppSelector(selectUsers);
    const filters = useAppSelector(selectFilters);
    const sorts = useAppSelector(selectSorts);

    const addFilter = (e: FormEvent<HTMLInputElement> | null, filter: string) => {
        const input = e?.target as HTMLInputElement;
        if (input) {
            dispatch(filtersUsers({ [filter]: input.value }));
        } else {
            dispatch(filtersUsers({ [filter]: '' }));
        }
    }

    const clickSelectUser = (id: number) => dispatch(selectUser(id));

    const handleSortingList = (key: keyof TypeUser) => dispatch(changeTableSort(key));


    return (
        <List>
            <ListHead
                columns={columns}
                handleClickSorting={handleSortingList}
                filters={filters}
                handleChangeFilter={addFilter}
                sorts={sorts}
            />
            <ListBody data={data} handleChangeSelect={clickSelectUser} columns={columns} />
        </List>
    )
}
