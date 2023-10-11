import styles from "../styles/Header.module.css";
import icons from "../styles/Icons.module.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Slides from "../components/Slides";
import ModalBottom from "../components/ModalBottom";
import AddSlidesImages from "../components/AddSlidesImages";
import BuilderProfileModel from "../models/BuilderProfileModel";
import { ProfileContext } from "../models/providers/ProfileProvider";
function Header(props) {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
  const { handleCarouselUpload, handleCarouselDelete, handleCarouselSave } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = async () => {
    const newValue = !isChecked;
    console.log("New Value:", newValue);
    setIsChecked(newValue);

    try {
      const userId = localStorage.getItem("userId");

      const toggleValue = newValue ? "on" : "off";

      const updatedProfile = {
        carouselToggle: toggleValue,
      };

      const response = await BuilderProfileModel.updateBuilderProfileById(
        userId,
        updatedProfile
      );

      if (response) {
        console.log(`Toggle value updated to "${toggleValue}":`, response);
      } else {
        console.error(
          `Failed to update toggle value to "${toggleValue}":`,
          response
        );
      }
    } catch (error) {
      console.error("Error updating toggle value:", error);
    }
  };

  console.log(isChecked);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.profile_container}>
          <div className={styles.dropdown}>
            <div className="material-symbols-outlined">more_horiz</div>
            <div className={styles.dropdrown_menu}>
              <Link to={"/builder/profile"} className={styles.a}>
                Edit Profile
                {/* <div className="material-symbols-outlined ">more_horiz</div> */}
              </Link>
            </div>
          </div>
          <div>
            {!builderAndProduct.userProfile ||
            !builderAndProduct.userProfile.avatar ? (
              <img
                className={styles.avatar}
                src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              />
            ) : (
              <img
                className={styles.avatar}
                src={builderAndProduct.userProfile.avatar}
              />
            )}
          </div>
          <div className={styles.avatar_profile}>
            {!builderAndProduct.userProfile ||
            !builderAndProduct.userProfile.title ? (
              <h4>Mang Jose</h4>
            ) : (
              <h4>{builderAndProduct.userProfile.title}</h4>
            )}
            {!builderAndProduct.userProfile ||
            !builderAndProduct.userProfile.subtitle ? (
              <p>Your friendly baranggay superhero.</p>
            ) : (
              <p>{builderAndProduct.userProfile.subtitle}</p>
            )}
            {!builderAndProduct.userProfile ||
            !builderAndProduct.userProfile.description ? (
              <p>Your description</p>
            ) : (
              <p>{builderAndProduct.userProfile.description}</p>
            )}
          </div>
          <div className={styles.socials}>
            {builderAndProduct.userProfile &&
              builderAndProduct.userProfile?.links?.fb !== "" && (
                <a
                  href={builderAndProduct.userProfile.links.fb}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div id={styles.fb}></div>
                </a>
              )}

            {builderAndProduct.userProfile &&
              builderAndProduct.userProfile?.ig !== "" && (
                <a
                  href={builderAndProduct.userProfile.links.ig}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div id={styles.insta}></div>
                </a>
              )}

            {builderAndProduct.userProfile &&
              builderAndProduct.userProfile?.links?.tiktok !== "" && (
                <a
                  href={builderAndProduct.userProfile.links.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div id={styles.tiktok}></div>
                </a>
              )}

            {builderAndProduct.userProfile &&
              builderAndProduct.userProfile?.links?.x !== "" && (
                <a
                  href={builderAndProduct.userProfile.links.x}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div id={styles.yt}></div>
                </a>
              )}
          </div>
        </div>
        <Link to={""} className={icons.icon}>
          <div className="material-symbols-outlined" onClick={openModal}>
            more_horiz
          </div>
        </Link>

        <div className={styles.carousel_container}>
          {/* <div className={styles.dropdown}>
            <div className="material-symbols-outlined">more_horiz</div>
            <div className={styles.dropdrown_menu}>
              <div onClick={openModal}>Add Image Slide</div>
            </div>
          </div> */}
          <div className={styles.toggle}>
            <input
              type="checkbox"
              id="switch"
              checked={isChecked}
              onChange={handleToggle}
            />
            <label htmlFor="switch" className={styles.label}>
              <span className={isChecked ? styles.yes : styles.no}>
                {isChecked ? "ON" : "OFF"}
              </span>
              <span className={isChecked ? styles.no : styles.yes}>
                {isChecked ? "OFF" : "ON"}
              </span>
            </label>
          </div>

          <Slides />
        </div>
        <div>
          <ModalBottom open={isModalOpen} onClose={closeModal}>
            <AddSlidesImages
              handleCarouselUpload={handleCarouselUpload}
              handleCarouselDelete={handleCarouselDelete}
              handleCarouselSave={handleCarouselSave}
            />
          </ModalBottom>
        </div>
      </div>
    </>
  );
}

export default Header;
