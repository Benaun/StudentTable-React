import css from './UserCard.module.css';
import UserPosts from './UserPosts';

export default function UserCard({ user, showPosts, setShowPosts }) {
    const
        { id, name, username, email,
            address: { street, suite, city, zipcode },
            phone, website,
            company: { name: cname, catchPhrase, bs }
        } = user;

    return (
        <div className={css.user__card}>
            <div className={css.card__wrapper}>
                <div>
                    <h2>
                        {name} ({username})
                    </h2>
                    <p>Email: {email}</p>
                    <p>Telephone: {phone}</p>
                    <p>Wesite: {website}</p>
                </div>
                <div>
                    <div>
                        <p title={zipcode}>
                            Street: {street}, Suite: {suite}, City: {city}
                        </p>
                    </div>
                </div>
                <div>
                    <div>
                        <h2>Company</h2>
                        <p>Name: {cname}</p>
                        <p>
                            CatchPhrase: {catchPhrase}
                        </p>
                        <p>Bs: {bs}</p>
                    </div>
                </div>

                <button className={css.btn} onClick={() => setShowPosts(true)}>Посты</button>
            </div>
            {showPosts && <UserPosts id={id}/>}
        </div>
    );
}

