import styles from "../styles/NavBarTop.module.css";
// import icons from "../styles/Icons.module.css";
import { Link } from "react-router-dom";

const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.clear();
};
function NavBarTop() {
  return (
    <div className={styles.navbar_container}>
      {/* <p>Logout</p> */}
      <div className={styles.group}>
        <div className={styles.home}></div>
        <div className={styles.logout}>
          <p> Logout</p>
          <Link to={"/login"}>
            {/* <p className={styles.back}></p> */}
            <div className="material-symbols-outlined" onClick={handleLogout}>
              arrow_forward
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NavBarTop;
