import { ReactIcon } from "../svg/ReactIcon";
import { CssIcon } from "../svg/CssIcon";
import { GitIcon } from "../svg/GitIcon";
import { HtmlIcon } from "../svg/HtmlIcon";
import { JavaScriptIcon } from "../svg/JavaScriptIcon";
import { TypeScriptIcon } from "../svg/TypeScriptIcon";
import { NodeIcon } from "../svg/NodeIcon";
import styles from "./background.module.scss";

const GenerateRandomStyles = () => {
  const styles = {
    left: `${Math.floor(Math.random() * (100 - 0 + 1) + 0)}vw`,
    height: `0px`,
    width: `0px`,
    borderRadius: `${Math.floor(Math.random() * 20) + 5}px`,
    animationDelay: `${Math.floor(Math.random() * 10)}s`,
    animationDuration: `${Math.floor(Math.random() * 20) + 5}s`,
  };

  const widthHeight = `${Math.floor(Math.random() * 100)}px`;
  styles.height = widthHeight;
  styles.width = widthHeight;
  return styles;
};

const Icons = [
  ReactIcon,
  CssIcon,
  NodeIcon,
  GitIcon,
  HtmlIcon,
  JavaScriptIcon,
  TypeScriptIcon,
  TypeScriptIcon,
  NodeIcon,
  ReactIcon,
];

const Background = () => {
  return (
    <div className={styles.background}>
      {new Array(10).fill("").map((_, i) => {
        const Icon = Icons[i];
        return (
          <span key={i} style={GenerateRandomStyles()}>
            <Icon />
          </span>
        );
      })}
    </div>
  );
};

export { Background };
