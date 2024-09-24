import { useEffect, useState, useRef } from "react";
import "./style.css";
import api from "../../services/api";
import Trash from "../../assets/trash.svg";

function Home() {
  const [users, setUsers] = useState([]);

  //Referencias ao input para pegar o valor que está dentro dele
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers(){
    const usersFromApi = await api.get("/users");
    setUsers(usersFromApi.data);
  };

  async function createUsers() {
    await api.post("/users/create", {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers();
  }

  async function deleteUsers(id){
    await api.delete(`/users/delete/${id}`);
    getUsers();
  };


  useEffect(() => {
    getUsers()
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name="name" type="text" placeholder="Name" ref={inputName}/>
        <input name="age" type="number" placeholder="Age" ref={inputAge}/>
        <input name="email" type="email" placeholder="E-mail" ref={inputEmail}/>
        <button onClick={createUsers} type="button">Register</button>
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
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="image of trash" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
