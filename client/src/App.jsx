import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import ChatPage from "./pages/ChatPage";
import { FaHome } from "react-icons/fa";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
	  	<header className="header">
			<a href="/">
				<h1>
					<FaHome />
					TheyChat
				</h1>
			</a>
			<p>Simple real-time chat app built with React and Socket.IO</p>
			<p>Created by <a href="https://github.com/GFrosh">DevGideon</a></p>
		</header>
      <Routes>
        <Route path="/" element={<JoinPage className="join-page" />} />
        <Route path="/chat/:room" element={<ChatPage className="chat-page" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
