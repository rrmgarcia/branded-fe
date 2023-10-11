import React, { useState, useEffect, useContext } from "react";
import styles from "../styles/Body.module.css";
import icons from "../styles/Icons.module.css";
import { Link } from "react-router-dom";
import { ProfileContext } from "../models/providers/ProfileProvider";

function Body() {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);
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

  return (
    <div className={styles.container}>
      {/* <Link to={""} className={icons.icon}>
        <div className="material-symbols-outlined">more_horiz</div>
      </Link> */}

      <div className={styles.product_container}>
        {/* <div className={styles.dropdown}>
          <Link to={""} className={styles.dropdown_button}>
            <div className="material-symbols-outlined">more_horiz</div>
          </Link>
          <div className={styles.dropdrown_menu}>
            <Link to={"/builder/profile"} className={icons.icon}>
              Edit Products
            </Link>
          </div>
        </div> */}
        <h4>Products</h4>
        <input type="text" placeholder="Search product name.." />
        {sortedCategories.map((category) => (
          <div key={category} className={styles.category_container}>
            <div className={styles.category_header}>
              <h4>{category}</h4>
            </div>
            <div className={styles.product_list}>
              {builderAndProduct.userProducts.productDetails
                .filter(
                  (product) =>
                    product.category === category ||
                    (!product.category && category === "Uncategorized")
                )
                .map((product, index) => (
                  <div className={styles.product_item} key={index}>
                    <div className={styles.card}>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={styles.card_image}>
                          <div>more_horiz</div>
                          <img
                            className={styles.card_image}
                            src={product.image}
                            alt="Product"
                          />
                        </div>
                      </a>
                      <div className={styles.card_name}>{product.name}</div>
                    </div>
                  </div>
                ))}
            </div>
            <hr className={styles.separator} />
          </div>
        ))}
        {/* <button className={styles.group_button}>Group +</button> */}
        {/* <div className={styles.group}> */}
        {/* <h4>Accessory</h4>
          <button>Add Product Item + </button>
        </div>
        <div className={styles.products}>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Integer vitae justo eget magna. Pharetra vel turpis nunc eget
              lorem dolor sed. Nec feugiat nisl pretium fusce.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>Lorem ipsum dolor sit amet</div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              Nec feugiat nisl pretium fusce. Sollicitudin aliquam ultrices
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              Convallis aenean et tortor at. Tellus in metus vulputate eu
              scelerisque felis imperdiet proin fermentum
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              libero id faucibus nisl tincidunt eget.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_frame}>
              <div className={styles.card_image} />
            </div>
            <div className={styles.card_name}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </div>
          </div>
        </div> */}
        <button>More..</button>
      </div>
    </div>
  );
}

export default Body;
