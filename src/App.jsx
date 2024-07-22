import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await axios.get(
        "https://starter-express-with-postgres-koalas.onrender.com/users"
      );

      setUsers(users.data);
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getNotes() {
      const notes = await axios.get(
        `https://starter-express-with-postgres-koalas.onrender.com/${selectedUser}/notes`
      );

      if ("message" in notes.data) {
        setNotes([]);
      } else {
        setNotes(notes.data);
      }
    }
    getNotes();
  }, [selectedUser]);

  return (
    <>
      <h1>Note-taking App</h1>
      <div className="card">
        {users.map((user) => (
          <button key={user.id} onClick={() => setSelectedUser(user.name)}>
            {user.name}
          </button>
        ))}
        <div>Selected: {selectedUser}</div>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
