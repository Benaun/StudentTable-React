import { useState } from 'react';
import UserTable from './UserTable';
import GenFetcher from './GenFetcher';
import AddUserRow from './AddNewUser';
import css from './StylesModules/FetchUsers.module.css';


export default function FetchUser({ onRowClick }) {
  const
    [users, setUsers] = useState([]),
    [searchValue, setSearchValue] = useState(''),
    columns = [
      { title: 'Id', getVal: obj => obj.id },
      { title: 'Name', getVal: obj => obj.name },
      { title: 'Address', getVal: obj => obj.address?.city },
      { title: 'Email', getVal: obj => obj.email },
      { title: 'Website', getVal: obj => obj.website },
      { title: 'Phone number', getVal: obj => obj.phone },
      { title: 'Company name', getVal: obj => obj.company?.name }
    ];

  async function fetcher() {
    const
      response = await fetch('https://jsonplaceholder.typicode.com/users/');
    if (!response.ok) throw new Error('fetch ' + response.status);
    return await response.json();
  }

  function onClick(evt) {
    const source = evt.target.closest('button[data-action]');
    if (!source) return;
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
      // case 'edit':
      //   const userEdit = (source.closest('tr[data-user-id]'));
      //   if (userEdit) {
      //     const updateUsers = [...users];
      //     updateUsers.splice(users, 1);
      //     setUsers(updateUsers);
      //   }
      //   return;

      // case 'add':
      //   setPaneInfoId(id);
      //   setPanelSubQueryId(null);
      //   return;
    }
  }

  function filterObjects(el) {
    if (!searchValue) return true;
    return columns.map(({ getVal }) => getVal(el)).filter(x => 'string' === typeof x).some(x => x.toLowerCase().includes(searchValue.toLowerCase()));
  }

  return (
    <div className={css.container} onClick={onClick}>
      <h1 className={css.title}>Таблица пользователей</h1>
      <input value={searchValue} onInput={event => setSearchValue(event.target.value)} />
      <GenFetcher fetcher={fetcher} onLoadCallback={setUsers}>
        <AddUserRow key={Date.now} users={users} handleFormSubmit={user => setUsers([...users, user])} />
        <UserTable users={users?.filter(filterObjects)} onRowClick={onRowClick} columns={columns} />
      </GenFetcher>
    </div>
  );
}
