"use client";
import { useState } from "react";
import styles from "./textAnimated.module.scss";

const LetterAnimated = ({ letter }: { letter: string }) => {
  const [hover, setHover] = useState(false);

  const exeHover = () => {
    setHover(true);
    setTimeout(() => {
      setHover(false);
    }, 1000);
  };
  return (
    <span
      onMouseEnter={exeHover}
      className={`${styles.text_animated} ${
        letter == "-" ? styles.text_space : ""
      } ${hover ? styles.animate : ""}`}
    >
      {letter}
    </span>
  );
};

export { LetterAnimated };
