import styles from "../styles/AddGroup.module.css";

function AddGroup() {
  return (
    <div className={styles.container}>
      <p>Add Group</p>
      <div className={styles.group}>
        <input type="text" />
        <button type="button">Save</button>
      </div>
    </div>
  );
}

export default AddGroup;
