import React from "react";
import { DiGithubBadge } from "react-icons/di";
import { AiFillLinkedin } from "react-icons/ai";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h2>CONTACT</h2>
      <div className={styles.contact_icons}>
        <Link
          className={styles.contact_icons_link}
          href="https://www.linkedin.com/in/cristianrojasc/"
          target="_blank"
          rel="noopener"
          title="Link Linkedin"
        >
          <AiFillLinkedin size="80px" />
        </Link>
        <Link
          href="https://github.com/cristiandrc"
          target="_blank"
          rel="noopener"
          className={styles.contact_icons_link}
          title="Link Github"
        >
          <DiGithubBadge size="89" />
        </Link>
      </div>
      <a
        target="_blank"
        href="https://drive.google.com/file/d/1MYzx0ccSHaqnrmaTEPdpuoFPzvlxspIb/view?usp=drive_link"
        rel="noopener"
        title="Link curriculum vitae"
        className={styles.contact_cv}
      >
        Download CV
      </a>
    </div>
  );
};

export { Contact };
