import { useState } from "react";
import { useSelector } from "react-redux";
import { PostType, RootState } from "../../../store";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Card from "../Card/Card";
import EditPost from "./EditPost";
import styles from "./Post.module.scss";
import PostContent from "./PostContent";

type Props = {
  post: PostType;
};

const Post = (props: Props) => {
  const [EditViewOpened, setEditViewOpened] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const { post } = props;

  let content;

  if (EditViewOpened) {
    content = (
      <EditPost
        post={post}
        closeEditView={() => setEditViewOpened(false)}
        title="Delete"
      />
    );
  } else {
    content = (
      <PostContent
        post={post}
        user={user}
        openEditView={() => setEditViewOpened(true)}
      />
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.li
        className={`${styles.post} listItem`}
        key={post.id}
        initial={{ opacity: 0, y: -24, marginBottom: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto", marginBottom: 24 }}
        exit={{ opacity: 0, y: -24, height: 0, marginBottom: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Card>{content}</Card>
      </m.li>
    </LazyMotion>
  );
};

export default Post;
