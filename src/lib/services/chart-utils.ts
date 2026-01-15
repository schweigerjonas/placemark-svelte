import type { Category, DataSet, PointOfInterest } from "$lib/types/types";

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
