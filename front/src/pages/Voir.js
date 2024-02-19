import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Voir.css";
import Nav from "./Nav";
import Footer from "./Footer";
function Voir() {
  const user = JSON.parse(localStorage.getItem('user-info'));
  const [voir, setVoir] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8081/getData/${user.id}`)
      .then((response) => {
        setVoir(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user.id]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/delete/${id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  };
  return (
    <div>
      <Nav />
      <div className="" style={{ marginTop: "10px",marginLeft:'200px' }}>
        <h1>My listen</h1>
        <table style={{ width: "1000px", textAlign: "center" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>photo</th>
              <th>Name</th>
              <th>Taill</th>
              <th>Gender</th>
              <th>Prix</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {voir.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td><img src={`http://localhost:8081/${item.photo}`} style={{height:'90px'}} /></td>
                <td>{item.name}</td>
                <td>{item.taill}</td>
                <td>{item.gender}</td>
                <td>{item.prix}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-block"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Footer/>
    </div>
  );
}

export default Voir;
