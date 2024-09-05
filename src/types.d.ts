export interface MenuExp {
	menuExp: boolean;
	setMenuExpanded: (e: boolean) => void;
}

export interface Classes extends MenuExp {
	classes: string;
}

export interface IEvent {
	_id: string;
	title: string;
	description: string;
	location: string;
	date: string;
	game_type: string;
	buy_in: number;
	fee?: number;
	start_stack: number;
	blind_levels: number;
	// __v: number;
}

export interface INewEvent extends IEvent {
	password: string;
	registration_close: string;
}

// export interface IEvents {
// 	_id: string;
// 	title: string;
// 	description: string;
// 	game_type: string;
// 	date: string;
// 	location: string;
// 	buy_in: number;
// 	fee?: number;
// 	start_stack: number;
// 	blind_levels: number;
// }

export interface IDates {
	dates: string;
}

export interface IRegistrations {
	name: string;
	email: string;
	date: string;
	event_id: string;
	_id: string;
	__v: number;
	buy_in_address: string;
	status: string;
	btc_received: number;
	third_party_id: string;
}

export interface IRegisterEvent {
	evt_id: string;
	name: string;
	email: string;
	bitcoin_address: string;
}
