import css from './UserRow.module.css'

export default function UserRow({ user }) {
  const
    { id, name, username, email,
      address: { street, suite, city},
      phone, website,
      company: {
        name: cname
      }
    } = user;

  return (
    <tr className={css.table__row}>
      <td>{id}</td>
      <td>{name} {username}</td>
      <td>{street} {suite} {city}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>{website}</td>
      <td>{cname}</td>
    </tr>
  );
}