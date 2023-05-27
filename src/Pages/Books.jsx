import React from "react";
import BooksList from "../Components/BooksList";
import styles from "../Styles/Books.module.css";

const Books = () => {
  return (
    <div>
      <div className={styles["books-filter-container"]}>
        <div className={styles["books-list"]}>
          <BooksList />
        </div>
      </div>
    </div>
  );
};

export default Books;
