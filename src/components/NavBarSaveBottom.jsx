import styles from "../styles/NavBarSaveBottom.module.css";
import { useNavigate } from "react-router-dom";

function NavBarSaveBottom(props) {
  const { value, handleSave } = props;
  const navigate = useNavigate();

  const cancel = () => {
    if (value === "Profile") {
      navigate("/builder");
    } else if (value === "Settings") {
      navigate("/home");
    }
  };
  return (
    <div className={styles.navbar_container}>
      <div className={styles.group}>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NavBarSaveBottom;
