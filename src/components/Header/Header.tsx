"use client";
import { useEffect, useState } from "react";
import { Menu } from "../Menu/Menu";
import styles from "./header.module.scss";

const Header = () => {
  const [fixed, setFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${fixed ? styles.fixed : ""}`}>
      <div className={styles.header_container}>
        <a className={styles.logo} href="/" title="Logo">
          CR
        </a>
        <Menu />
      </div>
    </header>
  );
};

export { Header };
