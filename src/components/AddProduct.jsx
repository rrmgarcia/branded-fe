import React, { useState } from "react";
import styles from "../styles/AddProduct.module.css";
// import stylesDefault from "../themes/Default.module.css";
// import stylesDefault from "../themes/Default.module.css";

function AddProduct(props) {
  const [urlInput, setUrlInput] = useState("");
  const {
    handleProductImgSave,
    handleProductImgUpload,
    handleSubmit,
    category,
    handleCategoryChange,
    productId,
    productName,
    link,
    image,
    handleNameChange,
    imageSrcList,
    handleUrlInputChange,
  } = props;

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>Add Product by Link</p>

        <div className={styles.group}>
          <p>Product Link</p>
          <input
            type="text"
            placeholder="Input product link here..."
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              handleUrlInputChange(e.target.value); // Call the prop function
            }}
          />
          <p>Product Image</p>
          <div className={styles.image_preview}>
            <img
              className={styles.product_image}
              src={imageSrcList}
              alt="Product Image Preview"
            />
          </div>

          <div className={styles.linkProduct}>
            <div className={styles.name}>
              <p>Product Name</p>
              <input
                type="text"
                placeholder="Input product name here..."
                value={productName}
                onChange={(e) => {
                  props.handleProductNameChange(e.target.value);
                }}
              />
            </div>

            <div className={styles.productCategory}>
              <p>Category</p>
              <input
                type="text"
                placeholder="Input category here..."
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
      </form>
      <button type="button" onClick={handleSubmit}>
        Save Product Link
      </button>
      <p className={styles.or}>or</p>
      <div className={styles.save_button}>
        <p>Upload Product </p>

        <input type="file" onChange={handleProductImgUpload} />
        <div className={styles.buttons}>
          <button type="submit" onClick={handleProductImgSave}>
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
