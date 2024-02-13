import React from 'react';
import './List.scss';

export default function List({ children }: { children: React.ReactNode }) {
    return (
        <div className='app__users-list users-list'>
            <table className='users-list__table'>{children}</table>
        </div>
    )
}
