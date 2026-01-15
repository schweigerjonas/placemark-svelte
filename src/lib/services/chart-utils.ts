import type { Category, DataSet, PointOfInterest } from "$lib/types/types";
import { SvelteDate } from "svelte/reactivity";

export function computeByCategory(categories: Category[], pois: PointOfInterest[]): DataSet {
	const totalByCategory: DataSet = {
		labels: [""],
		datasets: [{ values: [0] }]
	};

	// get set of unique category titles
	totalByCategory.labels = [...new Set(categories.map((category) => category.title))];

	// get number of POIs per category
	// for every category, get all POIs belonging to it and return the length
	totalByCategory.datasets[0].values = categories.map(
		(category) => pois.filter((poi) => poi.categoryID === category._id).length
	);

	return totalByCategory;
}

export function computeHeatmap(pois: PointOfInterest[]): Record<string, number> {
	const stats: Record<string, number> = {};

	pois.forEach((poi) => {
		if (poi.createdAt) {
			const date = new Date(poi.createdAt * 1000);

			// normalize time to midnight
			date.setHours(0, 0, 0, 0);

			const timestamp = (date.getTime() / 1000).toString();

			if (stats[timestamp]) {
				stats[timestamp] += 1;
			} else {
				stats[timestamp] = 1;
			}
		}
	});

	return stats;
}

export function computeRollingMonthlyTrend(pois: PointOfInterest[]): DataSet {
	const labels = [];
	const values = new Array(12).fill(0);
	const now = new SvelteDate();

	// get month labels for last 12 months
	for (let i = 11; i >= 0; i--) {
		const date = new SvelteDate(now.getFullYear(), now.getMonth() - i, 1);
		labels.push(date.toLocaleString("default", { month: "short", year: "2-digit" }));
	}

	pois.forEach((poi) => {
		if (poi.createdAt) {
			const poiDate = new Date(poi.createdAt * 1000);
			const monthsAgo =
				(now.getFullYear() - poiDate.getFullYear()) * 12 + (now.getMonth() - poiDate.getMonth());

			// poi created within last 12 months
			if (monthsAgo >= 0 && monthsAgo < 12) {
				values[11 - monthsAgo]++;
			}
		}
	});

	return {
		labels: labels,
		datasets: [{ values: values }]
	};
}
