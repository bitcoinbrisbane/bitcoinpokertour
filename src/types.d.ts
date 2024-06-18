export interface MenuExp {
    menuExp: boolean;
    setMenuExpanded: (e: boolean) => void;
}

export interface Classes extends MenuExp {
    classes: string;
}

export interface IEvents {
	id: string;
	title: string;
	description: string;
	date: string;
	location: string;
	start_stack: number;
	blind_levels: number;
	game_type: string;
}

export interface IDates {
	dates: string;
}