import React, { useEffect, useState, useContext } from "react";
import Profile from "../components/Profile";
import imageDB from "../FirebaseImages/Config";
import BuilderProfileModel from "../models/BuilderProfileModel";
import { ProfileContext } from "../models/providers/ProfileProvider";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { string } from "prop-types";
import { toast } from "react-hot-toast";

const BuilderProfileController = () => {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);

  // Initialize the state with values from localStorage or the context
  const [builderProfileData, setBuilderProfileData] = useState(() => {
    const storedData =
      JSON.parse(localStorage.getItem("builderProfileData")) || {};
    return {
      avatar: "",
      title: builderAndProduct.userProfile?.title || storedData.title || "",
      subtitle:
        storedData.subtitle || builderAndProduct.userProfile?.subtitle || "",

      description:
        storedData.description ||
        builderAndProduct.userProfile?.description ||
        "",

      userId: "",
      themeStyle: "",
      bgImage: "",
      carouselToggle: "",
      carouselImgs: [],
      carouselToggle: "on",
      links: {
        fb:
          builderAndProduct.userProfile?.links?.fb ||
          storedData.links?.fb ||
          "",
        ig:
          builderAndProduct.userProfile?.links?.ig ||
          storedData.links?.ig ||
          "",
        tiktok:
          builderAndProduct.userProfile?.links?.tiktok ||
          storedData.links?.tiktok ||
          "",
        x: builderAndProduct.userProfile?.links?.x || storedData.links?.x || "",
      },
    };
  });

  const [updatedProfile, setUpdatedProfile] = useState(null);
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [links, setLinks] = useState({ fb: "", ig: "", tiktok: "", x: "" });
  const [selectedTheme, setSelectedTheme] = useState("default");

  const handleImgUpload = (e) => {
    e.preventDefault();
    setImg(e.target.files[0]);
  };

  const handleImgSave = (e) => {
    if (img !== null) {
      const userId = localStorage.getItem("userId");
      const imgRef = ref(imageDB, `${userId}/Uploads/${v4()}`);
      uploadBytes(imgRef, img).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          setImgUrl(url);
          toast.success("Image successfully uploaded!");
        });
      });
    }
  };

  const handleDeleteImg = (e) => {
    const lastUploadedImgUrl = imgUrl;

    const imgRef = ref(imageDB, lastUploadedImgUrl);

    deleteObject(imgRef)
      .then(() => {
        setImgUrl(null);
        setBuilderProfileData({ ...builderProfileData, avatar: "" });
        toast.success("Image successfully deleted!");
      })
      .catch((error) => {
        toast.error("Unable to delete image");
        console.error("Error deleting image:", error);
      });
  };

  useEffect(() => {
    // Update builderProfileData.avatar when imgUrl changes
    setBuilderProfileData((prevProfileData) => ({
      ...prevProfileData,
      avatar: imgUrl,
    }));
  }, [imgUrl]);
  // Persist data to localStorage whenever builderProfileData changes
  useEffect(() => {
    localStorage.setItem(
      "builderProfileData",
      JSON.stringify(builderProfileData)
    );
  }, [builderProfileData]);

  // Persist data to localStorage whenever builderProfileData changes
  useEffect(() => {
    localStorage.setItem(
      "builderProfileData",
      JSON.stringify(builderProfileData)
    );
  }, [builderProfileData]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    listAll(ref(imageDB, `${userId}/Uploads`)).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl(url);
        });
      });
    });
  }, []);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        const title = e.target.value;
        setBuilderProfileData({ ...builderProfileData, title: title });
        break;
      case "subtitle":
        const subtitle = e.target.value;
        setBuilderProfileData({ ...builderProfileData, subtitle: subtitle });
        break;
      case "description":
        const description = e.target.value;
        setBuilderProfileData({
          ...builderProfileData,
          description: description,
        });
        break;
    }
  };

  useEffect(() => {
    // When the component mounts, check if the context has links and set them in the state
    if (builderAndProduct.userProfile?.links) {
      setLinks({
        fb: builderAndProduct.userProfile.links.fb,
        ig: builderAndProduct.userProfile.links.ig,
        tiktok: builderAndProduct.userProfile.links.tiktok,
        x: builderAndProduct.userProfile.links.x,
      });
    }
  }, [builderAndProduct.userProfile]);

  const handleLinkChange = (e, id) => {
    switch (id) {
      case "fb":
        const fb = e.target.value;
        setBuilderProfileData({
          ...builderProfileData,
          links: { ...builderProfileData.links, fb: fb },
        });
        break;
      case "ig":
        const ig = e.target.value;
        setBuilderProfileData({
          ...builderProfileData,
          links: { ...builderProfileData.links, ig: ig },
        });
        break;
      case "tiktok":
        const tiktok = e.target.value;
        setBuilderProfileData({
          ...builderProfileData,
          links: { ...builderProfileData.links, tiktok: tiktok },
        });
        break;
      case "x":
        const x = e.target.value;
        setBuilderProfileData({
          ...builderProfileData,
          links: { ...builderProfileData.links, x: x },
        });
        break;
    }
  };

  const handleLinkSave = () => {
    setLinks({
      fb: builderProfileData.links.fb,
      ig: builderProfileData.links.ig,
      tiktok: builderProfileData.links.tiktok,
      x: builderProfileData.links.x,
    });
  };
  const handleThemeClick = (themeValue) => {
    setSelectedTheme(themeValue);

    // Update builderProfileData with the selected theme
    setBuilderProfileData((prevProfileData) => ({
      ...prevProfileData,
      themeStyle: themeValue,
    }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const updatedBuilderProfile = {
        ...builderProfileData,
        avatar: imgUrl,
        userId: userId,
      };

      // Use the updateBuilderProfileById function to update the profile
      const response = await BuilderProfileModel.updateBuilderProfileById(
        userId,
        updatedBuilderProfile
      );

      if (response) {
        setUpdatedProfile(updatedBuilderProfile);
        toast.success("Profile successfully updated!");
        setTimeout(()=>{
          window.location.reload()
        },1500)
      } else {
        toast.error("Unable to update profile");
        console.error("Failed to update profile:", response);
      }
    } catch (error) {
      toast.error("Unable to update profile");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div>
      <Profile
        handleChange={handleChange}
        handleSave={handleSave}
        handleImgUpload={handleImgUpload}
        handleImgSave={handleImgSave}
        title={builderProfileData.title}
        subtitle={builderProfileData.subtitle}
        description={builderProfileData.description}
        imgUrl={imgUrl}
        handleDeleteImg={handleDeleteImg}
        handleLinkChange={handleLinkChange}
        handleLinkSave={handleLinkSave}
        links={links}
        handleThemeClick={handleThemeClick}
        avatar={builderProfileData.avatar}
      />
    </div>
  );
};

export default BuilderProfileController;
