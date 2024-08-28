// import { useState } from 'react'
import "./style.css";
import api from "../../services/api";
import Trash from "../../assets/trash.svg";
import { useEffect } from "react";

function Home() {
  let users = [];

  async function getUsers(){
    users = await api.get("/users");
  };

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="name" type="text" placeholder="Name" />
        <input name="age" type="number" placeholder="Age" />
        <input name="email" type="email" placeholder="E-mail" />
        <button type="button">Register</button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span>{user.name}</span>
            </p>
            <p>
              Age: <span>{user.age}</span>
            </p>
            <p>
              E-mail: <span>{user.email}</span>
            </p>
          </div>
          <button>
            <img src={Trash} alt="image of trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
