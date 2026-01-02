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
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: Role;
	_id: string;
};

export type UserInfo = Omit<User, "_id">;

export enum ToastType {
	Success = "success",
	Danger = "danger",
	Info = "info"
}

export type ToastData = {
	message: string;
	type: ToastType;
	visible: boolean;
};
