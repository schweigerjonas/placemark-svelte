export type Session = {
	name: string;
	role: Role;
	token: string;
	_id: string;
};

export enum Role {
	User = "USER",
	Admin = "ADMIN"
}

export type User = {
	fistName: string;
	lastName: string;
	email: string;
	password: string;
	role: Role;
	_id: string;
};
