import React from "react";
import { HtmlIcon } from "../svg/HtmlIcon";
import { CssIcon } from "../svg/CssIcon";
import { JavaScriptIcon } from "../svg/JavaScriptIcon";
import { GitIcon } from "../svg/GitIcon";
import { ReactIcon } from "../svg/ReactIcon";
import { NodeIcon } from "../svg/NodeIcon";
import styles from "./skills.module.scss";

const Skills = () => {
  return (
    <div className={styles.skills}>
      <h2>SKILLS</h2>
      <ul className={styles.skills_list}>
        <li className={styles.skills_items}>
          <HtmlIcon />
        </li>
        <li className={styles.skills_items}>
          <CssIcon />
        </li>
        <li className={styles.skills_items}>
          <JavaScriptIcon />
        </li>
        <li className={styles.skills_items}>
          <GitIcon />
        </li>
        <li className={styles.skills_items}>
          <ReactIcon />
        </li>
        <li className={styles.skills_items}>
          <NodeIcon />
        </li>
      </ul>
    </div>
  );
};

export { Skills };
