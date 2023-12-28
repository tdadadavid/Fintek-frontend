"use client";

import React, { FC, createContext, useReducer } from "react";
import { UserType } from "./hocs/withAuth";

interface StoreProps {
	activeUser: UserType | null;
	modalState: boolean;
}

export enum ActionTypes {
	UpdateUser = "updateUser",
	SetModalState = "setModalState",
}

type ActionType =
	| {
			type: ActionTypes.UpdateUser;
			payload: UserType | null;
	  }
	| {
			type: ActionTypes.SetModalState;
			payload: boolean;
	  };

const initialState: StoreProps = {
	activeUser: null,
	modalState: false,
};

export const store = createContext<{
	state: StoreProps;
	dispatch: (type: ActionType) => void;
}>({
	state: initialState,
	dispatch: () => null,
});

const reducer = (state: StoreProps, action: ActionType): StoreProps => {
	if (action.type === ActionTypes.UpdateUser) {
		return {
			...state,
			activeUser: action.payload,
		};
	}

	if (action.type === ActionTypes.SetModalState) {
		return {
			...state,
			modalState: action.payload,
		};
	}

	return state;
};

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const { Provider } = store;

	const [state, dispatch] = useReducer(reducer, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default StoreProvider;
