import { useEffect, useState } from "react";
import { socket } from "./socket";

function Chat({ username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [room]);

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room,
        author: username,
        message,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((prev) => [...prev, messageData]);
      setMessage("");
    }
  };

  return (
    <div>
		<h1>TheyChat</h1>
		<h2>Current User: {username}!</h2>
		<h2>Room: {room}</h2>
		<h3>Messages:</h3>
		<div>
			{messageList.map((msg, index) => (
			<div key={index}>
				<strong>{msg.author}</strong>: {msg.message} ({msg.time})
			</div>
			))}
		</div>

		<input
			value={message}
			placeholder="Message..."
			onChange={(e) => setMessage(e.target.value)}
		/>
		<button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default Chat;
