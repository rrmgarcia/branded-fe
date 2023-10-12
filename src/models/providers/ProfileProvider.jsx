import { createContext, useState, useEffect } from "react";

const ProfileContext = createContext();

const ProfileProvider = (props) => {
  const [builderAndProduct, setBuilderAndProduct] = useState("");
  // console.log("contextItems:",builderAndProduct)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://localhost:3000/profile/${userId}`)
      .then((response) => response.json())
      .then((data) => setBuilderAndProduct(data))
      .catch((error) =>
        console.error("Error fetching active products:", error)
      );
  }, []);

  return (
    <ProfileContext.Provider value={[builderAndProduct, setBuilderAndProduct]}>
      {props.children}
    </ProfileContext.Provider>
  );
};

export {ProfileContext, ProfileProvider };
