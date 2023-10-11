import { useState, useContext } from "react";
import Login from "../views/Login";
import { useNavigate } from "react-router-dom";
import UserModel from "../models/UserModel";
import { AuthContext } from "../models/providers/AuthProvider";
import { toast } from "react-hot-toast";

const UserController = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({ username: "", password: "" });
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [doesNotMatch, setDoesNotMatch] = useState(false);

  const [state, dispatch] = useContext(AuthContext);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "username":
        const username = event.target.value;
        setUserData({ ...userData, username: username });
        if (username.length === 0 && !usernameError) {
          setUsernameError(true);
        } else if (usernameError) {
          setUsernameError(false);
        }
        break;
      case "password":
        const password = event.target.value;
        setUserData({ ...userData, password: password });
        if (password.length === 0 && !passwordError) {
          setPasswordError(true);
        } else if (passwordError) {
          setPasswordError(false);
        }
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loggedInUserData = await UserModel.login(
        userData.username,
        userData.password
      );
      dispatch({ type: "SAVE_USERDATA", payload: loggedInUserData });
      if (!loggedInUserData) {
        setDoesNotMatch(true);
        toast.error("Login Failed!")
      } else {
        setDoesNotMatch(false);
          toast.success("Login Successful!");
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      toast.error("Invalid Login Credentials.");
      throw new Error(`Login Error: ${error}`);
    } 
  };
  return (
    <div>
      <Login
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        username={userData.username}
        password={userData.password}
        usernameError={usernameError}
        passwordError={passwordError}
        doesNotMatch={doesNotMatch}
      />
    </div>
  );
};

export default UserController;
