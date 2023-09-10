import { useEffect, useState } from "react";
import "./App.css";
import Comments from "./components/Comments";
import Header from "./components/Header";
import io from "socket.io-client";

const socket = io.connect("http://localhost:7000");

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");

  async function fetchUsers() {
    const result = await fetch("http://localhost:7000/users");
    const users = await result.json();

    setUsers(users);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Header
        users={users}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
      />
      <Comments socket={socket} selectedUserId={selectedUserId} />
    </div>
  );
}

export default App;
