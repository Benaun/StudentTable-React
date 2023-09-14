import { useState } from 'react';

export default function AddUserRow({ users, handleFormSubmit }) {

    const
        [id, setId] = useState(genNewId(users)),
        [name, setName] = useState(''),
        [address, setAddress] = useState(''),
        [email, setEmail] = useState(''),
        [website, setWebsite] = useState(''),
        [phone, setPhone] = useState(''),
        [companyName, setCompanyName] = useState('');

    function genNewId(arr) {
        let maxId = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id > maxId) maxId = arr[i].id;
        }
        return maxId + 1;
    }

    return <tr>
        <td>{id}</td>
        <td><input type='text' placeholder='Имя' name='name' value={name} onChange={evt => setName(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Адрес' name='address' value={address} onChange={evt => setAddress(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Email' name='email' value={email} onChange={evt => setEmail(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Телефон' name='phone' value={phone} onChange={evt => setPhone(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Website' name='website' value={website} onChange={evt => setWebsite(evt.target.value)}></input></td>
        <td><input type='text' placeholder='Company' name='company name' value={companyName} onChange={evt => setCompanyName(evt.target.value)} ></input></td>
        <td>
            <button type='submit' onClick={() => handleFormSubmit({ id, name, email, address, website, phone, companyName })}>&#9989;</button>
        </td>
    </tr>
}