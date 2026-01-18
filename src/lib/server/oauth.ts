import { GitHub, Google } from "arctic";
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from "$env/static/private";
import { dev } from "$app/environment";

const baseURL = dev ? "http://localhost:5173" : "https://placemark-sve.netlify.app";

export const github = new GitHub(
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	`${baseURL}/login/github/callback`
);

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	`${baseURL}/login/google/callback`
);
