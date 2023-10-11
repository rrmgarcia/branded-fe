import styles from "../styles/Landingpage.module.css";
import { Link } from "react-router-dom";

Array.from(document.getElementsByClassName("path")).forEach((pathElement) => {
  pathElement.setAttribute(
    "style",
    "stroke-dasharray:" +
      pathElement.getTotalLength() +
      ";stroke-dashoffset:" +
      pathElement.getTotalLength()
  );
});

function LandingPage() {
  return (
    <div>
      <header>
        <div className={styles.header_logo}>BRANDED</div>

        <nav>
          <ul className={styles.header_ul}>
            <li>
              {/* <a href="">Brands</a> */}
              <Link to={"/Brands"}>Brands</Link>
            </li>
            <li>
              {/* <a href="">Explore</a> */}
              <Link to={"/Explore"}>Explore</Link>
            </li>
            <li>
              {/* <a href="">Academy</a> */}
              <Link to={"/Academy"}>Academy</Link>
            </li>

            <li>
              {/* <a href="/About">About Us</a> */}
              <Link to={"/AboutUs"}>About Us</Link>
            </li>
          </ul>
        </nav>
        <Link to={"/login"}>
          <button className={styles.merchant_button}>Log In</button>
        </Link>
        {/* <Link to={"/register"}>
          <button className={styles.merchant_button}>Register</button>
        </Link> */}
      </header>
      <div className={styles.segment_one}>
        <div className={styles.landing_page_text}>
          <h1>Dream.</h1>
          <h1>Build.</h1>
          <h1>Deploy.</h1>
          <h1>Monetize.</h1>
          <p>Our platform helps you turn your ideas into reality.</p>
        </div>
        <div className={styles.image_one}></div>
      </div>
      <div className={styles.segment_two}>
        <div className={styles.image_two}></div>
        <div className={styles.landing_page2_text}>
          <h1>One platform</h1>
          <h1>to manage </h1>
          <h1>them all.</h1>
          <p>
            Seamless integration with leading social media networks.
            <br />
            Individual account logins no longer needed.
          </p>
        </div>
      </div>
      <div className={styles.platform}>
        <p>The leading platform for Creators make money and build a business</p>
        <div className={styles.platform_center}>
          <div className={styles.platform_left}>
            <ul>
              <li>① Create Mini Website</li>
              <li>② Business Optimization</li>
              <li>③ Monetization</li>
              <li>④ Brand Booking</li>
            </ul>
          </div>
          <div className={styles.platform_right}>
            <label>
              Create a personal website within 3 minutes
              <ul>
                <li>➊ All free</li>
                <li>➋ 100+ readily-made templates</li>
                <li>➌ Customize easily on mobile phone</li>
                <li>➍ Diverse monetization features</li>
                <li>
                  ➎ Sell any types of product. Choose your own domain:
                  yourname.com
                </li>
              </ul>
            </label>
            <button className={styles.merchant_button}>Sign up now!</button>
          </div>
        </div>
      </div>

      <div className={styles.socials_container}>
        <p>10,000+ brands partnering with Branded</p>
        <div className={styles.socials}></div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footer_links}>
          <div className={styles.footer_logo}>BRANDED</div>
          <ul className={styles.footer_ul}>
            <li className={styles.footer_titles}>Find out more</li>
            <li>
              <a href="">How does it work?</a>
            </li>
            <li>
              <a href="">How does monetization work?</a>
            </li>
            <li>
              <a href="">Branded Services</a>
            </li>
            <li>
              <a href="">Pricing</a>
            </li>
          </ul>
          <ul className={styles.footer_ul}>
            <li className={styles.footer_titles}>Affiliate</li>
            <li>
              <a href="">How does affiliate marketing work?</a>{" "}
            </li>
            <li>
              <a href="">How do you earn money from affiliated links?</a>{" "}
            </li>
            <li>
              <a href="">FAQs</a>{" "}
            </li>
          </ul>
          <div className={styles.footer_container}>
            <p className={styles.footer_titles}>Support</p>
            <div className={styles.icons}>
              <div className={styles.fb}></div>
              <div className={styles.yt}></div>
              <div className={styles.in}></div>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© 2023 Branded. All Rights Reserved.</p>
          <p>Contact Webmaster</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
