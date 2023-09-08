import css from './UserPosts.module.css';

export default function UserPosts({ post }) {
    return (
        <div className={css.user__card}>
            <h6>Post №{post.id}</h6>
            <h5>{post.title}</h5>
            <p>{post.body}</p>
        </div>
    );
}