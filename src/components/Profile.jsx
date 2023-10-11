import { useContext } from "react";
import styles from "../styles/Profile.module.css";
// import styles from "../themes/Default.module.css";
// import styles from "../themes/Theme_One.module.css";
import icons from "../styles/Icons.module.css";
import NavBarSaveTop from "../components/NavBarSaveTop";
import NavBarSaveBottom from "../components/NavBarSaveBottom";
import ModalBottom from "../components/ModalBottom";
import UploadAvatar from "../components/UploadAvatar";
import AddSocial from "../components/AddSocial";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../models/providers/ProfileProvider";
import layout1 from "../assets/themes/Layout1.jpg";
import layout2 from "../assets/themes/Layout2.jpg";
import layout3 from "../assets/themes/Layout3.jpg";

function Profile(props) {
  const {
    handleSave,
    handleChange,
    handleImgUpload,
    handleImgSave,
    handleDeleteImg,
    imgUrl,
    title,
    subtitle,
    description,
    handleLinkChange,
    handleLinkSave,
    links,
    handleThemeClick,
    avatar,
  } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [selectedSocialId, setSelectedSocialId] = useState("");
  const value = "Profile";
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
  const [selectedLayout, setSelectedLayout] = useState("default");

  const openModal = (event, socialsId) => {
    event.preventDefault();
    // console.log(event.target);
    setSelectedSocialId(socialsId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Trigger = (x) => {
    setTrigger(x);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleLayoutClick = (layout) => {
    setSelectedLayout(layout);
    handleThemeClick(layout); // Call your theme click handler
  };
  return (
    <>
      <div className={styles.container}>
        <NavBarSaveTop value={value} />
        <div className={styles.body}>
          <div className={styles.layout}>
            <p className={styles.labels}>Layout</p>
            <div className={styles.layout_selector}>
              <div className={styles.wrapper}>
                <div
                  onClick={() => handleLayoutClick("default")}
                  className={`${
                    selectedLayout === "default"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  } themeSelector`}
                >
                  <img
                    src={layout1}
                    alt="Default Layout"
                    className={styles.selector_items} // Add this class for resizing
                  />
                  {/* Default Layout */}
                </div>

                <div
                  onClick={() => handleLayoutClick("layoutOne")}
                  className={`${
                    selectedLayout === "layoutOne"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  } themeSelector`}
                >
                  <img
                    src={layout2}
                    alt="Layout One"
                    className={styles.selector_items} // Add this class for resizing
                  />
                  {/* Layout One */}
                </div>

                <div
                  onClick={() => handleLayoutClick("layoutTwo")}
                  className={`${
                    selectedLayout === "layoutTwo"
                      ? "btn btn-primary"
                      : "btn btn-outline-primary"
                  } themeSelector`}
                >
                  <img
                    src={layout3}
                    alt="Layout Two"
                    className={styles.selector_items} // Add this class for resizing
                  />
                  {/* Layout Two */}
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className={styles.avatar}>
            <p className={styles.labels}>Avatar</p>
            <div id={styles.avatar_container}>
              <img
                src={imgUrl || ""}
                // src={builderAndProduct.userProfile?.avatar || ""}
                alt="avatar.png"
              />

              <div id={styles.group}>
                <p className={styles.labels}>
                  Max file size: 30MB. Support file format: jpg, jpeg, gif, png,
                  bmp
                </p>
                <div className={styles.buttons}>
                  <button type="button">
                    <div
                      className="material-symbols-outlined"
                      onClick={handleDeleteImg}
                    >
                      delete
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      openModal(e);
                      Trigger(1);
                    }}
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
            <div />
          </div>
          <div className={styles.name}>
            <p className={styles.labels}>Display Name</p>
            <input
              className={styles.socialsInput}
              id="title"
              value={
                // builderAndProduct.userProfile &&
                // builderAndProduct.userProfile.title !== ""
                //   ? builderAndProduct.userProfile.title
                //   :
                title
              }
              type="text"
              onChange={handleChange}
              placeholder="e.g. Juan Dela Cruz"
            ></input>
          </div>

          <div className={styles.subtitle}>
            <p className={styles.labels}>Sub title</p>
            <input
              type="text"
              className={styles.socialsInput}
              id="subtitle"
              value={
                // builderAndProduct.userProfile &&
                // builderAndProduct.userProfile.subtitle !== ""
                //   ? builderAndProduct.userProfile.subtitle
                //   :
                subtitle
              }
              placeholder="Content Creator/Influencer"
              onChange={handleChange}
            ></input>
          </div>
          <div />
          <div className={styles.subtitle}>
            <p className={styles.labels}>Description</p>
            <input
              className={styles.socialsInput}
              type="text"
              id="description"
              value={
                // builderAndProduct.userProfile &&
                // builderAndProduct.userProfile.description !== ""
                //   ? builderAndProduct.userProfile.description
                //   :
                description
              }
              placeholder="Describe your business..."
              onChange={handleChange}
            ></input>
          </div>

          <p className={styles.socials_label}>Social Network Links</p>
          <div className={styles.socials}>
            <div className={styles.social_block}>
              <div className={styles.facebook}></div>
              <div className={styles.text}>
                <p>Facebook</p>
                {!links.fb ? <p>Link displayed here</p> : null}
                <p>{links.fb}</p>
              </div>
              <Link
                className={icons.icon}
                onClick={(e) => {
                  openModal(e, "fb");
                  Trigger(2);
                }}
              >
                <div className="material-symbols-outlined" id={styles.edit}>
                  more_horiz
                </div>
              </Link>
            </div>
            <div className={styles.social_block}>
              <div className={styles.instagram}></div>
              <div className={styles.text}>
                <p>Instagram</p>
                {!links.ig ? <p>Link displayed here</p> : null}
                <p>{links.ig}</p>
              </div>
              <Link
                className={icons.icon}
                onClick={(e) => {
                  openModal(e, "ig");
                  Trigger(2);
                }}
              >
                <div className="material-symbols-outlined" id={styles.edit}>
                  more_horiz
                </div>
              </Link>
            </div>
            <div className={styles.social_block}>
              <div className={styles.tiktok}></div>
              <div className={styles.text}>
                <p>Tiktok</p>
                {!links.tiktok ? <p>Link displayed here</p> : null}
                <p>{links.tiktok}</p>
              </div>
              <Link
                className={icons.icon}
                onClick={(e) => {
                  openModal(e, "tiktok");
                  Trigger(2);
                }}
              >
                <div className="material-symbols-outlined" id={styles.edit}>
                  more_horiz
                </div>
              </Link>
            </div>
            <div className={styles.social_block}>
              <div className={styles.x}></div>
              <div className={styles.text}>
                <p>X</p>
                {!links.x ? <p>Link displayed here</p> : null}
                <p>{links.x}</p>
              </div>
              <Link
                className={icons.icon}
                onClick={(e) => {
                  openModal(e, "x");
                  Trigger(2);
                }}
              >
                <div className="material-symbols-outlined" id={styles.edit}>
                  more_horiz
                </div>
              </Link>
            </div>
          </div>
          {trigger === 1 ? (
            <div>
              <ModalBottom open={isModalOpen} onClose={closeModal}>
                <UploadAvatar
                  handleImgSave={handleImgSave}
                  handleImgUpload={handleImgUpload}
                />
              </ModalBottom>
            </div>
          ) : trigger === 2 ? (
            <div>
              <ModalBottom open={isModalOpen} onClose={closeModal}>
                <AddSocial
                  handleLinkChange={handleLinkChange}
                  handleLinkSave={handleLinkSave}
                  id={selectedSocialId}
                  handleCloseModal={handleCloseModal}
                />
              </ModalBottom>
            </div>
          ) : null}
        </div>
        <NavBarSaveBottom value={value} handleSave={handleSave} />
      </div>
    </>
  );
}

export default Profile;
