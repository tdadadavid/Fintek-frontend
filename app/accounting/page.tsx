'use client';

import { useState } from "react";
import MainLayout from "../components/MainLayout";
import ContentHeading from "../components/ContentHeading";
import Transaction from "../components/Transaction";
import Accounts from "../components/Accounts";
import withAuth from "../components/hocs/withAuth";

const AccountingKeys = { accounts: "accounts", transaction: "transaction" };

const Accounting = () => {
	const [activeTab, SetActiveTab] = useState(AccountingKeys.accounts);
	const accountingComponent = {
		[AccountingKeys.accounts]: <Accounts />,
		[AccountingKeys.transaction]: <Transaction />,
	};

	return (
		<MainLayout>
			<main>
				<ContentHeading
					title="Accounting"
					sideSection={
						<SideSection activeTab={activeTab} onSetActiveTab={SetActiveTab} />
					}
				/>
			</main>
			{accountingComponent[activeTab]}
		</MainLayout>
	);
};



interface SideSectionType {
	activeTab: string;
	onSetActiveTab: (val: string) => void;
}

const SideSection = (props: SideSectionType) => {
	const getActiveTab = (tab: string) => {
		if (props.activeTab === tab) return "active";
		return "";
	};

	return (
		<div className="sideTab">
			<div
				className={`item ${getActiveTab("accounts")}`}
				onClick={() => props.onSetActiveTab(AccountingKeys.accounts)}
			>
				Accounts
			</div>

			<div
				className={`item ${getActiveTab("transaction")}`}
				onClick={() => props.onSetActiveTab(AccountingKeys.transaction)}
			>
				Transaction
			</div>
		</div>
	);
};

export default withAuth(Accounting);
