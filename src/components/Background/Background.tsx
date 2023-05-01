import styles from "./background.module.scss";

const GenerateRandomStyles = () => {
  const styles = {
    left: `${Math.floor(Math.random() * (100 - 0 + 1) + 0)}vw`,
    height: `${Math.floor(Math.random() * 100)}px`,
    width: `${Math.floor(Math.random() * 100)}px`,
    borderRadius: `${Math.floor(Math.random() * 20) + 5}px`,
    animationDelay: `${Math.floor(Math.random() * 10)}s`,
    animationDuration: `${Math.floor(Math.random() * 20) + 5}s`,
  };

  const widthHeight = `${Math.floor(Math.random() * 20)}s`;
  styles.height = widthHeight;
  styles.width = widthHeight;
  return styles;
};

const Background = () => {
  return (
    <div className={styles.background}>
      {new Array(10).fill("").map((_, i) => (
        <span key={i} style={GenerateRandomStyles()}></span>
      ))}
    </div>
  );
};

export { Background };
