import Link from "next/link";
import React, { FC } from "react";
import { Logo } from "./Utils";
import useLogout from "./hooks/useLogout";

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="main-layout">
			<main>
				<Header />
				<div className="content">{children}</div>
			</main>
		</div>
	);
};

const Header = () => {
	const { logout } = useLogout();
	return (
		<header>
			<Link className="brand" href="/">
				<Logo />
			</Link>
			<div className="logout" onClick={logout}>
				Logout
			</div>
		</header>
	);
};

export default MainLayout;
