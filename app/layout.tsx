import type { Metadata } from 'next'
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./main.css";
import StoreProvider from "./components/StoreProvider";
import ToastLayout from "./components/ToastLayout";

export const metadata: Metadata = {
	title: "Fingreat - Finteek App",
	description: "Fingreat - Finteek App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<StoreProvider>
				<body>
					{children}
					<ToastLayout />
				</body>
			</StoreProvider>
		</html>
	);
}
