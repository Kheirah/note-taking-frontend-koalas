import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await axios.get(
        "https://starter-express-with-postgres-koalas.onrender.com/users"
      );

      setUsers(users.data);
    }
    getUsers();
  }, []);

  return (
    <>
      <h1>Note-taking App</h1>
      <div className="card">
        {users.map((user) => (
          <button key={user.id}>{user.name}</button>
        ))}
      </div>
    </>
  );
}

export default App;
