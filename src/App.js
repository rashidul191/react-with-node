import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const url = `http://localhost:4000/users`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAddUserInfoSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    // console.log(name, email)
    const user = { name, email };
    // post data to server

    fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
       const newUser = [...users, data];
       setUsers(newUser)
      });

    // fetch('https://example.com/profile', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(user),
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };
  return (
    <div className="App">
      <h2>Our users data {users.length}</h2>
      <form onSubmit={handleAddUserInfoSubmit}>
        <input type="text" name="name" placeholder="Name" required/>
        <br />
        <input type="email" name="email" placeholder="Email" required/>
        <br />
        <input type="submit" value="Add User" />
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            name: {user.name} id: {user.id} email: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
