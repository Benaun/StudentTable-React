import css from './UserRow.module.css'

export default function UserRow({ user, onRowClick }) {
  const
    { id, name, username, email,
      address: { street, suite, city },
      phone, website,
      company: {
        name: cname
      }
    } = user;

  const handleClick = () => {
    onRowClick(id);
  };

  return (
    <tr onDoubleClick={handleClick} className={css.table__row} data-user-id={id}>
      <td>{id}</td>
      <td>{name} ({username})</td>
      <td>{street} {suite} {city}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{website}</td>
      <td>{cname}</td>
      <td>
        <button className={css.btn__del} btn-type='delete'>X</button>
      </td>
    </tr>
  );
}