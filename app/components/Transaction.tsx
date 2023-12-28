import useAxiosHandler from "@/utils/axiosHandler";
import { useEffect, useState } from "react";
import { useModal } from "./hooks/useModal";
import { accountsUrl } from "@/utils/network";
import AddAccount from "./AddAccount";
import SendMoney from "./SendMoney";
import AddMoney from "./AddMoney";

export interface AccountType {
	currency: string;
	id: string;
	balance: string;
	created_at: string;
}

enum ModalState {
	AddAccount = "AddAccount",
	SendMoney = "SendMoney",
	AddMoney = "AddMoney",
}

const Transaction = () => {
	const [accounts, SetAccounts] = useState<AccountType[]>([]);
	const [loading, setLoading] = useState(true);
	const { axiosHandler } = useAxiosHandler();
	const { getModalContent, closeModal, showModal } = useModal();
	const [modalState, SetModalState] = useState(ModalState.AddAccount);

	const getAccounts = async () => {
		setLoading(true);

		const response = await axiosHandler<AccountType[]>({
			method: "GET",
			url: accountsUrl.getAccounts,
			isAuthorized: true,
		});

		setLoading(false);

		if (response.data) {
			//@ts-ignore
			SetAccounts(response.data.data);
		}
	};

	useEffect(() => {
		getAccounts();
	}, []);

	const completeOperation = () => {
		closeModal();
		getAccounts();
	};

	const sendMoney = () => {
		SetModalState(ModalState.SendMoney);
		showModal();
	};

	const addMoney = () => {
		SetModalState(ModalState.AddMoney);
		showModal();
	};

	const addAccount = () => {
		SetModalState(ModalState.AddAccount);
		showModal();
	};

	const components = {
		[ModalState.AddAccount]: (
			<AddAccount completeOperation={completeOperation} />
		),
		[ModalState.AddMoney]: (
			<AddMoney accounts={accounts} completeOperation={completeOperation} />
		),
		[ModalState.SendMoney]: (
			<SendMoney accounts={accounts} completeOperation={completeOperation} />
		),
	};

	return (
		<div className="section accounts">
			<h3>Accounts</h3>
			<div className="accountsBlock">
				{loading && "Loading Accounts..."}
				{accounts?.map((account: AccountType, index: number) => (
					<AccountCard
						currency={account.currency}
						amount={parseFloat(account.balance).toFixed(2).toString()}
						key={index}
					/>
				))}
				<button onClick={addAccount} className="addAccount">
					Add Account.
				</button>
			</div>

			<div className="op-button">
				{accounts.length > 0 && (
					<>
						<button onClick={addMoney}>Add Money</button>
						<button onClick={sendMoney}>Send Money</button>
					</>
				)}
			</div>

			{getModalContent(components[modalState])}
		</div>
	);
};

interface AccountCardType {
	currency: string;
	amount: string;
}

const AccountCard = (props: AccountCardType) => (
	<div className="accountCard">
		<h2>{props.currency}</h2>

		<div className="info">Balance</div>
		<h1>{props.amount}</h1>
	</div>
);

export default Transaction;
