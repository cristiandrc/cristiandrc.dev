import React from "react";
import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <Link className={styles.logo} href="/">
          CR
        </Link>
        <nav className={styles.menu}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/project">Projects</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export { Header };
