import React from "react";
import styles from "./Login.module.css";

const LoginForm = (props) => {
  const {
    handleChange,
    handleSubmit,
    username,
    password,
    usernameError,
    passwordError,
  } = props;
  return (
    <div className={styles.main_bg}>
      <p> Login </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.username}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
          ></input>
          {usernameError ? <div>Please enter valid username.</div> : null}
        </div>
        <div className={styles.password}>
          <label htmlFor="password">Password </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          ></input>
          {passwordError ? <div>Please enter valid password.</div> : null}
        </div>

        <div className={styles.button}>
          <button type="submit" value="Login" className={styles.button}>
            Submit
          </button>

          <button className={styles.button} onClick={openModal}>
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
