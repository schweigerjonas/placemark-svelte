<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import type { Control, Map as LeafletMap } from "leaflet";
	import { onMount } from "svelte";
	import { ToastType, type MarkerLayer, type MarkerSpec } from "$lib/types/types";
	import { SvelteMap } from "svelte/reactivity";
	import { selectedMarker, toastData } from "$lib/runes.svelte";

	let {
		id = "overview-map",
		height = 80,
		location = { lat: 51.1657, lng: 10.4515 }, // center of Germany
		zoom = 8,
		minZoom = 7,
		activeLayer = "Terrain",
		markerLayers = [] as MarkerLayer[]
	} = $props();

	let map: LeafletMap;
	let control: Control.Layers;
	let overlays: Control.LayersObject = {};
	let baseLayers: Control.LayersObject;
	let L: typeof import("/home/jonas/repos/placemark-svelte/node_modules/@types/leaflet/index");

	// contains POI data for all markers
	const markerMap = new SvelteMap<L.Marker, MarkerSpec>();

	export async function addMarker(lat: number, lng: number, popupText: string) {
		const marker = L.marker({ lat, lng }).addTo(map);
		const popup = L.popup({ closeOnClick: false });

		popup.setContent(popupText);
		marker.bindPopup(popup);
	}

	export async function moveTo(lat: number, lng: number) {
		map.flyTo({ lat: lat, lng: lng });
	}

	export function populateLayer(layer: MarkerLayer) {
		let group = L.layerGroup([]);

		layer.markerSpecs.forEach((markerSpec) => {
			let marker = L.marker([+markerSpec.location.lat, +markerSpec.location.lng]);
			let popup = L.popup({ closeOnClick: false });

			popup.setContent(
				`<p>${markerSpec.name}</p><a href="/poi/${markerSpec._id}">(click for details)</a>`
			);
			marker.bindPopup(popup);
			marker.bindTooltip(markerSpec.name);
			marker.addTo(group);
			markerMap.set(marker, markerSpec);

			marker.on("popupopen", (e) => {
				const marker = e.target;
				const spec = markerMap.get(marker);

				if (spec) {
					selectedMarker.focused = true;
					selectedMarker.spec = spec;
					return;
				}

				toastData.message = "Something went wrong.";
				toastData.type = ToastType.Danger;
				toastData.visible = true;
			});
			marker.on("popupclose", () => {
				selectedMarker.focused = false;
				selectedMarker.spec = {} as MarkerSpec;
			});
		});

		overlays[layer.title] = group;
		control.addOverlay(group, layer.title);

		if (layer.isDefault) {
			group.addTo(map);
		}
	}

	onMount(async () => {
		const leaflet = await import("leaflet");
		L = leaflet.default;

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
		control = leaflet.control.layers(baseLayers, overlays).addTo(map);

		if (markerLayers) {
			markerLayers.forEach((layer) => {
				populateLayer(layer);
			});
		}
	});
</script>

<div {id} style="height: {height}vh; width: auto"></div>
