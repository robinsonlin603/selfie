// styles & imgages
import styles from "./Circle.module.css";

export default function Circle({ numbers ,selectPicture}) {

  return (
    <>
      {numbers.map((number) => (
        <div className={ numbers[selectPicture] === number ? styles.chosecircle:styles.circle } key={ number }></div>
      ))}
    </>  
  )
}
