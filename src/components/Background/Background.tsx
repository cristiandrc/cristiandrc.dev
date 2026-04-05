import { ReactIcon }      from "../svg/ReactIcon";
import { CssIcon }        from "../svg/CssIcon";
import { GitIcon }        from "../svg/GitIcon";
import { HtmlIcon }       from "../svg/HtmlIcon";
import { JavaScriptIcon } from "../svg/JavaScriptIcon";
import { TypeScriptIcon } from "../svg/TypeScriptIcon";
import { NodeIcon }       from "../svg/NodeIcon";
import styles from "./background.module.scss";

const randomStyle = () => {
  const size = `${Math.floor(Math.random() * 60) + 20}px`;
  return {
    left: `${Math.floor(Math.random() * 100)}vw`,
    width: size,
    height: size,
    borderRadius: `${Math.floor(Math.random() * 16) + 4}px`,
    animationDelay: `${Math.floor(Math.random() * 12)}s`,
    animationDuration: `${Math.floor(Math.random() * 16) + 8}s`,
  };
};

const Icons = [
  ReactIcon, CssIcon, NodeIcon, GitIcon, HtmlIcon,
  JavaScriptIcon, TypeScriptIcon, TypeScriptIcon, NodeIcon, ReactIcon,
];

const Background = () => (
  <div className={styles.background}>
    {new Array(10).fill("").map((_, i) => {
      const Icon = Icons[i];
      return (
        <span key={i} style={randomStyle()}>
          <Icon />
        </span>
      );
    })}
  </div>
);

export { Background };
