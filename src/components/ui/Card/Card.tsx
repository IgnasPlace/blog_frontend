import styles from "./Card.module.scss";

type CardProps = {
  // children: React.ReactElement;
  children: string | JSX.Element | JSX.Element[];
};

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
