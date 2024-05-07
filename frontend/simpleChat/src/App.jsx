import { useState, useEffect } from "react";
import "./App.css";

import { nanoid } from "nanoid";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(5);
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });
  return (
    <div className="container">
      <h1>Simple Chat</h1>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index}>
            {msg.userName} : {msg.message}
          </p>
        ))}
      </div>
      <form className="chat-form" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="Send a message"
          name="chat"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
