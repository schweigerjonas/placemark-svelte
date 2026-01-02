import axios from "axios";
import type { Session, User, UserInfo } from "$lib/types/types";
import { currentUser, loggedInUser } from "$lib/runes.svelte";

const apiClient = axios.create({
	baseURL: "http://localhost:3000/api"
});

export const service = {
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

			apiClient.defaults.headers.common.Authorization = `Bearer ${session.token}`;

			this.refreshCurrentUser();
		}
	},

	clearSession() {
		loggedInUser.email = "";
		loggedInUser.name = "";
		loggedInUser.role = "";
		loggedInUser.token = "";
		loggedInUser._id = "";
		delete apiClient.defaults.headers.common.Authorization;
		localStorage.removeItem("placemarkSession");
	},

	async refreshCurrentUser() {
		const user = await this.getUser(loggedInUser._id);

		if (user) {
			currentUser.firstName = user.firstName;
			currentUser.lastName = user.lastName;
			currentUser.email = user.email;
			currentUser.password = user.password;
			currentUser.role = user.role;
		}
	},

	async signup(user: UserInfo): Promise<boolean> {
		try {
			const res = await apiClient.post("/users", user);

			return res.request.status === 201;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async login(email: string, password: string): Promise<Session | null> {
		try {
			const res = await apiClient.post("/users/authenticate", { email, password });

			if (res.data.success) {
				apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

				const session: Session = {
					name: res.data.name,
					role: res.data.role,
					token: res.data.token,
					_id: res.data._id
				};

				this.saveSession(session, email);
				this.refreshCurrentUser();

				return session;
			}

			return null;
		} catch (err) {
			console.error(err);

			return null;
		}
	},

	async getUser(id: string): Promise<User | null> {
		try {
			const res = await apiClient.get(`/users/${id}`);

			if (res.request.status === 200) {
				return res.data;
			}

			return null;
		} catch (err) {
			console.error(err);

			return null;
		}
	},

	async updateUser(id: string, updateDetails: UserInfo): Promise<boolean> {
		try {
			const res = await apiClient.put(`/users/${id}`, updateDetails);

			if (res.request.status === 201) {
				this.refreshCurrentUser();

				return true;
			}

			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async deleteAccount(id: string): Promise<boolean> {
		try {
			const res = await apiClient.delete(`/users/${id}`);

			return res.request.status === 204;
		} catch (err) {
			console.error(err);

			return false;
		}
	}
};
