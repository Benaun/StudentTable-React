import UserRow from './UserRow';
import css from './UserTable.module.css'


export default function UserTable({ users }) {
  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя/Никнейм</th>
          <th>Адрес</th>
          <th>Почта</th>
          <th>Телефон</th>
          <th>Сайт</th>
          <th>Название компании</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}