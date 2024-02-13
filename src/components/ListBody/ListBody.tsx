import { TypeListBodyProps } from '../../types/props';
import { TypeUser } from '../../types/usersList';
import './ListBody.scss';

const get_avatar = ({ avatar, name }: TypeUser) => {
    if (avatar) return <img src={avatar} alt='аватар' />;
    const symbol = Array.from(name)[0];
    return <div  className='img-placeholder'>{symbol}</div>;
}


export default function ListBody({ columns, data, handleChangeSelect }: TypeListBodyProps) {
    return (
        <tbody className='users-list__body list-body'>
            {data.map((user) => (
                <tr className={`list-body__row list-body__row ${String(user.selected)}`} key={`user-${user['id']}`} >
                    <td className='list-body__col list-body__col_selected'><input type="checkbox" value={String(user.selected)} onChange={() => handleChangeSelect(user.id)} /></td>
                    {columns.map(({ key }) => (
                        <td className={`list-body__col list-body__col_${key}`} key={`table-user-${key}`} >
                            {

                                key === 'avatar' ? get_avatar(user) : <div>{user[key]}</div>
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}
