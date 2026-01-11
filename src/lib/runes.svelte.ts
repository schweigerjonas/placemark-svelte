import {
	ToastType,
	type Category,
	type CategoryWithPOIs,
	type MarkerSpec,
	type PointOfInterest,
	type ToastData
} from "./types/types";

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

export const currentCategories = $state({
	categories: [] as Category[]
});

export const currentPOIs = $state({
	pois: [] as PointOfInterest[]
});

export const currentUserData = $state({
	categories: [] as Category[],
	pois: [] as PointOfInterest[],
	categoriesWithPOIs: [] as CategoryWithPOIs[]
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

export const createPOIForm = $state({
	categoryId: "",
	categoryTitle: "",
	visible: false
});
