import css from './StylesModules/UserTable.module.css';


export default function UserTable({ users, columns, onRowClick }) {

  return (
    <table className={css.table}>
      <thead>
        <tr>
          {columns.map(({ title }) => <th key={title}>{title}</th>)}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => <tr
          onDoubleClick={() => onRowClick(user.id)}
          key={user.id}
          className={css.table__row}
          data-user-id={user.id}>

          {columns.map(({ title, getVal }) => <td key={title}>{getVal(user)}</td>)}
          <td>
            <button className={css.btn__edit} data-id={user.id} data-action='edit'>Ред.</button>
            <button className={css.btn__del} data-id={user.id} data-action='delete'>X</button>
          </td>
        </tr>)}
      </tbody>
    </table>
  );
}