import styles from "./ProfileCard.module.scss";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const ProfileCard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <Card>
      {!user ? (
        <span>No user found</span>
      ) : (
        <div className={styles.profile}>
          <img
            src={user ? user.picture : ""}
            alt={user.picture}
            referrerPolicy="no-referrer"
          />
          <div className={styles.nameContainer}>
            <h3>{user.name}</h3>
            {/* <span>{user.position}</span>
            <span>UserId: {user.id}</span> */}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
