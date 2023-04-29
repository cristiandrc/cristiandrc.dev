import React from "react";
// import { FooterStyle } from "../style/Footer";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <p>
        Developed By <br /> Cristian Rojas
      </p>
      <p>With React.js</p>
    </div>
  );
};

export { Footer };
