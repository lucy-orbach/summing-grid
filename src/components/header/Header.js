import React from 'react';
import styles from 'styles/layout.module.css';
import types from 'styles/typography.module.css';


const Header = () => {
	console.log('header');
	return(
	<header className={styles.flex_centered} data-test="header">
		<h1 className={types.header_title}>Summing<span>Grid</span></h1>
	</header>
)};

export default Header;