import { BrowserRouter, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import ChatPage from "./pages/ChatPage";
import { FaHome } from "react-icons/fa";

function App() {
  return (
    <BrowserRouter>
	  	<h1>
			<a href="/">
				<FaHome />
			</a>
		</h1>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/chat/:room" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
