import React, { useEffect, useState } from "react";
import Settings from "../views/Settings";
import { toast } from "react-hot-toast";
import UserModel from "../models/UserModel";

const SettingsController = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    switch (e.target.id) {
      case "email":
        const email = e.target.value;
        setUserData({ ...userData, email: email });
        break;
      case "username":
        const username = e.target.value;
        setUserData({ ...userData, username: username });
        break;
      case "password":
        const password = e.target.value;
        setUserData({ ...userData, password: password });
        break;
      case "confirmPassword":
        const confirmPassword = e.target.value;
        setUserData({ ...userData, confirmPassword: confirmPassword });
        break;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const updatedUserData = {
        ...userData,
        _id: userId,
      };
      const response = await UserModel.updateUserById(userId, updatedUserData);
      if (response) {
        setUserData(updatedUserData);
        toast.success("User data successfully updated!");
      } else {
        toast.error("Unable to update user data.");
        console.error("Failed to update:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Settings
        handleChange={handleChange}
        handleSave={handleSave}
        email={userData.email}
        username={userData.username}
        password={userData.password}
        confirmPassword={userData.confirmPassword}
      />
    </div>
  );
};

export default SettingsController;
