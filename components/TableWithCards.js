import UserCard from "./UserCard";
import { useState } from "react";
import FetchUsers from "./FetchUsers";
import css from "./TableWithCards.module.css"

export default function TableWithCards() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [posts, setPosts] = useState([]);

    async function handleRowClick(userId) {
        const currentUser = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUserDetails(await currentUser.json());
        setSelectedUser(userId);
    };

    async function handlePostsClick() {
        console.log('click')
    };

    return (
        <div>
            <FetchUsers onRowClick={handleRowClick} />
            {selectedUser && (
                <div className={css.card__container}>
                    <UserCard user={userDetails} onPostsClick={handlePostsClick} />
                </div>   
            )}
        </div>
    );
}