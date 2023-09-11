import UserRow from '../UserRow/UserRow';
import css from './UserTable.module.css'


export default function UserTable({ users, onRowClick }) {
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
          <th>Добавить/удалить</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} onRowClick={onRowClick} />
        ))}
      </tbody>
    </table>
  );
}