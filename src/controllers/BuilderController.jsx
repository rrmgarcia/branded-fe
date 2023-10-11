import React, { useState, useEffect } from "react";
import imageDB from "../FirebaseImages/Config";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import BuilderProfileModel from "../models/BuilderProfileModel";
import Builder from "../views/Builder";
import toast, { Toaster } from "react-hot-toast";

const BuilderController = () => {
  const [updatedBgandCarouselImgs, setUpdatedBgandCarouselImgs] = useState({
    bgImage: "",
    carouselImgs: [],
  });
  const [bgImage, setBgImage] = useState("");
  const [bgImgUrl, setBgImgUrl] = useState("");
  const [carouselImgs, setCarouselImgs] = useState([]);
  const [carouselImgsUrl, setCarouselImgsUrl] = useState([]);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const handleBgImgUpload = (e) => {
    e.preventDefault();
    setBgImage(e.target.files[0]);
  };

  const handleBgImgSave = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (bgImage !== null) {
        const imgRef = ref(imageDB, `${userId}/BgImages/${v4()}`);
        uploadBytes(imgRef, bgImage).then((val) => {
          getDownloadURL(val.ref).then((url) => {
            setBgImgUrl(url);
          });
        });
      }
      const updatedProfile = {
        carouselImgsUrl: carouselImgsUrl,
        bgImage: bgImgUrl,
      };
      const response = await BuilderProfileModel.updateBuilderProfileById(
        userId,
        updatedProfile
      );
      if (response) {
        setUpdatedProfile(updatedProfile);
        toast.success("Background successfully updated!");
      } else {
        toast.error("Unable to update background.");
        console.error("Failed to update:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBgImgDelete = () => {
    const lastUploadedImgUrl = bgImgUrl;

    const imgRef = ref(imageDB, lastUploadedImgUrl);

    deleteObject(imgRef)
      .then(() => {
        setBgImgUrl(null);
        setUpdatedBgandCarouselImgs({
          ...updatedBgandCarouselImgs,
          bgImage: "",
        });
        toast.success("Background succesfully updated!");
      })
      .catch((error) => {
        toast.error("Unable to update background.");
        console.error("Error deleting image:", error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    listAll(ref(imageDB, `${userId}/BgImages`)).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setBgImgUrl(url);
        });
      });
    });
  }, []);

  const handleCarouselUpload = (e) => {
    e.preventDefault();
    setCarouselImgs(e.target.files[0]);
    toast.success("Image successfully uploaded!");
  };

  const handleCarouselSave = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      if (carouselImgs !== null) {
        const imgRef = ref(imageDB, `${userId}/Carousel/${v4()}`);
        uploadBytes(imgRef, carouselImgs).then((value) => {
          getDownloadURL(value.ref).then((url) => {
            setCarouselImgsUrl((data) => [...data, url]);
          });
        });
      }
      const updatedProfile = {
        bgImage: bgImgUrl,
        carouselImgs: carouselImgsUrl,
      };
      const response = await BuilderProfileModel.updateBuilderProfileById(
        userId,
        updatedProfile
      );
      if (response) {
        setUpdatedProfile(updatedProfile);
        toast.success("Profile successfully updated!");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Unable to update profile.");
        console.error("Failed to update:", response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCarouselDelete = () => {
    const lastUploadedImgUrl = carouselImgsUrl;

    const imgRef = ref(imageDB, lastUploadedImgUrl);

    deleteObject(imgRef)
      .then(() => {
        setCarouselImgsUrl([]);
      })
      .then(() => {
        setUpdatedBgandCarouselImgs({
          ...updatedBgandCarouselImgs,
          carouselImgs: carouselImgsUrl,
        });
        toast.success("Image successfully deleted!");
        setTimeout(()=>{
          window.location.reload()
        }, 1500)
      })
      .catch((error) => {
        toast.error("Unable to delete image.");
        console.error("Error deleting image:", error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    listAll(ref(imageDB, `${userId}/Carousel`)).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setCarouselImgsUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <Builder
        handleBgImgUpload={handleBgImgUpload}
        handleBgImgDelete={handleBgImgDelete}
        handleBgImgSave={handleBgImgSave}
        handleCarouselUpload={handleCarouselUpload}
        handleCarouselDelete={handleCarouselDelete}
        handleCarouselSave={handleCarouselSave}
      />
    </div>
  );
};

export default BuilderController;
