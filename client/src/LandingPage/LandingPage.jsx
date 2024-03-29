import { NavLink } from "react-router-dom";
import PrimaryButton from "../buttons/primaryButton/PrimaryButton";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={styles.landingPageContainer}>

      <div className={styles.landingPageText}>
        <p>VIDEOGAMES,</p>
        <p>SOME OF THEM</p>
        <p>ARE UNFORGETTABLE</p>
      </div>

      <div className={styles.landingPageButton}>
        <PrimaryButton>
          <NavLink to="/home">Go to Home</NavLink>
        </PrimaryButton>
      </div>


    </div>
  );
};

export default LandingPage;
