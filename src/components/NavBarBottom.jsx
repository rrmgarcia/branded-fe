import styles from "../styles/NavBarBottom.module.css";
import icons from "../styles/Icons.module.css";
import { Link } from "react-router-dom";

function NavBarBottom() {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.group}>
        <li>
          <Link to={"/home"} className={icons.icon}>
            <div className="material-symbols-outlined">Home</div>
          </Link>
        </li>
        <li>
          <Link to={"/builder"} className={icons.icon}>
            <div className="material-symbols-outlined">Build</div>
          </Link>
        </li>
        <li>
          <Link to={"/Settings"} className={icons.icon}>
            <div className="material-symbols-outlined">Settings</div>
            {/* <p>Settings</p> */}
          </Link>
        </li>
      </div>
    </div>
  );
}

export default NavBarBottom;
