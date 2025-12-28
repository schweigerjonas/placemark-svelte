import axios from "axios";
import type { Session, UserInfo } from "$lib/types/types";
import { loggedInUser } from "$lib/runes.svelte";

export const service = {
	baseUrl: "http://localhost:3000",

	saveSession(session: Session, email: string) {
		loggedInUser.email = email;
		loggedInUser.name = session.name;
		loggedInUser.role = session.role;
		loggedInUser.token = session.token;
		loggedInUser._id = session._id;

		localStorage.placemarkSession = JSON.stringify(loggedInUser);
	},

	async restoreSession() {
		const savedUser = localStorage.placemarkSession;

		if (savedUser) {
			const session = JSON.parse(savedUser);
			loggedInUser.email = session.email;
			loggedInUser.name = session.name;
			loggedInUser.role = session.role;
			loggedInUser.token = session.token;
			loggedInUser._id = session._id;
		}
	},

	clearSession() {
		loggedInUser.email = "";
		loggedInUser.name = "";
		loggedInUser.role = "";
		loggedInUser.token = "";
		loggedInUser._id = "";
		localStorage.removeItem("placemarkSession");
	},

	async signup(user: UserInfo): Promise<boolean> {
		try {
			const res = await axios.post(`${this.baseUrl}/api/users`, user);

			return res.request.status === 201;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const res = await axios.post(`${this.baseUrl}/api/users/authenticate`, { email, password });

			if (res.data.success) {
				axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

				const session: Session = {
					name: res.data.name,
					role: res.data.role,
					token: res.data.token,
					_id: res.data._id
				};

				this.saveSession(session, email);

				return session;
			}

			return null;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
};
