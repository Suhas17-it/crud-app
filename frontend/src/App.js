import React, { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Auth } from "./components/auth";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    if (currentUser) {
      getUsers();
    }
  }, [currentUser]);

  const addUser = async () => {
    if (!currentUser) return alert("Login required");
    if (!name || !email) return alert("Name and Email are required");

    try {
      await addDoc(usersCollectionRef, { name, age: Number(age), email });
      getUsers();
    } catch (err) {
      alert("Failed to add user: " + err.message);
    }
  };

  const updateUser = async (id) => {
    if (!currentUser) return alert("Login required");
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, { name: updatedName });
      getUsers();
    } catch (err) {
      alert("Update failed: " + err.message);
    }
  };

  const deleteUser = async (id) => {
    if (!currentUser) return alert("Login required");
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      getUsers();
    } catch (err) {
      alert("Delete failed: " + err.message);
    }
  };

  if (!currentUser) {
    return (
      <div className="App">
        <h2>🔐 Please login or sign up to continue</h2>
        <Auth />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>📘 Student Database</h1>
      <button onClick={() => signOut(auth)} style={{ float: "right" }}>
        🚪 Logout
      </button>

      <div className="form">
        <h3>Add Student</h3>
        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>➕ Add</button>
      </div>

      <div className="list">
        <h3>Students List</h3>
        {users.map((user) => (
          <div key={user.id} style={{ marginBottom: "20px" }}>
            <strong>{user.name}</strong> ({user.age} yrs) — {user.email}
            <br />
            <input
              placeholder="Update name"
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <button onClick={() => updateUser(user.id)}>✏️ Update</button>
            <button onClick={() => deleteUser(user.id)}>🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
