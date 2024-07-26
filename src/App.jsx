import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./App.css";

const RenderPostgresURL =
  "https://starter-express-with-postgres-koalas.onrender.com";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [notes, setNotes] = useState([]);
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    async function getUsers() {
      const users = await axios.get(`${RenderPostgresURL}/users`);

      setUsers(users.data);
    }
    getUsers();
  }, []);

  const getNotes = useCallback(async () => {
    const notes = await axios.get(`${RenderPostgresURL}/${selectedUser}/notes`);

    if ("message" in notes.data) {
      setNotes([]);
    } else {
      setNotes(notes.data);
    }
  }, [selectedUser]);

  useEffect(() => {
    getNotes();
  }, [selectedUser, getNotes]);

  async function handleAddNote(event) {
    event.preventDefault();

    const content = new FormData(event.target).get("content");
    const category = new FormData(event.target).get("category");

    const { data } = await axios.post(
      `${RenderPostgresURL}/${selectedUser}/notes`,
      { content, category }
    );

    event.target.reset();

    setBackendMessage(data.message);
    getNotes();
  }

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
        <form onSubmit={handleAddNote}>
          <label htmlFor="note">Note:</label>
          <input id="note" type="text" name="content" />
          <label htmlFor="category">Category:</label>
          <input id="category" type="text" name="category" />
          <button type="submit">Add note</button>
        </form>
        Message from Backend: {backendMessage}
      </div>
    </>
  );
}

export default App;
