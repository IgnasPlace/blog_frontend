import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import styles from "./CreatePost.module.scss";
import { NewPostType, UserType } from "../../../store/types";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loading from "../Loading/Loading";
// import { useDispatch } from "react-redux";

type Props = {
  user: UserType | null;
};

const CreatePost = ({ user }: Props) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [formFailed, setFormFailed] = useState(false);
  const [creating, setCreating] = useState(false);
  // const [bodyInputHeigth, setBodyInputHeigth] = useState("10rem");

  const navigate = useNavigate();

  const bodyInputRef = useRef<HTMLTextAreaElement | null>(null);

  // useEffect(() => {
  //   if (
  //     bodyInputRef.current !== null &&
  //     bodyInputRef.current.scrollHeight < 400
  //   ) {
  //     setBodyInputHeigth(bodyInputRef.current.scrollHeight + "px");
  //   }
  // }, [bodyInput]);

  // const dispatch = useDispatch();

  const CreatePostHandler = async (newPost: NewPostType) => {
    setCreating(true);
    await fetch(`${import.meta.env.VITE_API_URL}/api/v1/posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (res.ok) {
          setTitleInput("");
          setBodyInput("");
          // dispatch(postsActions.updatePost(newPost));
          return res.json();
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCreating(false);
        // props.closeEditView();
      });
  };

  const bodyInputChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setBodyInput(e.target.value);
  };

  const onSavePostHandler = () => {
    if (titleInput && bodyInput && user) {
      CreatePostHandler({
        title: titleInput.trim(),
        body: bodyInput.trim(),
        createdAt: new Date(Date.now()).toISOString(),
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
        className={styles.createPostContainer}
        initial={{ opacity: 0, height: 200 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.formContainer}>
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
                // style={{ height: bodyInputHeigth }}
                className={styles.inputBody}
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
            {creating ? (
              <h2>
                Creating... <Loading />
              </h2>
            ) : (
              <div className={styles.actions}>
                <Button
                  title="Cancel"
                  type="cancel"
                  // onClick={props.closeEditView}
                />
                <Button
                  title="Save"
                  class="editConfirm"
                  onClick={onSavePostHandler}
                />
              </div>
            )}
          </form>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default CreatePost;
