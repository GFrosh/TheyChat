import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Chat from "../Chat";

function ChatPage() {
	const { room } = useParams();
	const navigate = useNavigate();
	const username = sessionStorage.getItem("username");

	useEffect(() => {
		if (!username) {
		navigate("/");
		}
	}, [username, navigate]);

  	if (!username) return null;

  	return <Chat username={username} room={room} />;
}

export default ChatPage;
