import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({ nickname: "" });

  const fetchUsersData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`
      );

      setUsers(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteUsers = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );

      if (response.status !== 200) {
        console.error("Server response:", response.statusText);
        return;
      }
      setUsers(users.filter((currentUser) => currentUser.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFilterChange = (e, field) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };

  const filteredUsers = users.filter((user) => {
    return Object.keys(filter).every((field) => {
      if (filter[field] === "") return true;
      return String(user[field])
        .toLowerCase()
        .includes(filter[field].toLowerCase());
    });
  });

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <section className="List-users">
      <NavBar />
      <h2>Liste des utilisateurs enregistrés</h2>
      <input
        className="filter-users"
        type="text"
        placeholder="Filter by Firstname"
        value={filter.firstname}
        onChange={(e) => handleFilterChange(e, "firstname")}
      />
      <div className="title-users">
        <h3>Id</h3>
        <h3>Prenom</h3>
        <h3>Nom</h3>
        <h3>Pseudo</h3>
        <h3>Email</h3>
        <h3>Date de création du compte</h3>
        <h3>Supression du compte</h3>
      </div>
      {filteredUsers?.map((currentUser) => {
        return (
          <div className="body-users" key={currentUser.id}>
            <p>{currentUser.id}</p>
            <p>{currentUser.firstname}</p>
            <p>{currentUser.lastname}</p>
            <p>{currentUser.nickname}</p>
            <p>{currentUser.email}</p>
            <p>{currentUser.date_account_created}</p>
            <button type="button" onClick={() => deleteUsers(currentUser.id)}>
              Supprimer
            </button>
          </div>
        );
      })}
    </section>
  );
}
