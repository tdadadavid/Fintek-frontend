import { FormEvent, useContext, useRef, useState } from "react";
import { ActionTypes, store } from "./StoreProvider";
import useAxiosHandler from "@/utils/axiosHandler";
import { userUrl } from "@/utils/network";
import { toast } from "react-toastify";
import { UserType } from "./hocs/withAuth";

const UpdateUser = ({ closeModal }: { closeModal: () => void }) => {
	const [loading, setLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const { dispatch } = useContext(store);
	const { axiosHandler } = useAxiosHandler();

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		let updateUserReqArgs = {
			username: formRef.current?.username?.value,
		};

		const response = await axiosHandler<UserType>({
			method: "PATCH",
			url: userUrl.updateUser,
			isAuthorized: true,
			data: updateUserReqArgs,
		});

		setLoading(false);

		if (response.data) {
			toast("Updated username successfully", { type: "success" });
			dispatch({ type: ActionTypes.UpdateUser, payload: response.data });
			setTimeout(() => {
				closeModal();
			}, 1500);
		}
	};

	return (
		<div>
			<div className="modalHeading">
				<div className="title">Add Username</div>
			</div>
			<form ref={formRef} onSubmit={onSubmit}>
				<div className="modalBody userUpdate">
					<div className="formGroup">
						<label htmlFor="Username">Username</label>
						<input name="username" required />
					</div>
					<div className="modalFooter">
						<button type="submit" disabled={loading}>
							Update{loading && "..."}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateUser;
