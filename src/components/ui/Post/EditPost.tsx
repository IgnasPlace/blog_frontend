import React, { useEffect, useState, useRef } from "react";
import Button from "../Button/Button";
import styles from "./EditPost.module.scss";
import { PostType, postsActions } from "../../../store";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";

type Props = {
  title: string;
  post: PostType;
  closeEditView: () => void;
};

const EditPost = (props: Props) => {
  const [titleInput, setTitleInput] = useState(props.post.title);
  const [bodyInput, setBodyInput] = useState("");
  const [formFailed, setFormFailed] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [bodyInputHeigth, setBodyInputHeigth] = useState("10rem");

  const bodyInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setBodyInput(props.post.body);
  }, [props.post.body]);

  useEffect(() => {
    if (
      bodyInputRef.current !== null &&
      bodyInputRef.current.scrollHeight < 400
    ) {
      setBodyInputHeigth(bodyInputRef.current.scrollHeight + "px");
    }
  }, [bodyInput]);

  const dispatch = useDispatch();

  const EditPostHandler = async (updatedPost: PostType) => {
    setUpdating(true);
    // send http delete request to the server
    await fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      }
    )
      .then((res) => {
        // if request succesfull - remove it from store
        if (res.ok) {
          dispatch(postsActions.updatePost(updatedPost));
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setUpdating(false);
        props.closeEditView();
      });
  };

  const bodyInputChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBodyInput(e.target.value);
  };

  const onSavePostHandler = () => {
    if (titleInput && bodyInput && props.post) {
      EditPostHandler({
        ...props.post,
        title: titleInput.trim(),
        body: bodyInput.trim(),
        edited: true,
      });
    } else {
      if (!formFailed) {
        setFormFailed(true);
        setTimeout(() => setFormFailed(false), 300);
      }
    }
  };

  const variants = {
    shake: {
      opacity: 1,
      x: [0, -15, 15, -10, 10, 0],
      transition: {
        ease: "easeIn",
        duration: 0.3,
      },
    },
    show: {
      opacity: 1,
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={styles.editContainer}
        initial={{ opacity: 0, height: 200 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h3>Edit Post</h3>
        <form onSubmit={(e) => e.preventDefault()} className="form">
          <div className={styles.inputContainer}>
            <label htmlFor="title">Title:</label>
            <textarea
              className={styles.inputTitle}
              name="title"
              id="title"
              value={titleInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setTitleInput(e.target.value)
              }
            />
            <m.span
              key="animation-on-form-failed"
              variants={variants}
              animate={formFailed ? "shake" : ""}
              className={titleInput ? styles.hidden : styles.error}
            >
              Please add the title
            </m.span>
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="content">Content:</label>
            <m.textarea
              className={styles.inputBody}
              style={{ height: bodyInputHeigth }}
              ref={bodyInputRef}
              name="content"
              id="content"
              value={bodyInput}
              onChange={bodyInputChangeHandler}
            />
            <m.span
              key="animation-on-form-failed"
              initial={{ opacity: 0 }}
              variants={variants}
              animate={formFailed ? "shake" : "show"}
              className={bodyInput ? styles.hidden : styles.error}
            >
              Please add the content
            </m.span>
          </div>
          {updating ? (
            <h2>
              Updating... <Loading />
            </h2>
          ) : (
            <div className={styles.actions}>
              <Button
                title="Cancel"
                type="cancel"
                onClick={props.closeEditView}
              />
              <Button
                title="Save"
                class="editConfirm"
                onClick={onSavePostHandler}
              />
            </div>
          )}
        </form>
      </m.div>
    </LazyMotion>
  );
};

export default EditPost;
