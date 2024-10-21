import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatRoom() {
  let baseUrl = "http://localhost:8000/messages";
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const getMessages = async () => {
    try {
      const response = await axios.get(baseUrl);
      setMessages(response.data);
    } catch (error) {
      console.log("Data not Received");
    }
  };
  const sendMessages = async (e) => {
    try {
      let SendingData = await axios.post(baseUrl, {
        user: user,
        message: message,
      });
      console.log(SendingData);
      setMessages("");
      getMessages()
    } catch (error) {
      console.log("Data not sending");
    }
  };
  useEffect(() => {
    getMessages();
    const interval = setInterval(() => {
      getMessages();
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <h2>CHAT ROOM</h2>
      <div>
        <ul>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <li key={msg._id}>
                <strong>{msg.user}:</strong> {msg.message}
              </li>
            ))
          ) : (
            <li>No messages yet</li>
          )}
        </ul>
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          value={message}
          placeholder="Type your Message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={sendMessages}>Send</button>
      </div>
    </>
  );
}
