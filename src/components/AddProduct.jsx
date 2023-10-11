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
        <p>Add new product</p>
        <hr />
        <div className={styles.group}>
          <p>Category</p>
          <input type="text" value={category} onChange={handleCategoryChange} />

          <p>Link to Product</p>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              handleUrlInputChange(e.target.value); // Call the prop function
            }}
          />

          <p>Name</p>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              props.handleProductNameChange(e.target.value);
            }}
          />
        </div>
      </form>
      <div className={styles.save_button}>
        <p>Product Image</p>
        <div className={styles.image_preview}>
          <img
            className={styles.product_image}
            src={imageSrcList}
            alt="Product Image Preview"
          />
        </div>

        <input type="file" onChange={handleProductImgUpload} />
        <div className={styles.buttons}>
          <button type="button" onClick={handleProductImgSave}>
            Save new Product
          </button>
          <button type="submit">Done Upload</button>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
