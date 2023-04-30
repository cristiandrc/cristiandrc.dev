import Link from "next/link";
import { Menu } from "../Menu/Menu";
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
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
