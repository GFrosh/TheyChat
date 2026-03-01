import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function JoinPage() {
	const [username, setUsername] = useState("");
	const [room, setRoom] = useState("");
	const [rooms, setRooms] = useState([]);
	const [error, setError] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		fetch("http://localhost:3001/rooms")
		.then((res) => res.json())
		.then((data) => setRooms(data))
		.catch(() => setRooms([]));
	}, []);

  	const joinRoom = (selectedRoom) => {
		const finalRoom = selectedRoom || room;

		if (!username.trim() || !finalRoom.trim()) {
		setError("Username and room required.");
		return;
		}

		const sessionUsername = sessionStorage.getItem("username");
		if (sessionUsername && sessionUsername === username) return setError("Username already in use. Please choose another.");

		sessionStorage.setItem("username", username);
		navigate(`/chat/${finalRoom}`);
  	};

	return (
		<div>
		<h2>Join Chat</h2>

		<input
			value={username}
			placeholder="Username"
			onChange={(e) => setUsername(e.target.value)}
		/>

		<input
			value={room}
			placeholder="Create new room"
			onChange={(e) => setRoom(e.target.value)}
		/>

		<button onClick={() => joinRoom()}>Create & Join</button>

		<h3>Available Rooms</h3>

		{rooms.length === 0 && <p>No active rooms yet.</p>}

		<ul>
			{rooms.map((r) => (
			<li key={r}>
				{r}
				<button onClick={() => joinRoom(r)}>Join</button>
			</li>
			))}
		</ul>

		{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}

export default JoinPage;
