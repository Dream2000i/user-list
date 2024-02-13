import { FilterOutlined, CheckSquareOutlined, SortAscendingOutlined, SortDescendingOutlined, CloseOutlined } from '@ant-design/icons';
import './ListHead.scss';
import { Popover } from 'antd';
import { sortDirection } from '../../types/helpers';
import { TypeListHeadProps } from '../../types/props';

export default function ListHead({ columns, filters, sorts, handleChangeFilter, handleClickSorting }: TypeListHeadProps) {
    return (
        <thead className='users-list__header list-head'>
            <tr className='list-head__row list-head__row'>
                <th className='list-head__col list-head__col' >
                    <CheckSquareOutlined />
                </th>
                {columns.map(({ label, key, sort, filter }) => (
                    <th className='list-head__col list-head__col ' key={`table-col-${key}`}>
                        <div className="list-head__col-wrap">
                            {label}
                            {
                                sort &&
                                <span className={`list-head__sort ${sorts['field'] === key ? 'active' : ''}`} onClick={() => handleClickSorting(key)}>
                                    {sorts['direction'] === sortDirection.asc ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                                </span>
                            }
                            {
                                filter &&
                                <>
                                    <Popover
                                        trigger={['click']}
                                        content={<>Фильтр: <input value={String(filters[key] ?? '')} onInput={(e) => handleChangeFilter(e, key)} className='list-head__filter' /></>}

                                    >
                                        <FilterOutlined />
                                    </Popover>
                                    {
                                        filters[key] &&
                                        <CloseOutlined onClick={() => { handleChangeFilter(null, key) }} />
                                    }
                                </>
                            }
                        </div>
                    </th>
                ))}
            </tr>
        </thead>
    )
}
