import type { Session } from "$lib/types/types";
import { loggedInUser } from "$lib/runes.svelte";
import { refreshCurrentUser } from "./utils";
import { apiClient } from "./service";

export function saveSession(session: Session, email: string) {
	loggedInUser.email = email;
	loggedInUser.name = session.name;
	loggedInUser.role = session.role;
	loggedInUser.token = session.token;
	loggedInUser._id = session._id;

	localStorage.placemarkSession = JSON.stringify(loggedInUser);
}

export async function restoreSession() {
	const savedUser = localStorage.placemarkSession;

	if (savedUser) {
		const session = JSON.parse(savedUser);
		loggedInUser.email = session.email;
		loggedInUser.name = session.name;
		loggedInUser.role = session.role;
		loggedInUser.token = session.token;
		loggedInUser._id = session._id;

		apiClient.defaults.headers.common.Authorization = `Bearer ${session.token}`;

		refreshCurrentUser();
	}
}

export function clearSession() {
	loggedInUser.email = "";
	loggedInUser.name = "";
	loggedInUser.role = "";
	loggedInUser.token = "";
	loggedInUser._id = "";
	delete apiClient.defaults.headers.common.Authorization;
	localStorage.removeItem("placemarkSession");
}
