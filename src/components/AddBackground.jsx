import styles from "../styles/AddBackground.module.css";

function AddBackground(props) {
  const { handleBgImgUpload, handleBgImgDelete, handleBgImgSave } = props;

  return (
    <div className={styles.container}>
      <p>Upload Background Image</p>
      <hr />
      <div className={styles.group}>
        <label htmlFor="file">
          <input type="file" accept="image/*" onChange={handleBgImgUpload} />
        </label>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.delete}
            onClick={handleBgImgDelete}
          >
            <div className="material-symbols-outlined">delete</div>
          </button>
          <button
            type="button"
            className={styles.save}
            onClick={handleBgImgSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBackground;
