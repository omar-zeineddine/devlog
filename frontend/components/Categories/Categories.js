import Link from "next/link";

import styles from "./Categories.module.scss";

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.categoriesContainer}>
        <Link href="/categories/sass">
          <a className={styles.categoriesCard}>
            <figure>
              <img
                className={styles.categoriesCard__img}
                src="assets/images/categories/sass.jpg"
                alt="category logo"
              />
            </figure>
            <div className={styles.categoriesCard__content}>
              <h2 className={styles.categoriesCard__title}>sass</h2>
              <p className={styles.categoriesCard__text}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dignissimos obcaecati neque at molestias quisquam? Iusto ipsa
                eaque accusantium id earum!
              </p>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
