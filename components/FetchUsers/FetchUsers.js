import { useState, useEffect } from 'react';
import UserTable from '../UserTable/UserTable';
import css from './FetchUsers.module.css'


export default function FetchUser({ onRowClick }) {
  const
    [users, setUsers] = useState([]),
    [error, setError] = useState(null);
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
    if(!deleteBtn) return;
    const user = (deleteBtn.closest('tr[data-user-id]'));
    if(user) {
      const updateUsers = [...users];
      updateUsers.splice(user, 1);
      setUsers(updateUsers);
    }  
  }

  return (
    <div className={css.container}>
      <h1 className={css.title}>Таблица пользователей</h1>
      <div onClick={deleteUser} >
        <UserTable users={users} onRowClick={onRowClick} />
      </div>
    </div>
  );
}