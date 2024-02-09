import React, { useEffect, useState } from 'react'
import { TypePropsTable } from '../../types/table'
import { getUsers } from '../../api/users_api';

export default function Table() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then((data) => console.log(data))
    }, [])

    return (
        <table className='list_users'>
            <thead className='list_users__header'>
                <tr className='list_users__row list_users__row_header'>
                    <th className='list_users__col list_users__col_header'></th>
                </tr>
            </thead>
            <thead className='list_users__body'>
                <tr className='list_users__row list_users__row_body'>
                    <td className='list_users__col list_users__col_body'></td>
                </tr>
            </thead>
        </table>
    )
}
