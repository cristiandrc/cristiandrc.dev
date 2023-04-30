"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "../Menu/Menu";
import styles from "./header.module.scss";

const Header = () => {
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => setFixed(window.scrollY > 0));
  }, []);
  return (
    <header className={`${styles.header} ${fixed ? styles.fixed : ""}`}>
      <div className={styles.header_container}>
        <Link className={styles.logo} href="/">
          CR
        </Link>
        <Menu />
      </div>
    </header>
  );
};

export { Header };
