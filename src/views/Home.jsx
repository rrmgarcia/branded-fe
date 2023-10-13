import React, { useState, useEffect, useContext } from "react";
import "../index.css";
import stylesDefault from "../themes/Default.module.css";
import stylesThemeOne from "../themes/Theme_One.module.css";
import stylesThemeTwo from "../themes/Theme_Two.module.css";

import styles from "../themes/Default.module.css";

import NavBarTop from "../components/NavBarTop";
import NavBarBottom from "../components/NavBarBottom";
import Slides from "../components/Slides";

import productModel from "../models/ProductModel";
import UploadProductImage from "../components/UploadProductImage";
import { ProfileContext } from "../models/providers/ProfileProvider";
import MerchantController from "../controllers/MerchantController";
import { useBuilder } from "../models/providers/BuilderProvider";

function Home(props) {
  const { openModal } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
  const [currentTheme, setCurrentTheme] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const builderData = useBuilder();

  const mockData = { ...builderData };
  const mockBgImge = mockData.builderData.storedBgImage;
  console.log(mockData.builderData.storedBgImage);
  useEffect(() => {
    // Check if userProfile and themeStyle are available
    if (
      builderAndProduct.userProfile &&
      builderAndProduct.userProfile.themeStyle
    ) {
      // Set the currentTheme based on the fetched data
      setCurrentTheme(builderAndProduct.userProfile.themeStyle);
    }
  }, [builderAndProduct.userProfile]);

  const themeStyles = {
    default: stylesDefault,
    layoutOne: stylesThemeOne,
    layoutTwo: stylesThemeTwo,
  };

  const selectedStyles = themeStyles[currentTheme];

  const backgroundImageUrl =
    builderAndProduct.userProfile && builderAndProduct.userProfile.bgImage;

  const scrollToCategory = (category) => {
    const productSection = document.querySelector(
      `[data-category="${category}"]`
    );

    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userProducts = builderAndProduct.userProducts || {};

  const uniqueCategories = [
    ...new Set(
      (userProducts.productDetails || []).map(
        (product) => product.category || "Uncategorized"
      )
    ),
  ];

  const sortedCategories = uniqueCategories
    .filter((category) => category !== "Uncategorized")
    .sort();

  // Add "Uncategorized" to the beginning if it exists
  if (uniqueCategories.includes("Uncategorized")) {
    sortedCategories.unshift("Uncategorized");
  }
  const handleDeleteProduct = (productId) => {
    // Set the selected product when the delete button is clicked
    setSelectedProduct(productId);

    // Call deleteProduct with the productId
    productModel.deleteProduct(productId);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      console.log("Deleting product with productId:", selectedProduct);

      setSelectedProduct(null);
    }
  };
  const containerStyle = {
    backgroundImage: mockBgImge
      ? `url(${mockBgImge})`
      : `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  // mockData.builderData.storedBgImage;
  return (
    <div style={containerStyle} className={selectedStyles.body}>
      <div className={selectedStyles.home_container}>
        <NavBarTop />
        <div className={selectedStyles.home_body}>
          <div className={styles.merchant_button}>
            <MerchantController />
          </div>

          <div className={selectedStyles.header}>
            <div className={selectedStyles.profile_container}>
              <div>
                {!builderAndProduct.userProfile ||
                !builderAndProduct.userProfile.avatar ? (
                  <img
                    className={selectedStyles.avatar}
                    src="https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  />
                ) : (
                  <img
                    className={selectedStyles.avatar}
                    src={builderAndProduct.userProfile.avatar}
                  />
                )}
              </div>
              <div className={selectedStyles.avatar_profile}>
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

              <div className={selectedStyles.socials}>
                {builderAndProduct.userProfile &&
                  builderAndProduct.userProfile?.links?.fb !== "" && (
                    <a
                      href={builderAndProduct.userProfile.links.fb}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div id={selectedStyles.fb}></div>
                    </a>
                  )}

                {builderAndProduct.userProfile &&
                  builderAndProduct.userProfile?.links.ig !== "" && (
                    <a
                      href={builderAndProduct.userProfile.links.ig}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div id={selectedStyles.insta}></div>
                    </a>
                  )}

                {builderAndProduct.userProfile &&
                  builderAndProduct.userProfile?.links?.tiktok !== "" && (
                    <a
                      href={builderAndProduct.userProfile.links.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div id={selectedStyles.tiktok}></div>
                    </a>
                  )}

                {builderAndProduct.userProfile &&
                  builderAndProduct.userProfile?.links?.x !== "" && (
                    <a
                      href={builderAndProduct.userProfile.links.x}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div id={selectedStyles.yt}></div>
                    </a>
                  )}
              </div>
            </div>
            <div className={selectedStyles.carousel_container}>
              {builderAndProduct.userProfile?.carouselToggle === "on" ? (
                <Slides />
              ) : null}
            </div>
          </div>

          {/* <MerchantController /> */}

          <div className={selectedStyles.product_group_container}>
            {builderAndProduct.userProducts &&
            builderAndProduct.userProducts.productDetails.length > 0
              ? sortedCategories.map((category) => (
                  <div
                    className={selectedStyles.product_group}
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    data-category={category}
                  >
                    {category}
                  </div>
                ))
              : ["Health & Beauty", "Accessories", "Food", "Clothing"].map(
                  (category) => (
                    <div
                      className={selectedStyles.product_group}
                      key={category}
                      onClick={() => scrollToCategory(category)}
                      data-category={category}
                    >
                      {category}
                    </div>
                  )
                )}

            <>
              <p className={styles.product_group}>Health & Beauty</p>
              <p className={styles.product_group}>Accessories</p>
              <p className={styles.product_group}>Food</p>
              <p className={styles.product_group}>Clothing</p>
              <p className={styles.product_group}>Clothing</p>
            </>
          </div>
        </div>

        <div className={selectedStyles.group}>
          <button
            type="button"
            onClick={openModal}
            className={selectedStyles.button}
          >
            Add Your Product here +
          </button>
        </div>

        <div className={selectedStyles.product_container}>
          <h4>Products</h4>
          <input type="text" placeholder="Search product name.." />
          {sortedCategories.map((category) => (
            <div key={category} className={selectedStyles.category_container}>
              <div className={selectedStyles.group}>
                <h4>{category}</h4>
              </div>

              <div className={selectedStyles.products}>
                {builderAndProduct.userProducts.productDetails
                  .filter(
                    (product) =>
                      product.category === category ||
                      (!product.category && category === "Uncategorized")
                  )
                  .map((product, index) => (
                    <div className={selectedStyles.card} key={index}>
                      <div
                        className={styles.close}
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the link from being triggered
                          handleDeleteProduct(product.productId);
                        }}
                      ></div>

                      <div className={selectedStyles.card_frame}>
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={product.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={selectedStyles.card_image}
                          ></img>
                        </a>
                      </div>
                      <div className={selectedStyles.card_name}>
                        {product.name}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <NavBarBottom />
    </div>
  );
}
export default Home;
