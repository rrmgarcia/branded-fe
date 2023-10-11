import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stylesDefault from "../themes/Default.module.css";
import stylesThemeOne from "../themes/Theme_One.module.css";
import stylesThemeTwo from "../themes/Theme_Two.module.css";
import SlidesMerchant from "../components/SlidesMerchant";

function Merchant() {
  const { title } = useParams();
  const [merchantDetails, setMerchantDetails] = useState("");
  const [currentTheme, setCurrentTheme] = useState("default");
  const backgroundImageUrl = merchantDetails.bgImage;
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchMerchantDetails = async (merchantTitle) => {
      try {
        const response = await fetch(`http://localhost:3000/merchant/${title}`);
        if (response.status === 404) {
          navigate("/NotFoundPage");
        } else if (response.ok) {
          const data = await response.json();
          setMerchantDetails(data);
          console.log("Merchant details:", data);

          setCurrentTheme(data.themeStyle);
        } else {
          console.error(
            "Error fetching merchant details:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching merchant details:", error);
      }
    };

    fetchMerchantDetails(title);
  }, [title, navigate]);

  const themeStyles = {
    default: stylesDefault,
    layoutOne: stylesThemeOne,
    layoutTwo: stylesThemeTwo,
  };

  const selectedStyles = themeStyles[currentTheme];
console.log("MP", currentTheme)
  const scrollToCategory = (category) => {
    const productSection = document.querySelector(
      `[data-category="${category}"]`
    );

    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userProducts = merchantDetails.product ;

  const uniqueCategories = [
    ...new Set(
      (userProducts || []).map(
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
  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
  };
  
  console.log(merchantDetails);
  console.log(merchantDetails.product)
  return (

  <div style={containerStyle} className={selectedStyles.body} >
      <div className={selectedStyles.home_container}>
        <div className={selectedStyles.home_body}>
          <div className={selectedStyles.header}>
            <div className={selectedStyles.profile_container}>
              <div>
                <img
                  className={selectedStyles.avatar}
                  src={merchantDetails.avatar}
                />
              </div>
              <div className={selectedStyles.avatar_profile}>
                <h4>{merchantDetails.title}</h4>

                <p>{merchantDetails.subtitle}</p>

                <p>{merchantDetails.description}</p>
              </div>

              <div className={selectedStyles.socials}>
                {merchantDetails.links && merchantDetails?.links?.fb !== "" && (
                  <a href={merchantDetails.links.fb} target="_blank">
                    <div id={selectedStyles.fb}></div>
                  </a>
                )}

                {merchantDetails.links &&
                merchantDetails?.links?.ig !== "" && (
                  <a href={merchantDetails.links.ig} target="_blank">
                    <div id={selectedStyles.insta}></div>
                  </a>
                )}

                {merchantDetails.links && merchantDetails?.links?.tiktok !== "" && (
                  <a href={merchantDetails.links.tiktok} target="_blank">
                    <div id={selectedStyles.tiktok}></div>
                  </a>
                )}

                { merchantDetails.links && merchantDetails?.links?.x !== "" && (
                  <a href={merchantDetails.links.x} target="_blank">
                    <div id={selectedStyles.yt}></div>
                  </a>
                )}
              </div>
            </div>
            <div className={selectedStyles.carousel_container}>
              {merchantDetails.carouselToggle === "on" ? (
                <SlidesMerchant merchantDetails={merchantDetails} />
              ) : null}
            </div>
          </div>

          <div>
            <div className={selectedStyles.product_group_container}>
              {merchantDetails.product > 0
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
            </div>
          </div>

          <div className={selectedStyles.product_container}>
            <h4>Products</h4>
            <input type="text" placeholder="Search product name.." />
            {sortedCategories.map((category) => (
              <div key={category} className={selectedStyles.category_container}>
                <div className={selectedStyles.category_header}>
                  <h4>{category}</h4>
                </div>
                <div className={selectedStyles.product_list}>
                  
                  {merchantDetails.product
                    .filter(
                      (product) =>
                        product.category === category ||
                        (!product.category && category === "Uncategorized")
                    )
                    .map((product, index) => (
                      <div className={selectedStyles.product_item} key={index}>
                        <div className={selectedStyles.card}>
                          <a
                            href={product.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className={selectedStyles.card_image}>
                              
                              <img
                                className={selectedStyles.card_image}
                                src={product.image}
                                alt="Product"
                              />
                            </div>
                          </a>
                          <div className={selectedStyles.card_name}>
                            {product.name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <hr className={selectedStyles.separator} />
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
  );
}

export default Merchant;
