import styles from "../styles/UploadImage.module.css";

function UploadProductImage(props) {
  const { handleProductImgUpload, handleProductImgSave } = props;
  return (
    <div className={styles.container}>
      <p>Upload Image</p>
      <div className={styles.group}>
        <input type="file" accept="image/*" onChange={handleProductImgUpload} />
        <p className={styles.labels}>
          *Max file size: 30MB. Supported file format: jpg, jpeg, gif, png, bmp
        </p>
      </div>
      <button type="button" onClick={handleProductImgSave}>Upload Image</button>
    </div>
  );
}

export default UploadProductImage;
