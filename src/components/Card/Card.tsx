import React from "react";
import Image, { StaticImageData } from "next/image";
import { DiGithubBadge } from "react-icons/di";
import { MdLanguage } from "react-icons/md";
import styles from "./card.module.scss";

interface CardTypes {
  id: number;
  name: string;
  img: StaticImageData;
  page?: string;
  github: string;
}

const Card = ({ name, img, page, github }: CardTypes) => {
  return (
    <div className={styles.card}>
      <Image src={img} alt={name} />
      <h2 className={styles.card_title}>{name}</h2>
      <div className={styles.link_content}>
        {page && (
          <a className={styles.link} target="_blank" href={page}>
            <MdLanguage />
            projects
          </a>
        )}
        <a className={styles.link} target="_blank" href={github}>
          <DiGithubBadge /> Code
        </a>
      </div>
    </div>
  );
};

export { Card };
