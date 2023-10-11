import styles from "../styles/UploadAvatar.module.css";

function UploadAvatar(props) {
  const { handleImgUpload, handleImgSave } = props;
  return (
    <div className={styles.container}>
      <p>Upload Avatar Image</p>
      <div className={styles.group}>
        <input type="file" accept="image/*" onChange={handleImgUpload} />
        <button onClick={handleImgSave}>Upload Avatar</button>
      </div>
    </div>
  );
}

export default UploadAvatar;
