import React, { useState, useEffect } from "react";
import productModel from "../models/ProductModel";
import Home from "../views/Home";
import { v4 } from "uuid";
import axios from "axios";
import imageDB from "../FirebaseImages/Config";
import ModalBottom from "../components/ModalBottom";
import AddProduct from "../components/AddProduct";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { toast } from "react-hot-toast";

const ScrapeWithProductController = () => {
  const [title, setTitle] = useState("");
  const [imageSrcList, setImageSrcList] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productImgUrl, setProductImgUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [product, setProduct] = useState({
    productId: v4(),
    userId: "",
    productDetails: [
      {
        productId: v4(),
        name: productName,
        link: "",
        category: category,
        image: "",
      },
    ],
  });
  const handleUrlInputChange = (value) => {
    setUrlInput(value);
  };
  const handleProductNameChange = (value) => {
    setProductName(value);
  };
  const [error, setError] = useState(null);

  useEffect(() => {
    if (urlInput) {
      axios
        .get(
          `https://branded-be.onrender.com/product/scrape/${encodeURIComponent(urlInput)}`
        )
        .then((response) => {
          const { title, imageSrcList } = response.data;
          setTitle(title);
          setImageSrcList(imageSrcList);
          setCategory("Default Category");
          setProductName(title);
          setProduct((prevProduct) => ({
            ...prevProduct,
            link: urlInput,
            image: imageSrcList,
          }));
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              "Request failed with status code:",
              error.response.status
            );
          } else if (error.request) {
            console.error("No response received from the server.");
          } else {
            console.error("Error making the request:", error.message);
          }
        });
    }
  }, [urlInput]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Get the userID from localStorage
      const userId = localStorage.getItem("userId");

      // Create a new product object with the details
      const newProductDetails = {
        productId: v4(),
        name: productName,
        link: urlInput,
        category: category,
        image: imageSrcList !== "" ? imageSrcList : imgUrl,
      };

      // Check if the user has an existing product collection
      let existingUserProducts = await productModel.findProductsByUserId(
        userId
      );

      if (existingUserProducts === null) {
        // If the user's product collection doesn't exist, create a new one
        existingUserProducts = await productModel.createProduct({
          userId: userId,
          productDetails: [newProductDetails],
        });
        toast.success("Product added!");
      } else {
        // If the user's product collection exists, update it

        const updatedProductCollection =
          await productModel.updateProductDetails(userId, {
            ...newProductDetails,
          });

        toast.success("Product added!");

        if (!updatedProductCollection) {
          setError(
            "Error updating product collection. Please try again later."
          );
          return;
        }
      }

      if (existingUserProducts) {
        setError(null);
      } else {
        setError(
          "Error creating/updating product collection. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error adding/updating product details:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const handleProductImgUpload = (e) => {
    e.preventDefault();
    setProductImg(e.target.files[0]);
  };

  const handleProductImgSave = (e) => {
    e.preventDefault();
    if (productImg !== null) {
      const userId = localStorage.getItem("userId");
      const imgRef = ref(imageDB, `${userId}/productUploads/${v4()}`);
      uploadBytes(imgRef, productImg).then((val) => {
        getDownloadURL(val.ref).then((url) => {
          setProductImgUrl(url);
        });
      });
      toast.success("Image saved successfully!");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    listAll(ref(imageDB, `${userId}/productUploads`)).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setProductImgUrl(url);
        });
      });
    });
  }, []);

  const handleOpenModal = () => {
    openModal();
  };

  const openModal = (event) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Home openModal={handleOpenModal} />
      <ModalBottom open={isModalOpen} onClose={closeModal}>
        <AddProduct
          handleProductImgSave={handleProductImgSave}
          handleProductImgUpload={handleProductImgUpload}
          handleSubmit={handleSubmit}
          category={category}
          handleCategoryChange={handleCategoryChange}
          productId={product.productId}
          productName={productName}
          handleProductNameChange={handleProductNameChange}
          link={product.link}
          image={product.image}
          handleNameChange={handleNameChange}
          imageSrcList={imageSrcList}
          title={title}
          handleUrlInputChange={handleUrlInputChange}
        />
      </ModalBottom>
    </div>
  );
};

export default ScrapeWithProductController;
