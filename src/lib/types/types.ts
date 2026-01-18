export type Session = {
	name: string;
	email: string;
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
	currentPassword?: string;
	role: Role;
	_id: string;
};

export type UserInfo = Omit<User, "_id">;

export type Location = {
	lat: string;
	lng: string;
};

export type Image = {
	url: string;
	publicID: string;
};

export type PointOfInterest = {
	name: string;
	description: string;
	location: Location;
	img: Image[];
	categoryID: string;
	_id: string;
	createdAt: number;
};

export type PointOfInterestInfo = Omit<PointOfInterest, "_id" | "categoryID" | "createdAt">;

export type Category = {
	title: string;
	img: Image;
	userID: string;
	_id: string;
};

export type CategoryInfo = Omit<Category, "_id" | "userID">;

export interface CategoryWithPOIs extends Category {
	pois: PointOfInterest[];
}

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

export interface MarkerSpec {
	_id: string;
	name: string;
	description: string;
	location: Location;
	category: string;
}

export interface MarkerLayer {
	isDefault: boolean;
	title: string;
	markerSpecs: MarkerSpec[];
}

export interface DataSet {
	labels: string[];
	datasets: [{ values: number[] }];
}
