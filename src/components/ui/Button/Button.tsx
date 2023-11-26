import styles from "./Button.module.scss";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: "cancel" | "delete";
  class?: string;
};

const Button = (props: ButtonProps) => {
  const { type, title, onClick } = props;

  let btnStyle = styles.btn;

  if (type === "cancel") {
    btnStyle = `${styles.btn} ${styles.cancel}`;
  }
  if (type === "delete") {
    btnStyle = `${styles.btn} ${styles.delete}`;
  }

  return (
    <button
      className={`${btnStyle} ${props.class ? props.class : ""}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
