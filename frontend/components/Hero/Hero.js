import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={`${styles.hero} ${styles.heroContainer}`}>
      <h2 className={styles.hero__Title}>no stack to fullstack</h2>
    </section>
  );
};

export default Hero;
