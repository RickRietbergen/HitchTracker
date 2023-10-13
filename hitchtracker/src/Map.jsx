import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import geocodeAddress from "./geocodeAddress";

const Map = ({ destination, center, setCenter, home, setHome, locChangeCallback }) => {
	const mapContainerStyle = {
		width: "100%",
		height: "100%",
	};

	const [zoom, setZoom] = useState(17);

	const handleGeocode = async () => {
		const location = await geocodeAddress(destination);

		if (location) {
			setCenter({
				lat: location.lat,
				lng: location.lon,
			});
			setZoom(19);
			locChangeCallback(location);
		} else {
			// Handle address not found
		}
	};

	useEffect(() => {
		if (destination !== "") {
			handleGeocode();
		}
	}, [destination]);

	useEffect(() => {
		// Get the user's location
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				setCenter({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
				setHome({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});
		}
	}, []);

	return (
		<LoadScript googleMapsApiKey="AIzaSyDndGdgfoyjo-o0sObJkLDYTwcwFpTCal0">
			<GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={zoom}>
				{/* Add markers, polygons, or other map features here */}
			</GoogleMap>
		</LoadScript>
	);
};

export default Map;
