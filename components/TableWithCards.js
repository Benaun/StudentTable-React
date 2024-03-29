import UserCard from "./UserCard";
import { useState } from "react";
import FetchUsers from "./FetchUsers";
import css from "./StylesModules/TableWithCards.module.css"

export default function TableWithCards() {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [showPosts, setShowPosts] = useState(false);
    

    async function handleRowClick(userId) {
        const currentUser = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        setUserDetails(await currentUser.json());
        setSelectedUser(userId);
    };

    const handleShowPost = () => {
        setShowPosts(!showPosts)
    }

    return (
        <div>
            <FetchUsers onRowClick={handleRowClick} />
            {selectedUser && (
                <div className={css.card__container}>
                    <UserCard user={userDetails} showPosts={showPosts} setShowPosts={handleShowPost}/>
                </div>   
            )}
        </div>
    );
}