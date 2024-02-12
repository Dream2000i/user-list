import React, { useEffect, useState } from 'react'
import { getUsers } from '../../api/users_api';
import { TypeTableProps, TypeUser } from '../../types/table';


const get_avatar = ({ avatar, name }: TypeUser) => {
    if (avatar) return <img src={avatar} alt='аватар' />;
    const symbol = Array.from(name)[0];
    return <div>{symbol}</div>;
}


export default function Table({ columns, data, changeTableSort, filtersUsers, deleteFunc }: TypeTableProps) {

    return (
        <table className='list_users'>
            <thead className='list_users__header'>
                <tr className='list_users__row list_users__row_header'>
                    {columns.map(({ label, key, sort, filter }) => (
                        <th className='list_users__col list_users__col_header' key={`table-col-${key}`} onClick={sort ? () => changeTableSort(key) : (f) => f}>
                            <div>{label}</div>
                            {
                                filter ? <input value={filtersUsers.filters[key]} onInput={(e) => filtersUsers.addFilter(e, key)} /> : ''
                            }
                        </th>
                    ))}
                </tr>
            </thead>
            <thead className='list_users__body'>
                {data.map((user) => (
                    <tr className='list_users__row list_users__row_body' key={`user-${user['id']}`} onClick={()=>deleteFunc(user.id)}>
                        {columns.map(({ key }) => (
                            <td className='list_users__col list_users__col_body' key={`table-user-${key}`} >
                                {

                                    key === 'avatar' ? get_avatar(user) : <div>{user[key]}</div>
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </thead>
        </table>
    )
}
