import React from "react";
import Image from "next/image";
import img from "../../assets/img/CV.png";
import styles from "./hero.module.scss";
import { TextAnimated } from "../TextAnimated/TextAnimated";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.title_container}>
        {/* <p className={styles.title}>FRONTEND DEVELOPER</p> */}
        <TextAnimated text="FRONTEND DEVELOPER" />
        <h1 className={styles.name}>CRISTIAN ROJAS</h1>
      </div>
      <Image className={styles.image} src={img} alt="Cristian Rojas's Photo" />
    </div>
  );
};

export { Hero };
