import axios from "axios";
import type {
	Category,
	CategoryInfo,
	PointOfInterest,
	PointOfInterestInfo,
	Session,
	User,
	UserInfo
} from "$lib/types/types";

export const apiClient = axios.create({
	baseURL: "http://localhost:3000/api"
});

export const service = {
	async signup(user: UserInfo): Promise<boolean> {
		try {
			const res = await apiClient.post("/users", user);

			return res.status === 201;
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
					email: email,
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
	},

	async loginWithGithub(githubId: number, username: string): Promise<Session | null> {
		try {
			const res = await apiClient.post("/users/authenticate/github", { githubId, username });

			if (res.data.success) {
				apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

				const session: Session = {
					name: res.data.name,
					email: `${username}@github.com`,
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
	},

	async loginWithGoogle(
		googleId: string,
		username: string,
		email: string
	): Promise<Session | null> {
		try {
			const res = await apiClient.post("/users/authenticate/google", { googleId, username, email });

			if (res.data.success) {
				apiClient.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;

				const session: Session = {
					name: res.data.name,
					email: email,
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
	},

	async getAllUsers(token: string): Promise<User[]> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.get("/users", config);

			if (res.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getUserById(id: string, token: string): Promise<User | null> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.get(`/users/${id}`, config);

			if (res.status === 200) {
				return res.data;
			}

			return null;
		} catch (err) {
			console.error(err);

			return null;
		}
	},

	async updateUser(id: string, updateDetails: UserInfo, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.put(`/users/${id}`, updateDetails, config);

			if (res.status === 201) {
				return true;
			}

			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async updateUserPassword(id: string, updateDetails: UserInfo, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.put(`/users/${id}/password`, updateDetails, config);

			if (res.status === 201) {
				return true;
			}

			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async deleteUserById(id: string, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.delete(`/users/${id}`, config);

			return res.status === 204;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async createCategory(id: string, category: CategoryInfo, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.post(`/users/${id}/categories`, category, config);

			return res.status === 201;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async getAllCategories(): Promise<Category[]> {
		try {
			const res = await apiClient.get("/categories");

			if (res.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getUserCategories(id: string, token: string): Promise<Category[]> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.get(`/users/${id}/categories`, config);

			if (res.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getCategoryById(id: string): Promise<Category | null> {
		try {
			const res = await apiClient.get(`/categories/${id}`);

			if (res.status === 200) {
				return res.data;
			}

			return null;
		} catch (err) {
			console.error(err);

			return null;
		}
	},

	async deleteCategoryById(id: string, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.delete(`/categories/${id}`, config);

			return res.status === 204;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async createPOI(id: string, poi: PointOfInterestInfo, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.post(`/categories/${id}/pois`, poi, config);

			return res.status === 201;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async getAllPOIs(): Promise<PointOfInterest[]> {
		try {
			const res = await apiClient.get("/pois");

			if (res.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getCategoryPOIs(id: string, token: string): Promise<PointOfInterest[]> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.get(`/categories/${id}/pois`, config);

			if (res.status === 200) {
				return res.data;
			}

			return [];
		} catch (err) {
			console.error(err);

			return [];
		}
	},

	async getPOIById(id: string): Promise<PointOfInterest | null> {
		try {
			const res = await apiClient.get(`/pois/${id}`);

			if (res.status === 200) {
				return res.data;
			}

			return null;
		} catch (err) {
			console.error(err);

			return null;
		}
	},

	async updatePOI(id: string, updateDetails: PointOfInterestInfo, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.put(`/pois/${id}`, updateDetails, config);

			if (res.status === 201) {
				return true;
			}
			return false;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async deletePOIById(id: string, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.delete(`/pois/${id}`, config);

			return res.status === 204;
		} catch (err) {
			console.error(err);

			return false;
		}
	},

	async addImageToPOI(poi: PointOfInterest, file: File, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const formData = new FormData();
			formData.append("imageFile", file);

			const res = await apiClient.post(`/images`, formData, config);

			if (res.status !== 201) {
				console.error("image upload failed");
				return false;
			}

			const images = poi.img;
			images.push(res.data);

			const payload: PointOfInterestInfo = {
				name: poi.name,
				description: poi.description,
				location: {
					lat: poi.location.lat,
					lng: poi.location.lng
				},
				img: images
			};

			const updateSuccess = await this.updatePOI(poi._id, payload, token);

			if (!updateSuccess) {
				console.error("poi update failed");
				return false;
			}

			return true;
		} catch (err) {
			console.error(err);

			return false;
		}
	},
	async deleteImageFromPOI(poi: PointOfInterest, imageId: string, token: string): Promise<boolean> {
		try {
			const config = {
				headers: { Authorization: `Bearer ${token}` }
			};

			const res = await apiClient.delete(`/images/${imageId}`, config);

			if (res.status !== 204) {
				console.error("image deletion failed");
				return false;
			}

			const images = poi.img.filter((image) => image.publicID !== imageId);

			const payload: PointOfInterestInfo = {
				name: poi.name,
				description: poi.description,
				location: {
					lat: poi.location.lat,
					lng: poi.location.lng
				},
				img: images
			};

			const updateSuccess = await this.updatePOI(poi._id, payload, token);

			if (!updateSuccess) {
				console.error("poi update failed");
				return false;
			}

			return true;
		} catch (err) {
			console.error(err);

			return false;
		}
	}
};
