import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { AiFillLinkedin } from "react-icons/ai";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h3>CONTACT</h3>
      <div className={styles.contact_icons}>
        <Link
          className={styles.contact_icons_link}
          href="https://www.linkedin.com/in/cristianrojasc/"
          target="_blank"
          rel="noopener"
        >
          <AiFillLinkedin size="80px" />
        </Link>
        <Link
          href="https://github.com/cristiandrc"
          target="_blank"
          rel="noopener"
          className={styles.contact_icons_link}
        >
          <DiGithubBadge size="89" />
        </Link>
      </div>
      <a
        target="_blank"
        href="https://drive.google.com/file/d/1b92n3pmjnrfyNjaM9XLXBZr-iyr8glyT/view?usp=sharing"
        rel="noopener"
        className={styles.contact_cv}
      >
        Download CV
      </a>
    </div>
  );
};

export { Contact };
