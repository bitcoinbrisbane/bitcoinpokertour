export interface MenuExp {
	menuExp: boolean;
	setMenuExpanded: (e: boolean) => void;
}

export interface Classes extends MenuExp {
	classes: string;
}

export interface IEvents {
	_id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	fee: number;
	start_stack: number;
	blind_levels: number;
	game_type: string;
}

export interface IDates {
	dates: string;
}

export interface IEvent {
	_id: string;
	title: string;
	date: string;
	location: string;
	description: string;
	game_type: number;
	buy_in: number;
	fee: number;
	start_stack: number;
	blind_levels: number;
	__v: number;
}

export interface IRegistrations {
	name: string;
	email: string;
	date: string;
	event_id: string;
	_id: string;
	__v: number;
	buy_in_address: string;
}

export interface IRegisterEvent {
	evt_id: string;
	name: string;
	email: string;
	bitcoin_address: string;
}
