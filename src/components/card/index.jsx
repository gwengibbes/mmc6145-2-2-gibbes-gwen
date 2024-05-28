import styles from "./style.module.css";

export default function Card(props) {
  const style = {
    transform: `rotateY(${props.facedown ? "180deg" : "0deg"})`,
  };
  return (
    <div onClick={props.handleClick} style={style} className={styles.card}>
      <div>{props.children}</div>
      <div className={styles.cardBack}>
        UF🐊
      </div>
    </div>
  );
}