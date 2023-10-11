import styles from "../styles/NavBarSaveTop.module.css";
import icons from "../styles/Icons.module.css";
import { Link } from "react-router-dom";

function NavBarSaveTop(props) {
  const { value } = props;
  return (
    <div className={styles.navbar_container}>
      {value === "Builder" ? (
        <div className={styles.group}>
          <Link to={"/home"} className={icons.icon}>
            <div className="material-symbols-outlined">arrow_back</div>
          </Link>
          <p>{value}</p>
        </div>
      ) : value === "Profile" ? (
        <div className={styles.group}>
          <Link to={"/builder"} className={icons.icon}>
            <div className="material-symbols-outlined">arrow_back</div>
          </Link>
          <p>{value}</p>
        </div>
      ) : value === "Settings" ? (
        <div className={styles.group}>
          <Link to={"/home"} className={icons.icon}>
            <div className="material-symbols-outlined">arrow_back</div>
          </Link>
          <p>{value}</p>
        </div>
      ) : null}
    </div>
  );
}

export default NavBarSaveTop;
