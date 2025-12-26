import axios from "axios";
import type { Session, User } from "$lib/types/types";

export const service = {
	baseUrl: "http://localhost:3000",

	async signup(user: User): Promise<boolean> {
		try {
			const res = await axios.post(`${this.baseUrl}/api/users`, user);

			return res.data.success === true;
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

				return session;
			}

			return null;
		} catch (err) {
			console.error(err);
			return null;
		}
	}
};
