<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import type { Control, Map as LeafletMap } from "leaflet";
	import { onMount } from "svelte";

	let { height = 80 } = $props();

	let id = "overview-map";
	// center of germany
	let location = { lat: 51.1657, lng: 10.4515 };
	let zoom = 8;
	let minZoom = 7;
	let activeLayer = "Terrain";

	let map: LeafletMap;
	// let control: Control.Layers;
	let overlays: Control.LayersObject = {};
	let baseLayers: Control.LayersObject;
	let L: typeof import("/home/jonas/repos/placemark-svelte/node_modules/@types/leaflet/index");

	export async function addMarker(lat: number, lng: number, popupText: string) {
		const leaflet = await import("leaflet");
		L = leaflet.default;
		const marker = L.marker([lat, lng]).addTo(map);
		const popup = L.popup({ closeOnClick: false });

		popup.setContent(popupText);
		marker.bindPopup(popup);
	}

	export async function moveTo(lat: number, lng: number) {
		const leaflet = await import("leaflet");
		L = leaflet.default;

		map.flyTo({ lat: lat, lng: lng });
	}

	onMount(async () => {
		const leaflet = await import("leaflet");

		baseLayers = {
			Terrain: leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 17,
				attribution:
					'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
			}),
			Satellite: leaflet.tileLayer(
				"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
				{
					attribution:
						"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
				}
			)
		};
		let defaultLayer = baseLayers[activeLayer];

		map = leaflet.map(id, {
			center: [location.lat, location.lng],
			zoom: zoom,
			minZoom: minZoom,
			layers: [defaultLayer]
		});
		leaflet.control.layers(baseLayers, overlays).addTo(map);
	});
</script>

<div {id} class="box" style="height: {height}vh"></div>
