import { Avatar, Checkbox } from 'antd';
import { TypeListBodyProps } from '../../types/props';
import './ListBody.scss';


export default function ListBody({ columns, data, handleChangeSelect }: TypeListBodyProps) {
    return (
        <tbody className='users-list__body list-body'>
            {data.map((user) => (
                <tr className={`list-body__row list-body__row ${String(user.selected)}`} key={`user-${user['id']}`} >
                    <td className='list-body__col list-body__col_selected'>
                        <Checkbox checked={user.selected} onChange={() => handleChangeSelect(user.id)} />
                    </td>
                    {columns.map(({ key }) => (
                        <td className={`list-body__col list-body__col_${key}`} key={`table-user-${key}`} >

                            {
                                key !== 'avatar'
                                    ?
                                    <div>{user[key]}</div>
                                    :
                                <Avatar src={user.avatar}>{Array.from(user.name)[0]}</Avatar>
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}
