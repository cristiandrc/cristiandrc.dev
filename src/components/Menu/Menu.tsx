"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./menu.module.scss";

const ROUTES = [
  {
    href: "/",
    word: "Home",
  },
  {
    href: "/project",
    word: "Projects",
  },
];

const Menu = () => {
  const [active, setActive] = useState(false);
  const path = usePathname();

  const handleMenu = (status = false) => {
    setActive(status);
    if (document.documentElement.scrollWidth <= 725) {
      document.body.classList.toggle("body");
    }
  };

  return (
    <nav className={styles.menu}>
      <ul
        className={` ${active ? styles.active : ""}`}
        onClick={() => handleMenu(false)}
      >
        {ROUTES.map(({ href, word }, i) => (
          <li key={i}>
            <Link
              className={`${path === href && styles.active}`}
              href={href}
              title={word}
            >
              {word}
            </Link>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.burger} ${active ? styles.active : ""}`}
        onClick={() => handleMenu(!active)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export { Menu };
