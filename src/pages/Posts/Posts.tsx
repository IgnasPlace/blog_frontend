import { useDispatch, useSelector } from "react-redux";
import { RootState, postsActions } from "../../store";
import { useEffect, useState } from "react";

import styles from "./Posts.module.scss";
import Post from "../../components/ui/Post/Post";
import ProfileCard from "../../components/ui/ProfileCard/ProfileCard";
import Loading from "../../components/ui/Loading/Loading";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    const updatePostsHandler = async function (): Promise<void> {
      setLoading(true);

      await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            dispatch(postsActions.updatePosts(data));
          }
        })
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    };
    updatePostsHandler();
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.postsContainer}>
        <div className={styles.loading}>
          <Loading />
        </div>
      </div>
    );
  }

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
              <h2>Posts</h2>
              <span className={styles.totalPosts}>{posts.length}</span>
            </div>
            <ProfileCard />
          </m.div>
        </LazyMotion>
        {posts.length === 0 ? (
          <h3 className={styles.noPosts}>No posts found..</h3>
        ) : (
          <ul className={styles.postsList}>
            <AnimatePresence>
              {posts.map((post) => {
                return <Post post={post} key={post.id} />;
              })}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </>
  );
};

export default Posts;
