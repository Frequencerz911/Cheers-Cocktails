import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

export default function ManageContact() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState({ email: "" });

  const contactData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts`
      );

      setContacts(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts/${id}`
      );

      if (response.status !== 200) {
        console.error("Server response:", response.statusText);
        return;
      }
      setContacts(
        contacts.filter((currentContact) => currentContact.id !== id)
      );
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

  const filteredContacts = contacts.filter((contact) => {
    return Object.keys(filter).every((field) => {
      if (filter[field] === "") return true;
      return String(contact[field])
        .toLowerCase()
        .includes(filter[field].toLowerCase());
    });
  });

  useEffect(() => {
    contactData();
  }, []);

  return (
    <section className="List-contact">
      <NavBar />
      <h2>Liste des contacts enregistrés</h2>
      <input
        className="filter-contact"
        type="text"
        placeholder="Filter by Email"
        value={filter.firstname}
        onChange={(e) => handleFilterChange(e, "email")}
      />
      <div className="title-contact">
        <h3>Id</h3>
        <h3>Email</h3>
        <h3>Objet</h3>
        <h3>message</h3>
        <h3>Supression du contact</h3>
      </div>
      {filteredContacts?.map((currentContact) => {
        return (
          <div className="body-contact" key={currentContact.id}>
            <p>{currentContact.id}</p>
            <p>{currentContact.email}</p>
            <p>{currentContact.object}</p>
            <p>{currentContact.message}</p>
            <button
              type="button"
              onClick={() => deleteContact(currentContact.id)}
            >
              Supprimer
            </button>
          </div>
        );
      })}
    </section>
  );
}
