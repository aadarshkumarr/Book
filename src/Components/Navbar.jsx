import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Navbar.module.css";

const Navbar = () => {
	return (
		<div className={styles.navbar_container}>
			<h1>Book Management</h1>
		</div>
	);
};

export default Navbar;
