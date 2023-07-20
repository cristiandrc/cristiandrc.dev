import React from "react";
import Image from "next/image";
import img from "../../assets/img/CV.png";
import styles from "./hero.module.scss";
import { TextAnimated } from "../TextAnimated/TextAnimated";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.title_container}>
        <TextAnimated text="FRONTEND DEVELOPER" />
        <h1 className={styles.name}>CRISTIAN ROJAS</h1>
        <p>
          Hello! I&apos;m Cristian Rojas, a frontend developer specializing in
          React, TypeScript, and modern tools. Welcome to my portfolio!
        </p>
      </div>
      <Image
        className={styles.image}
        src={img}
        alt="Cristian Rojas's Photo"
        title="Photo"
      />
    </div>
  );
};

export { Hero };
