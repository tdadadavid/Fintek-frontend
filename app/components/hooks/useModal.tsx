import React, { useContext, useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ActionTypes, store } from "../StoreProvider";
import { ToastContainer } from "react-toastify";

export const useModal = (canClose: boolean = true) => {
	const modalRef = useRef<HTMLDivElement | null>(null);
	const {
		dispatch,
		state: { modalState },
	} = useContext(store);

	const showModal = () => {
		dispatch({
			type: ActionTypes.SetModalState,
			payload: true,
		});
		modalRef.current?.classList.add("show");
	};

	const closeModal = () => {
		dispatch({
			type: ActionTypes.SetModalState,
			payload: true,
		});
		modalRef.current?.classList.remove("show");
	};

	const getModalContent = (content: React.ReactNode) => {
		return (
			<div ref={modalRef} className="modalDialog">
				<div className="body">
					{content}
					{canClose && (
						<div className="close">
							<MdOutlineClose onClick={closeModal} />
						</div>
					)}
				</div>
				{modalState && <ToastContainer />}
			</div>
		);
	};

	return {
		getModalContent,
		showModal,
		closeModal,
	};
};
