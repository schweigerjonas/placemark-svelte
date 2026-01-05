import { ToastType, type MarkerSpec, type PointOfInterest, type ToastData } from "./types/types";

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

export const selectedMarker = $state({
	focused: false,
	spec: {} as MarkerSpec
});
