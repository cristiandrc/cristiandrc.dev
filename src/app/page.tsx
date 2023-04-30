import styles from "./page.module.scss";
import { Hero } from "@/components/Hero/Hero";
import { Contact } from "@/components/Contact/Contact";
import { Skills } from "@/components/Skills/Skills";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.content_info}>
        <Contact />
        <Skills />
      </div>
    </main>
  );
}
