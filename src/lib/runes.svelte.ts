import { ToastType, type PointOfInterest, type ToastData } from "./types/types";

export const loggedInUser = $state({
	name: "",
	email: "",
	role: "",
	token: "",
	_id: ""
});

export const currentUser = $state({
	firstName: "",
	lastName: "",
	email: "",
	role: ""
});

export const toastData = $state({
	message: "",
	type: ToastType.Success,
	visible: false
} as ToastData);

export const currentPOI = $state({
	focused: false,
	poi: {} as PointOfInterest
});
