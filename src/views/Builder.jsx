import { useState, Link, useContext } from "react";
import "../index.css";
import styles from "../styles/Builder.module.css";
import Header from "../components/Header";
import Body from "../components/Body";
import NavBarSaveTop from "../components/NavBarSaveTop";
import ModalBottom from "../components/ModalBottom";
import AddBackground from "../components/AddBackground";
import { ProfileContext } from "../models/providers/ProfileProvider";
import icons from "../styles/Icons.module.css";

function Builder(props) {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
  const {
    handleBgImgUpload,
    handleBgImgDelete,
    handleBgImgSave,
    handleCarouselUpload,
    handleCarouselDelete,
    handleCarouselSave,
  } = props;
  const value = "Builder";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.home_container}>
      <NavBarSaveTop value={value} />
      <div className={styles.home_body}>
        <div className={styles.background}>
          <div className={styles.bg_container}>
            <h4>Background</h4>
            <div className={styles.dropdown}>
              <div className="material-symbols-outlined">more_horiz</div>
              <div className={styles.dropdrown_menu}>
                <div onClick={openModal}>Change your background</div>
              </div>
            </div>

            {/* <div>
              <p>Change your background</p>
            </div> */}
            {/* <button className={styles.dropdrown_menu} onClick={openModal}>
              more_horiz
            </button> */}
          </div>
        </div>
        <Header
          handleCarouselUpload={handleCarouselUpload}
          handleCarouselDelete={handleCarouselDelete}
          handleCarouselSave={handleCarouselSave}
        />
        <br />
        <Body />
        <div>
          <ModalBottom open={isModalOpen} onClose={closeModal}>
            <AddBackground
              handleBgImgUpload={handleBgImgUpload}
              handleBgImgDelete={handleBgImgDelete}
              handleBgImgSave={handleBgImgSave}
            />
          </ModalBottom>
        </div>
      </div>
    </div>
  );
}

export default Builder;
