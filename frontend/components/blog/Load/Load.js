import styles from "./Load.module.scss";

const Load = ({ size, limit, loadMoreBlogs }) => {
  return (
    <div className={styles.LoadMore}>
      {size > 0 && size >= limit && (
        <div className="row">
          <div className="col-xl-12 text-center py-5">
            <button
              onClick={loadMoreBlogs}
              className={`${styles.LoadMore__btn} btn btn-dark `}
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Load;
