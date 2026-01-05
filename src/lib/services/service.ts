import axios from "axios";
import type { Category, PointOfInterest, Session, User, UserInfo } from "$lib/types/types";
import { saveSession } from "./session-utils";
import { refreshCurrentUser } from "./utils";

export const apiClient = axios.create({
	baseURL: "http://localhost:3000/api"
});

export const service = {
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

				saveSession(session, email);
				refreshCurrentUser();

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
				refreshCurrentUser();

				return true;
			}

			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async updateUserPassword(id: string, updateDetails: UserInfo): Promise<boolean> {
		try {
			const res = await apiClient.put(`/users/${id}/password`, updateDetails);

			if (res.request.status === 201) {
				return true;
			}

			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async deleteUser(id: string): Promise<boolean> {
		try {
			const res = await apiClient.delete(`/users/${id}`);

			return res.request.status === 204;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async getAllPOIs(): Promise<PointOfInterest[]> {
		try {
			const res = await apiClient.get("/pois");

			if (res.request.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getAllCategories(): Promise<Category[]> {
		try {
			const res = await apiClient.get("/categories");

			if (res.request.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	}
};
