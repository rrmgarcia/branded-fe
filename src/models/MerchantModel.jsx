class MerchantModel {
  constructor() {}

  async createOrUpdateMerchant(newMerchantProfile) {
    try {
      const response = await fetch("https://branded-be.onrender.com/profile", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(newMerchantProfile),
      });

      if (response.ok) {
        const merchantData = await response.json();
        console.log("Product saved:", merchantData);
        return merchantData;
      } else {
        console.error("Error creating product:", response.statusText);
        throw new Error("Error creating product");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async getMerchantByUserId(userId) {
    console.log("userId was here getId", userId);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://branded-be.onrender.com/profile/merchant/${userId}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );

      if (response.ok) {
        console.log("existing");
        const data = await response.json();
        console.log("JSON response:", data); 
        return data;
      } else if (response.status === 404) {
        return null
        
      } else {
        throw new Error("Error fetching merchant by userId");
      }
    } catch (error) {
      console.error("Error fetching merchant by userId:", error);
      throw error;
    }
  }

  async delMerchant(userId) {
    console.log("userId was here", userId);
    try {
      const response = await fetch(`https://branded-be.onrender.com/profile/merchant/${userId}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        console.log("Delete success");
      } else if (response.status === 404) {
        return null;
      } else {
        throw new Error("Error deleting merchant by ID");
      }
    } catch (error) {
      console.error("Error deleting merchant by ID:", error);
      throw error;
    }
  }
}

const merchantModel = new MerchantModel();
export default merchantModel;
