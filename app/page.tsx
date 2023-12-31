"use client";

import { useEffect, useContext } from "react";
import { MdAccountBalance } from "react-icons/md";
import ProcessCard from "./components/ProcessCard";
import MainLayout from "./components/MainLayout";
import { useModal } from "./components/hooks/useModal";
import UpdateUser from "./components/UpdateUser";
import { store } from "./components/StoreProvider";
import WithAuth from "./components/hocs/withAuth";

const Home = () => {
	const { getModalContent, closeModal, showModal } = useModal(false);
	const {
		state: { activeUser },
	} = useContext(store);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		//@ts-ignore
		if (!activeUser?.user.username) {
			showModal();
		}
	}, []);

	return (
		<MainLayout>
			<main>
				<h1 className="title">
					{/* @ts-ignore */}
					Welcome, <span>{activeUser?.user!?.username || "user"}</span>
				</h1>
				<div className="processBlock">
					<ProcessCard
						icon={<MdAccountBalance className="accountIcon" size={30} />}
						title="Accounting"
						linkTo="/accounting"
						description="Manager account, send and receive money"
					/>
				</div>
				{getModalContent(<UpdateUser closeModal={closeModal} />)}
			</main>
		</MainLayout>
	);
};

export default WithAuth(Home);
