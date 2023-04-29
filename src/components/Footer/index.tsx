import React from "react";
import styles from "./footer.module.scss";

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
