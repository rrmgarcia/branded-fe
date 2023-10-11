import React from "react";
import { useState } from "react";
import styles from "../styles/Login.module.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "../components/Modal";
import UserController from "../controllers/UserController";
import { Link } from "react-router-dom";

function Login(props) {
  const {
    handleChange,
    handleSubmit,
    username,
    password,
    usernameError,
    passwordError,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.main_bg}>
      <div className={styles.login_bg}>
        <Link to={"/"}>
          <div className={styles.login_welcome}></div>
        </Link>
        <form className={styles.form} onSubmit={handleSubmit}>
          <p> Merchant Login Panel</p>
          <hr />
          <div className={styles.username}>
            <label htmlFor="username">
              <input
                className={styles.input}
                type="text"
                id="username"
                value={username}
                onChange={handleChange}
                placeholder="Enter Username"
              ></input>
            </label>

            {/* <br /> */}
            <label htmlFor="password">
              <input
                className={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter Password"
              ></input>
            </label>

            {/* {usernameError && passwordError ? (
              <div>Username or Password is incorrect. Please try again.</div>
            ) : null} */}
          </div>
          {passwordError ? <div>Please enter valid password.</div> : null}
          {usernameError ? <div>Please enter valid username.</div> : null}

          <button type="submit" value="Login" className={styles.submit}>
            Log in
          </button>
          <div className={styles.create}>
            <p>Not a Member? &nbsp;</p>
            <p className={styles.button} onClick={openModal}>
              Register today
            </p>
          </div>
        </form>
      </div>
      <Modal open={isModalOpen} onClose={closeModal}>
        <UserController  onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default Login;
