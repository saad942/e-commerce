import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Nav";
import './Ajouter.css';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Ajouter() {
  const navigate = useNavigate();

  // Retrieve user from local storage
  const user = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const [name, setName] = useState("");
  const [taill, setTaill] = useState("");
  const [gender, setGender] = useState("");
  const [prix, setPrix] = useState("");
  const [photo, setPhoto] = useState(null);

  const create = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("taill", taill);
    formData.append("gender", gender);
    formData.append("prix", prix);
    formData.append("photo", photo);

    // Add the user_id to the form data
    formData.append("user_id", user.id);

    axios.post("http://localhost:8081/create", formData)
      .then((response) => {
        console.log(response);
        if (response.data.Status === 'Success') {
          console.log('Successful create.');
          navigate('/');
        } else {
          console.log('Create failed. Server response:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        if (error.response) {
          console.log('Server Response Data:', error.response.data);
          console.log('Server Status:', error.response.status);
        }
      });
  };

  return (
    <div>
      <Nav />
      <form encType="multipart/form-data" onSubmit={create}>
        <div className=" container mt col-lg-8" >
          <label>Name product:</label>
          <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '250px' , marginLeft: '20px'}} /><br />
          <label style={{ marginLeft: '30px' }}>Taille:</label>
          <input name="taille" type="text" value={taill} onChange={(e) => setTaill(e.target.value)} style={{ width: '250px' , marginLeft: '65px'}} /><br />
          <label>Gender:</label>
          <input name="gender" type="text" value={gender} onChange={(e) => setGender(e.target.value)} style={{ width: '250px' , marginLeft: '68px'}} /><br />
          <label style={{ marginLeft: '30px' }}>Prix:</label>
          <input value={prix} name="prix" type="text" onChange={(e) => setPrix(e.target.value)} style={{ width: '250px', marginLeft: '70px' }} /><br />
          <label>Photo:</label>
          <input name="photo" type="file" onChange={(e) => setPhoto(e.target.files[0])} style={{ width: '250px', marginLeft: '70px' }} />
          <button type="submit" style={{ marginTop: '20px', width: '200px', marginLeft: '400px', backgroundColor: 'rgb(134, 160, 172)' }}>Submit</button>
        </div>
      </form>
      <div></div><br/><br/><br/><br/>
      <Footer />
    </div>
  );
}

export default Ajouter;
