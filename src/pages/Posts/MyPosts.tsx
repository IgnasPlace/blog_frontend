import { useSelector } from "react-redux";
import { RootState } from "../../store";
import styles from "./Posts.module.scss";
import Post from "../../components/ui/Post/Post";
import ProfileCard from "../../components/ui/ProfileCard/ProfileCard";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { UserType } from "../../store/types";

type Props = {
  user: UserType | null;
};

const MyPosts = ({ user }: Props) => {
  const myPosts = useSelector((state: RootState) => state.posts.posts).filter(post => user && post.user_id === user.id);

  return (
    <>
      <div className={styles.postsContainer}>
        <div className={styles.spacer}></div>
        <LazyMotion features={domAnimation}>
          <m.div
            className={styles.profileContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.headingContainer}>
              <h2>My Posts</h2>
              <span className={styles.totalPosts}>{myPosts.length}</span>
            </div>
            <ProfileCard />
          </m.div>
        </LazyMotion>
        {myPosts.length === 0 ? (
          <h3 className={styles.noPosts}>No posts found..</h3>
        ) : (
          <ul className={styles.postsList}>
            <AnimatePresence>
              {myPosts.map((post) => {
                return <Post post={post} key={post.id} />;
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </>
  );
};

export default MyPosts;
