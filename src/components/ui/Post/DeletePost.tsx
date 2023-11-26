import Button from "../Button/Button";
import styles from "./DeletePost.module.scss";
import { LazyMotion, domAnimation, m } from "framer-motion";

type Props = {
  title: string;
  question: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeletePost = (props: Props) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        transition={{ duration: 0.2 }}
        className={styles.deleteContainer}
      >
        <h3>{props.question}</h3>
        <div className={styles.actions}>
          <Button title="Cancel" type="cancel" onClick={props.onCancel} />
          <Button title="Delete" type="delete" class='deleteConfirm' onClick={props.onConfirm} />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default DeletePost;
