import { postsActions } from "../../../store";
import { MdDeleteOutline, MdOutlineModeEditOutline } from "react-icons/md";
import styles from "./PostContent.module.scss";
import DeletePost from "./DeletePost";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../Loading/Loading";
import { PostType, UserType } from "../../../store/types";

type Props = {
  post: PostType;
  user: UserType | null;
  openEditView: () => void;
};

const PostContent = (props: Props) => {
  const [DeleteViewOpened, setDeleteViewOpened] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const dispatch = useDispatch();

  const { post, user, openEditView } = props;

  const deletePostHandler = async () => {
    setDeleteViewOpened(false);
    setDeleting(true);
    // send http delete request to the server
    await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ userId: user?.id }),
    })
      .then((res) => {
        // if request succesfull - remove it from the store
        if (res.ok) {
          dispatch(postsActions.deletePost(post.id));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setDeleting(false);
      });
  };

  let actionsContent;

  if (deleting) {
    actionsContent = (
      <h2>
        Deleting... <Loading />
      </h2>
    );
  } else if (DeleteViewOpened) {
    actionsContent = (
      <DeletePost
        onConfirm={deletePostHandler}
        onCancel={() => setDeleteViewOpened(false)}
        question="Are you sure you want to delete the post?"
        title="Delete"
      />
    );
  } else {
    actionsContent = (
      <div className={styles.actions}>
        <button
          className={`${styles.actionsEdit} editButton`}
          onClick={openEditView}
        >
          <MdOutlineModeEditOutline size="1.6rem" />
        </button>
        <button
          className={`${styles.actionsDelete} deleteButton`}
          onClick={() => setDeleteViewOpened(true)}
        >
          <MdDeleteOutline size="1.6rem" />
        </button>
      </div>
    );
  }

  return (
    <>
      <article className={styles.mainContent}>
        <h2>{post.title}</h2>
        <hr />
        <p>{post.body}</p>
      </article>
      <div>
        <span className={styles.userId}>Author: {post.user_name}</span>
        {post.updated_on && (
          <span className={styles.edited}>
            Edited on {post.updated_on.substring(0, 10)}
          </span>
        )}
      </div>
      {user && user.id === post.user_id && actionsContent}
    </>
  );
};

export default PostContent;
