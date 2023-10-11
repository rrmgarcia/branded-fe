class BuilderProfileModel {
  constructor() {}

  async createBuilderProfile(newBuilderProfile) {
    try {
      const response = await fetch("https://branded-be.onrender.com/builder", {
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
        body: JSON.stringify(newBuilderProfile),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to create builder profile");
      }
    } catch (err) {
      console.error("Error creating builder profile:", err);
      throw new Error("Failed to create builder profile");
    }
  }

  async findBuilderProfileById(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://branded-be.onrender.com/builder/${userId}`, {
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
        body: JSON.stringify(),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to get tasks");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateBuilderProfileById(userId, updatedBuilderProfile) {
    console.log("FE Model:", updatedBuilderProfile);
    try {
      const response = await fetch(`https://branded-be.onrender.com/builder/${userId}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(updatedBuilderProfile),
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to edit profile");
      } else {
        const data = await response.json();
        console.log("FE Model data:", data);
        console.log("Model data:", data);
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async deleteBuilderProfileById(profileId) {
    try {
      const response = await fetch(
        `https://branded-be.onrender.com/builder/${profileId}`,
        {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          redirect: "follow",
          referrerPolicy: "no-referrer",
        }
      );
      if (response.status === 401) {
        localStorage.removeItem("token");
        throw new Error("Unauthorized access");
      } else if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}

const model = new BuilderProfileModel();
export default model;
