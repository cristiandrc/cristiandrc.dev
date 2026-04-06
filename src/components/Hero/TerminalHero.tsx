"use client";
import { useEffect, useState } from "react";
import styles from "./hero.module.scss";

const LINES = [
  { prompt: "$ whoami",        output: "cristian rojas" },
  { prompt: "$ cat role.txt",  output: "software developer | shopify & vtex" },
  { prompt: "$ cat stack.txt", output: "shopify · vtex io · react · node.js" },
];

const useTyped = (text: string, speed = 45, start = true) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!start) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start]);
  return displayed;
};

const Line = ({
  prompt,
  output,
  active,
  done,
  onDone,
}: {
  prompt: string;
  output: string;
  active: boolean;
  done: boolean;
  onDone: () => void;
}) => {
  const typedPrompt = useTyped(prompt, 40, active);
  const promptDone = typedPrompt.length === prompt.length;
  const typedOutput = useTyped(output, 35, active && promptDone);
  const outputDone = typedOutput.length === output.length;

  useEffect(() => {
    if (active && outputDone) {
      const t = setTimeout(onDone, 300);
      return () => clearTimeout(t);
    }
  }, [active, outputDone, onDone]);

  if (!active && !done) return null;

  return (
    <div className={styles.terminal_line}>
      <span className={styles.prompt}>{typedPrompt}</span>
      {promptDone && (
        <span className={styles.output}>
          {typedOutput}
          {active && outputDone && <span className={styles.cursor} />}
        </span>
      )}
      {!promptDone && active && <span className={styles.cursor} />}
    </div>
  );
};

const TerminalHero = () => {
  const [step, setStep] = useState(0);

  return (
    <div className={styles.terminal}>
      <div className={styles.terminal_bar}>
        <span className={styles.dot} data-color="red" />
        <span className={styles.dot} data-color="yellow" />
        <span className={styles.dot} data-color="green" />
        <span className={styles.terminal_title}>~/cristian/portfolio</span>
      </div>
      <div className={styles.terminal_body}>
        {LINES.map((line, i) => (
          <Line
            key={i}
            prompt={line.prompt}
            output={line.output}
            active={step === i}
            done={step > i}
            onDone={() => setStep(i + 1)}
          />
        ))}
        {step >= LINES.length && (
          <div className={styles.terminal_cta}>
            <a href="#projects" className={styles.cta_link}>
              view my work<span className={styles.cursor} />
            </a>
            <a
              href="/Cristian-Rojas-CV.pdf"
              target="_blank"
              rel="noopener"
              className={styles.cta_link_secondary}
            >
              download cv
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export { TerminalHero };
