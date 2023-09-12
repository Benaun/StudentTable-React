import { useState, useEffect } from 'react';
import UserTable from '../UserTable/UserTable';
import css from './FetchUsers.module.css';


export default function FetchUser({ onRowClick }) {
  const
    [users, setUsers] = useState([]),
    [error, setError] = useState(null);
    // [searchValue, setSearchValue] = useState('');

  const columns = [
    { title: 'Id', getVal: obj => obj.id },
    { title: 'Name', getVal: obj => obj.name },
    { title: 'Address', getVal: ({ address: { street, suite, city } }) => `${city}, ${street} ${suite}` },
    { title: 'Email', getVal: obj => obj.email },
    { title: 'Website', getVal: obj => obj.website },
    { title: 'Phone number', getVal: obj => obj.phone },
    { title: 'Company name', getVal: obj => obj.company.name },
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/');
        if (!response.ok) throw new Error('fetch ' + response.status);
        setUsers(await response.json());
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    fetchUser();
  }, []);

  if (error)
    return <div>Ошибка: {error.message}</div>;

  const deleteUser = (event) => {
    const deleteBtn = (event.target).closest('button[btn-type=delete]');
    if (!deleteBtn) return;
    const userDel = (deleteBtn.closest('tr[data-user-id]'));
    if (userDel) {
      const updateUsers = [...users];
      updateUsers.splice(users, 1);
      setUsers(updateUsers);
    }
  };

  // if (searchValue) {
  //   const seachUsers = users.filter(obj => columns
  //     .map(column => column.getVal(obj).toString().toLowerCase())
  //     .some(str => str.includes(searchValue.toLowerCase())));
  //   setUsers(seachUsers);
  // }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Таблица пользователей</h1>

      {/* <input type="search" value={searchValue} placeholder='Поиск' onInput={evt => setSearchValue(evt.target.value)}></input> */}

      <div onClick={(deleteUser)} >
        <UserTable users={users} onRowClick={onRowClick} columns={columns} />
      </div>
    </div>
  );
}
