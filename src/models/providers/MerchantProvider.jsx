import React, { useState, useEffect, useContext } from "react";

const MerchantDetailsContext = React.createContext();

const MerchantDetailsProvider = ({ children }) => {
  const [merchantDetails, setMerchantDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchMerchantDetails = async (merchantTitle) => {
    try {
      const response = await fetch(
        `http://localhost:3000/merchant/${merchantTitle}`
      );
      if (response.status === 404) {
        console.log("Merchant not found");
        setMerchantDetails({});
      } else if (response.ok) {
        const data = await response.json();
        setMerchantDetails(data);
        setLoading(false);
      } else {
        console.error("Error fetching merchant details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching merchant details:", error);
    }
  };

  useEffect(() => {
    fetchMerchantDetails(title);
  }, [title]);

  return (
    <MerchantDetailsContext.Provider
      value={{ merchantDetails, fetchMerchantDetails, loading }}
    >
      {children}
    </MerchantDetailsContext.Provider>
  );
}


 export {MerchantDetailsContext, MerchantDetailsProvider };

