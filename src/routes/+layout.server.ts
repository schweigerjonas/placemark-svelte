import type { Session } from "$lib/types/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ cookies }) => {
	const cookieStr = cookies.get("placemark-user") as string;

	if (cookieStr) {
		try {
			const session = JSON.parse(cookieStr) as Session;

			return {
				session: session
			};
		} catch (e) {
			console.error(e);
			return { session: null };
		}
	} else {
		return { session: null };
	}
};
