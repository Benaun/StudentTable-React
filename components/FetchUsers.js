import { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import css from './FetchUsers.module.css'


export default function FetchUser({}) {
  const
    [users, setUser] = useState([]),
    [error, setError] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const
          response = await fetch('https://jsonplaceholder.typicode.com/users/');
        if (!response.ok) throw new Error('fetch ' + response.status);
        setUser(await response.json());
        setError(null);
      } catch (err) {
        setError(err);
      }
    }
    fetchUser();
  }, []);

  if (error)
    return <div>Ошибка: {error.message}</div>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>Таблица пользователей</h1>
      <UserTable users={users} />
    </div>
  );
}