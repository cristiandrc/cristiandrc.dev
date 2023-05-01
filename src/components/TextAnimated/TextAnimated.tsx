import { LetterAnimated } from "./LatterAnimated";
import styles from "./textAnimated.module.scss";

const TextAnimated = ({ text }: { text: string }) => {
  const textArray = text.replace(" ", "-").split("");
  return (
    <div className={styles.text_container}>
      {textArray.map((letter, i) => (
        <LetterAnimated key={i} letter={letter} />
      ))}
    </div>
  );
};

export { TextAnimated };
