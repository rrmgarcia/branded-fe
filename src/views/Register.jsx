import styles from "../styles/Register.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Register(props) {
  const {
    email,
    username,
    password,
    confirmPassword,
    emailError,
    usernameError,
    passwordError,
    passDoesNotMatchError,
    handleChange,
    handleSubmit,
  } = props;

  return (
    <div className={styles.main_bg}>
      <p> Register </p>
      <form className="w-30 bg-white rounded p-3" onSubmit={handleSubmit}>
        <div className="mb2">
          <label htmlFor="email">Email</label>
          <input
            className="login-input form-control"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          ></input>
          {emailError ? (<div>Please enter valid Email</div>) : null}
        </div>
        <div className="mb2">
          <label htmlFor="username">Username</label>
          <input
            className="login-input form-control"
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
          ></input>
          {usernameError ? (<div>Please enter valid Username</div>) : null}
        </div>
        <div className="mb2">
          <label htmlFor="password">Password</label>
          <input className="login-input form-control" type="password" id="password" value={password} onChange={handleChange}></input>
          {passwordError ? (<div>Please enter valid Password</div>) : null}
        </div>
        <div className="mb2">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input className="login-input form-control" type="password" id="confirmPassword" value={confirmPassword} onChange={handleChange}></input>
          {passDoesNotMatchError ? (<div>Passwords do not match</div>) : null}
        </div>
        <button className="btn btn-success col-7 mt-3" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
