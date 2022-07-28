import Link from "next/link";
import { useState, useEffect } from "react";
import { blogSearch } from "../../../actions/blog";
import styles from "./Search.module.scss";

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: "",
  });

  const { search, results, searched, message } = values;

  const searchHandler = async (e) => {
    e.preventDefault();
    const response = await blogSearch({ search });

    try {
      if (response) {
        setValues({
          ...values,
          results: response,
          searched: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };
  // console.log("RESULTS:", results);

  return (
    <form onSubmit={searchHandler} className={styles.search}>
      <div className="py-2">
        <div className="row">
          <div className="pt-4 col-lg-12 ">
            <div className="input-group">
              <input
                type="search"
                className={`${styles.formControl} form-control text-center`}
                placeholder="Search "
                onChange={handleChange}
              />
            </div>
            <div className="px-0 pt-2">
              {results && (
                <ul
                  className={`${styles.listGroup} row list-group search mt-5 ml-3 text-center`}
                >
                  {results.map((blog, idx) => (
                    <Link key={idx} href={`/blogs/${blog.slug}`}>
                      <a>
                        <li className="list-group-item">{blog.title}</li>
                      </a>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
