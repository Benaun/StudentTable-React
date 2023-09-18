import { useState } from 'react';
import UserTable from './UserTable';
import GenFetcher from './GenFetcher';
import css from './StylesModules/FetchUsers.module.css';


export default function FetchUser({ onRowClick }) {
  const
    [users, setUsers] = useState([]),
    [sortColumns, setSortColumns] = useState('0'),
    [searchValue, setSearchValue] = useState(''),
    columns = [
      { title: 'Id', getVal: obj => obj.id },
      { title: 'Name', getVal: obj => obj.name },
      { title: 'Address', getVal: obj => obj.address?.city },
      { title: 'Email', getVal: obj => obj.email },
      { title: 'Website', getVal: obj => obj.website },
      { title: 'Phone number', getVal: obj => obj.phone },
      { title: 'Company name', getVal: obj => obj.company?.name },
      {
        title: 'Action', getVal: ({ id }) => <>
          <button className={css.btn__edit} data-id={id} data-action='edit'>Ред.</button>
          <button className={css.btn__del} data-id={id} data-action='delete'>X</button>
        </>
      }
    ];


  async function fetcher() {
    const
      response = await fetch('https://jsonplaceholder.typicode.com/users/');
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  }

  function onClick(evt) {
    const source = evt.target.closest('button[data-action]');
    if (source) {
      const { action } = source.dataset;
      switch (action) {
        case 'delete':
          const userDel = (source.closest('tr[data-user-id]'));
          if (userDel) {
            const updateUsers = [...users];
            updateUsers.splice(users, 1);
            setUsers(updateUsers);
          }
          return;
      }
      return;
    }
    const th = evt.target.closest('th');
    if (th && th.cellIndex !==7) {
      let newSort;
      if (Math.abs(sortColumns) === 1 + th.cellIndex) {
        newSort = -sortColumns;
      } else {
        newSort = 1 + th.cellIndex;
      }
      const { getVal } = columns[Math.abs(newSort) - 1];

      const sortedUsers = users.toSorted((a, b) => {
        switch (true) {
          case (typeof getVal(a) === 'number' && typeof getVal(b) === 'number'):
            return getVal(a) - getVal(b);
          case (typeof getVal(a) === 'string' && typeof getVal(b) === 'string'):
            return getVal(a).localeCompare(getVal(b));
        }
      });

      if (newSort < 0) {
        sortedUsers.reverse();
      }
      setUsers(sortedUsers);
      setSortColumns(newSort);
    }
  }

  function filterObjects(el) {
    if (!searchValue) return true;
    return columns.map(({ getVal }) => getVal(el)).filter(x => 'string' === typeof x).some(x => x.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <div className={css.container} onClick={onClick}>
      <h1 className={css.title}>Таблица пользователей</h1>
      <input className={css.search__input} placeholder='Поиск по таблице' value={searchValue} onInput={event => setSearchValue(event.target.value)} />
      <GenFetcher fetcher={fetcher} onLoadCallback={setUsers}>
        <UserTable users={users?.filter(filterObjects)} onRowClick={onRowClick} columns={columns} sortColumns={sortColumns} />
      </GenFetcher>
    </div>
  );
}
