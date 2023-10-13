import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Map from "./Map";
import calculateDistance from "./distance";

function App() {
	const [destination, setDestination] = useState("");
	const [tempDest, setTempDest] = useState("");
	const [distance, setDistance] = useState(null);
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	const [home, setHome] = useState({ lat: 0, lng: 0 });

	const goToDest = (newLoc) => {
		const dis = calculateDistance(home.lat, home.lng, newLoc.lat, newLoc.lon);
		setDistance(dis);
		console.log(dis);
	};

	return (
		<div style={{ color: "white", width: "100vw", height: "100vh", backgroundColor: "#474747", display: "flex" }}>
			<div
				style={{
					width: "20%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "space-between",
					padding: 10,
				}}
			>
				<h1 style={{ color: "white", padding: 7 }}>Hitchtracker</h1>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<p>Bestemming:</p>
					<input onChange={(e) => setTempDest(e.target.value)}></input>
					<button onClick={() => setDestination(tempDest)}>Bereken</button>
				</div>
				<div style={{ display: "flex", flexDirection: "column" }}>
					{distance && (
						<>
							<p>Afstand: {distance.toFixed(2)} KM</p>
							<p>Verwachte kosten:</p>
							<p>€ {(distance * 2.65).toFixed(2)}</p>
						</>
					)}
				</div>
			</div>
			<div style={{ width: "80%", height: "100%", backgroundColor: "white" }}>
				<Map
					destination={destination}
					center={center}
					setCenter={setCenter}
					setHome={setHome}
					home={home}
					locChangeCallback={goToDest}
				/>
			</div>
		</div>
	);
}

export default App;
