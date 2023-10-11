import styles from "../styles/AddSlidesImages.module.css";

function AddBackground(props) {
  const { handleCarouselUpload, handleCarouselDelete, handleCarouselSave } =
    props;

  return (
    <div className={styles.container}>
      <p>Upload Slides Images</p>
      <div className={styles.group}>
        <div className={styles.group_items}>
          <input type="file" accept="image/*" onChange={handleCarouselUpload} />
          <button
            type="button"
            className={styles.delete}
            onClick={handleCarouselDelete}
          >
            <div className="material-symbols-outlined">delete</div>
          </button>
          <button type="button" onClick={handleCarouselSave}>
            <div className="material-symbols-outlined">check</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBackground;
