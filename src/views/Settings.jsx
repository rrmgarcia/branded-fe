import styles from "../styles/Settings.module.css";
import NavBarSaveTop from "../components/NavBarSaveTop";
import NavBarSaveBottom from "../components/NavBarSaveBottom";

function Settings(props) {
  const {
    email,
    username,
    password,
    newPassword,
    confirmPassword,
    handleChange,
    handleSave,
  } = props;

  const value = "Settings";
  return (
    <>
      <div className={styles.container}>
        <NavBarSaveTop value={value} />
        <div className={styles.body}>
          <account className={styles.account_info}>
            <p className={styles.labels}>Account Information</p>
            <div className={styles.account_input}>
              <p>Username</p>
              <input
                type="text"
                className={styles.settingsInput}
                id="username"
                value={username}
                onChange={handleChange}
              />
              {/* <hr /> */}
              <p>Email</p>
              <input
                type="email"
                className={styles.settingsInput}
                id="email"
                value={email}
                onChange={handleChange}
              />
              {/* <hr /> */}
            </div>
          </account>
          <password className={styles.password}>
            <p className={styles.labels}>Password</p>
            <div className={styles.password_input}>
              <p>New Password</p>
              <input
                type="password"
                className={styles.settingsInput}
                id="newPassword"
                value={password}
                onChange={handleChange}
              />
              {/* <hr /> */}
              <p>Confirm Password</p>
              <input
                type="password"
                id="confirmPassword"
                className={styles.settingsInput}
                value={confirmPassword}
                onChange={handleChange}
              />
              {/* <hr /> */}
            </div>
          </password>
        </div>
        <NavBarSaveBottom value={value} handleSave={handleSave} />
      </div>
    </>
  );
}

export default Settings;
