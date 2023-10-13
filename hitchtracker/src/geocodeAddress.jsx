import axios from "axios";

const geocodeAddress = async (address) => {
	try {
		const response = await axios.get(
			`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
		);

		if (response.data.length > 0) {
			const location = response.data[0];
			return { lat: parseFloat(location.lat), lon: parseFloat(location.lon) };
		} else {
			return null; // Address not found
		}
	} catch (error) {
		console.error("Geocoding error:", error);
		return null;
	}
};

export default geocodeAddress;
