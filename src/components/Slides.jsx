import { useContext } from "react";
import Carousel from "react-bootstrap/Carousel";
import styles from "../styles/Header.module.css";
import { ProfileContext } from "../models/providers/ProfileProvider";
import image1 from "../assets/carousel/1.png";
import image2 from "../assets/carousel/2.png";
import image3 from "../assets/carousel/3.png";

function Slides() {
  const [builderAndProduct, setBuilderAndProduct] = useContext(ProfileContext);

  // Check if carouselImgs is an empty array
  const isCarouselEmpty =
    !builderAndProduct.userProfile?.carouselImgs ||
    builderAndProduct.userProfile.carouselImgs.length === 0;

  return (
    <Carousel>
      {/* Conditionally render static carousel items only if carouselImgs is empty */}
      {isCarouselEmpty && (
        <Carousel>
          <Carousel.Item className={styles.img}>
            <img src={image1} alt="Image 1" />
          </Carousel.Item>
          <Carousel.Item className={styles.img}>
            <img src={image2} alt="Image 2" />
          </Carousel.Item>
          <Carousel.Item className={styles.img}>
            <img src={image3} alt="Image 3" />
          </Carousel.Item>
        </Carousel>
      )}

      {/* Conditionally render additional items if carouselImgs is not empty */}
      {!isCarouselEmpty &&
        builderAndProduct.userProfile.carouselImgs.map((image, index) => (
          <Carousel.Item className={styles.img} key={index}>
            <img src={image} alt={`Image ${index + 4}`} />
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default Slides;
