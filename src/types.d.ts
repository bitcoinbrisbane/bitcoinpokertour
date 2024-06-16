export interface MenuExp {
    menuExp: boolean;
    setMenuExpanded: (e: boolean) => void;
}

export interface Classes extends MenuExp {
    classes: string;
}