import styles from "../styles/AddSocial.module.css";

function AddSocial(props) {
  const { handleLinkChange, handleLinkSave, id, handleCloseModal } = props;

  const onSaveClick = () => {
    // Call the handleLinkSave function to save the link
    handleLinkSave();

    // Close the modal by calling the handleCloseModal function
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <p>Add Your Social Media here</p>

      <div className={styles.group}>
        <input type="text" onChange={(e) => handleLinkChange(e, id)} />
        <button onClick={onSaveClick}>Save</button>
      </div>
    </div>
  );
}

export default AddSocial;
