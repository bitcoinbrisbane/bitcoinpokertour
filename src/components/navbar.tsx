// components/NavBar.tsx

import React from "react";
import Link from "next/link";
import styles from "../components/NavBar.modules.css";

const NavBar: React.FC = () => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navlist}>
				<li className={styles.navitem}>
					<Link href="/">
						<a className={styles.navlink}>Home</a>
					</Link>
				</li>
				<li className={styles.navitem}>
					<Link href="/schedule">
						<a className={styles.navlink}>Schedule</a>
					</Link>
				</li>
				<li className={styles.navitem}>
					<Link href="/sponsors">
						<a className={styles.navlink}>Sponsors</a>
					</Link>
				</li>
				<li className={styles.navitem}>
					<Link href="/treasury-bitcoin-guide">
						<a className={styles.navlink}>Treasury Bitcoin Guide</a>
					</Link>
				</li>
				<li className={styles.navitem}>
					<Link href="/contact">
						<a className={styles.navlink}>Contact</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
