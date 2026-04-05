"use client";
import { useState, useEffect } from "react";
import styles from "./menu.module.scss";

const ROUTES = [
  { href: "#about",      word: "About" },
  { href: "#skills",     word: "Skills" },
  { href: "#experience", word: "Experience" },
  { href: "#projects",   word: "Projects" },
  { href: "#contact",    word: "Contact" },
];

const Menu = () => {
  const [active, setActive] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ROUTES.map((r) => r.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleMenu = (status = false) => {
    setActive(status);
    document.body.classList.toggle("body", status);
  };

  return (
    <nav className={styles.menu}>
      <ul
        className={active ? styles.active : ""}
        onClick={() => handleMenu(false)}
      >
        {ROUTES.map(({ href, word }) => (
          <li key={href}>
            <a
              className={activeSection === href.slice(1) ? styles.active : ""}
              href={href}
              title={word}
            >
              {word}
            </a>
          </li>
        ))}
      </ul>
      <button
        className={`${styles.burger} ${active ? styles.active : ""}`}
        onClick={() => handleMenu(!active)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
};

export { Menu };
