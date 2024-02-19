import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import About from './pages/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Ajouter from './pages/Ajouter';
import Voir from './pages/Voir';
import Product from './pages/Product';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/voir' element={<Voir/>}/>
        <Route path='/ajouter' element={<Ajouter/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/product' element={<Product/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*import './App.css';
// import { useState, useRef, useEffect } from 'react'
import Cards from './Components/Cards'


function App() {
 

  return (
    <div className="App">
      <h1>Game</h1>
      <Cards />
    </div>
  );
}


export default App; */







/*import react, { Component } from "react";

class App extends Component{
  state={
    nat:[
      {nom:"sw",prenom:"sad"},
    {nom:"sw",prenom:"sad"}
  ]
}
render(){
  return(
   <div>
    <user nating={this.state.nat}/>
     </div>
  )
}

}

export default App;*/
/*
import React, { useState } from 'react';
import './App.css';
function App(){
  const [num1,setNum1]=useState();
  const [num2,setNum2]=useState();
  const [op,setOp]=useState('+');
  const [input,setInput]=useState()
  const change1=(e)=>{
    setNum1(e.target.value)
  }
  const change2=(e)=>{
    setNum2(e.target.value)
  }
  const opch=(e)=>{
    setOp(e.target.value)
  }
  const clc =(e)=>{
    switch(op){
      case('-'):
        setInput(parseInt(num1)-parseInt(num2));
        break
      
      case ('+'):
        setInput(parseInt(num1)+parseInt(num2));
        break;
      case('/'):
      if(num1==0){
        setInput('err')
      }else
        setInput(parseInt(num1)/parseInt(num2))
      break;
    }
  }
  

    return (
      <div>
        <input type='number'  onChange={change1} />
        <input type='number'  onChange={change2} />
        <select onChange={opch}>
         <option value='-'>-</option><option value='+'>+</option><option value='/'>/</option>
        </select>
        <input   value={input} />
        <button onClick={clc}>calcul</button>
        
      </div>
    );
  
}

export default App;



/*


import React ,{useState} from "react";


import './App.css';
class App extends React.Component{
  constructor(props)
  {
    super(props);
   this.IdCompteur=0;
    this.state={
      contact:{
        id:0,
        nom:'',
        prenom:'',
        tel:''
      },
      listeContact:[],

      errrosChampsObligatoires:{
        nomErreur:{background:'white'},
        prenomErreur:{background:'white'},
        telErreur:{background:'white'}
      }
    }
  

    }
//une fonctions qui permet de récupérer les valeur saisie par l'utilisateur
    getValue=(e)=>{
      this.setState({
        contact:{
          ...this.state.contact,
          [e.target.name]:e.target.value
        }
      })
    }


//Ajouter un nouveau contact
valider=(e)=>{


  let toutLeschampsSontRemplis=true;
  //vérifier si le nom est vide
  if(this.state.contact.nom.toString()=="")
  {
  
    this.setState({
      errrosChampsObligatoires:{
        ...this.state.errrosChampsObligatoires,
        nomErreur:{
          background:'red'
        }
      }
    })
    toutLeschampsSontRemplis=false;
  }

   


  //vérifier si le prenom est vide
  else if(this.state.contact.prenom.toString()=="")
  {
       this.setState({
      errrosChampsObligatoires:{
        ...this.state.errrosChampsObligatoires,
        prenomErreur:{
          background:'red'
        }
      }
    })
    toutLeschampsSontRemplis=false;
  }
  
   //vérifier si le tel est vide
   else if(this.state.contact.tel.toString()=="")
  {

    this.setState({
      errrosChampsObligatoires:{
        ...this.state.errrosChampsObligatoires,
        telErreur:{
          background:'red'
        }
      }
    })
    toutLeschampsSontRemplis=false;
  }

   //tous les champs remplis donc on peut ajouter l'objet nouveau contact dans la table
   if(toutLeschampsSontRemplis){
  //modifier l'id du contact actuelle
  this.IdCompteur++;
  this.setState(
    {
      contact:{
        ...this.state.contact,
        id:this.IdCompteur
      }
    }
  )
  //récupérer le contact actuelle

  let nouveauContact=this.state.contact;
  

   //pusher le nouveau contact dans le tableau
    this.setState(
      {
        listeContact:[...this.state.listeContact,nouveauContact]
      }
    )
    }
      //initialiser les erreurs
  this.setState({
    errrosChampsObligatoires:{
      ...this.state.errrosChampsObligatoires,
      nomErreur:{background:'white'},
      prenomErreur:{background:'white'},
      telErreur:{background:'white'}
    }
  })

  }


  //supprimer un contact du tableau
  supprimer=(e)=>{
    let id=e.target.name;
    this.setState(
      {
        listeContact:this.state.listeContact.filter(item=>(item.id!=id))
      }
    )
  }

  modidifier=(e)=>{
    let id=e.target.name;
    alert(id)
    let listeContactsModifier=this.state.listeContact.map(item=>{
      if(item.id==id)
      {
        this.setState({
          contact:item
        })
      }

    })
  }

    render()
    {
      return (
        <div>
        
        <fieldset>
        <legend>Add contact</legend>
        {JSON.stringify(this.state.contact)}
        <table>
          <tr>
            <td>Nom</td>
            <td><input type="text" name="nom" value={this.state.contact.nom} onChange={this.getValue} style={this.state.errrosChampsObligatoires.nomErreur} className="width100"/></td>
          </tr>
          <tr>
            <td>Prénom</td>
            <td><input type="text" name="prenom" value={this.state.contact.prenom}  onChange={this.getValue} style={this.state.errrosChampsObligatoires.prenomErreur} className="width100"/></td>
          </tr>
          <tr>
            <td>Tel</td>
            <td><input type="tel"  name='tel' value={this.state.contact.tel} onChange={this.getValue} style={this.state.errrosChampsObligatoires.telErreur} className="width100"/></td>
          </tr>
          <tr>
           <td></td>
            <td><input type="button" value="Valider" onClick={this.valider}  style={{width:'100%'}}/></td>
          </tr>
        </table>
        </fieldset>

        <fieldset>
          <legend>Liste Contacts</legend>
          <table style={{border:'1px solid #555',width:'100%'}}>
            <thead style={{background:'#aaa'}}>
              <th style={{border:'1px solid #555'}}>Id</th>
              <th style={{border:'1px solid #555'}}>Nom</th>
              <th style={{border:'1px solid #555'}}>Prénom</th>
              <th style={{border:'1px solid #555'}}>Tél</th>
              <th style={{border:'1px solid #555'}}>Actions</th>
            </thead>
            <tbody>
              {
                this.state.listeContact.map((item)=>{
                  return <tr>
                    <td style={{border:'1px solid #555'}}>{item.id}</td>
                    <td style={{border:'1px solid #555'}}>{item.nom}</td>
                    <td style={{border:'1px solid #555'}}>{item.prenom}</td>
                    <td style={{border:'1px solid #555'}}>{item.tel}</td>
                    <td style={{border:'1px solid #555'}}>
                      <input value="supprimer" name={item.id} onClick={this.supprimer} type="button"/>
                      <input value="Modifier" name={item.id} onClick={this.modidifier} type="button"/>

                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </fieldset>
        </div>
        
        );
        
      }
      
    }
    export default App; 
    /*
import { useState } from "react";
function App(){
    const [resulta, setResult]=useState("");
    const click=(e) =>{
        setResult(resulta.concat(e.target.name));
    }
    const clear = () => {
        setResult("");
    }
    const calcul = () => {
        try{
            setResult(eval(resulta).toString());
        } catch(err){
            setResult("Error")
        }
    }
    return(
        <div className="container">
            <form>
                <input type="text" value={resulta} />
            </form>
            <div className="keypad"> 
                <button name="+" onClick={click}>+</button>   
                <button name="/" onClick={click}>&divide;</button>
                <button name="-" onClick={click}>&ndash;</button>
                <button name="*" onClick={click}>&times;</button>
                <button name="%" onClick={click}>%</button>
                <button name="." onClick={click}>.</button>               
                <button name="7" onClick={click}>7</button>
                <button name="8" onClick={click}>8</button>
                <button name="9" onClick={click}>9</button>
                <button name="4" onClick={click}>4</button>
                <button name="5" onClick={click}>5</button>
                <button name="6" onClick={click}>6</button>
                <button onClick={clear} id="clear">c</button>
                <button name="3" onClick={click}>3</button>
                <button name="2" onClick={click}>2</button>
                <button name="1" onClick={click}>1</button>
                <button name="0" onClick={click}>0</button>
                <button onClick={calcul} id="resulta">=</button>
           </div>
         </div>
    );
}
export default App;*/


























/*import React, { useState } from "react";
function App(){
  const [user,setUser]=useState({name:"",prenom:"",age:"",nember:""});
  const inputChange=e=>{
    const {name,value}=e.target;
    setUser(prevUser => ({
      ...prevUser,//Récupérer l'ancien objet
      [name]: value 
      }));
  }
  const connexion=async e =>{
    
  }

  return(
    <div>
      <form>
        <h4 style={{color:'white'}}>name:</h4><input type="text" name="name" value={user.name} onChange={e=>inputChange(e)}/>
        <h4 style={{color:'white'}}>prenom:</h4><input type="text" name="prenom" value={user.prenom} onChange={e=>inputChange(e)}/>
        <h4 style={{color:'white'}}>age:</h4><input type="text" name="age" value={user.age} onChange={e=>inputChange(e)}/>
        <h4 style={{color:'white'}}>nember:</h4><input type="text" name="nember" value={user.nember} onChange={e=>inputChange(e)}/><br/>

        <button style={{height:'28px',width:'80px'}} onClick={connexion} type="submit" >Submit</button>

      </form>
    </div>
  )
}
export default App */
/*
import { useState } from "react";

function ProductCreate() {
  // State to track the title and price input values
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  // Event handler for title input changes
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Event handler for price input changes
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Event handler for form submission
  const onFormSubmit = (e) => {
    e.preventDefault();

    // Perform any actions you need when the form is submitted
    // For example, you might send an API request to create the product

    // Reset the form after submission
    setTitle("");
    setPrice("");
  };

  return (
    <div>
      <h1>Nouveau Produit</h1>
      <form onSubmit={onFormSubmit}>
        <input
          value={title}
          onChange={onTitleChange}
          placeholder="Product Title"
        />
        <br />

        <input
          value={price}
          onChange={onPriceChange}
          type="number"
          placeholder="Product Price"
        />
        <br />

        <input type="submit" value="Créer" />
      </form>
    </div>
  );
}

export default ProductCreate;

*//*
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.quiz = [
      {
        qte: 'capital maroc',
        rep: 'rabat',
        choix1: 'rabat',
        choix2: 'casablanca',
      },
      {
        qte: 'capital france',
        rep: 'paris',
        choix1: 'lyon',
        choix2: 'paris', // Fixed typo 'parix' to 'paris'
      },
      {
        qte: 'le roi de maroc',
        rep: 'hassan 2',
        choix1: 'hassan 3',
        choix2: 'hassan 2',
      },{
      qte: 'capital alger',
        rep: 'alger',
        choix1: 'alger',
        choix2: 'casablanca',
      },
      {
        qte: '7*2',
        rep: '14',
        choix1: '12',
        choix2: '14', // Fixed typo 'parix' to 'paris'
      },
      {
        qte: 'prix de taxi',
        rep: '8dh',
        choix1: '8dh',
        choix2: '10dh',
      },
    ];
    this.index = 0;
    this.state = {
      questionDisplayed: this.quiz[this.index], // Fixed typo 'questionDisaplayed' to 'questionDisplayed'
      score: 0,
      disabledChoix: false, // Fixed typo 'desabledchoix' to 'disabledChoix'
      colorChoix1: '',
      colorChoix2: '',
      
    };
  }

  nextQuestion = () => {
    if (this.index < this.quiz.length - 1) {
      this.index++;
      this.setState({
        questionDisplayed: this.quiz[this.index],
        disabledChoix: false,
        colorChoix1: '',
        colorChoix2: '',
      });
    }
  };

  getAnswer = (event) => {
    const reponseUser = event.target.value;
    let buttonName = event.target.name;
    let color1 = '';
    let color2 = '';
    let plus = 1;
    if (reponseUser !== this.state.questionDisplayed.rep) {
      plus = -1;
      if (buttonName === "colorChoix1") {
        color1 = 'red';
        color2 = 'green';
      } else {
        color1 = 'green';
        color2 = 'red';
      }
    } else {
      if (buttonName === "colorChoix2") {
        color1 = 'green';
        color2 = 'red';
      } else {
        color1 = 'red';
        color2 = 'green';
      }
    }
    this.setState({
      score: this.state.score + plus,
      disabledChoix: true,
      colorChoix1: color1,
      colorChoix2: color2,
    });
  };

  render() {
    const {
      questionDisplayed,
      score,
      disabledChoix,
      colorChoix1,
      colorChoix2,
    } = this.state;

    return (
      <div>
        <input
          style={{ width: '100%' }}
          type="text"
          value={questionDisplayed.qte} // Fixed typo 'questionDisplayed' to 'qte'
        />
        <input
          type="button"
          value={questionDisplayed.choix1}
          name="colorChoix1"
          style={{ backgroundColor: colorChoix1 }}
          onClick={this.getAnswer}
          disabled={disabledChoix}
        />
        <input
          type="button"
          value={questionDisplayed.choix2}
          name="colorChoix2"
          style={{ backgroundColor: colorChoix2 }}
          onClick={this.getAnswer}
          disabled={disabledChoix}
        />
        <input type="button" onClick={this.nextQuestion} value="Next" />
        <h4>Your score is: {score}</h4>
      </div>
    );
  }
}

export default App; */
/*
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.Quiz = [
      {
        qte: 'capitale maroc',
        rep: 'rabat',
        choix1: 'rabat',
        choix2: 'fes',
      },
      {
        qte: 'capitale usa',
        rep: 'washington', // Fixed typo 'washenton' to 'washington'
        choix1: 'new york',
        choix2: 'washington',
      },{
        qte: 'le roi de maroc',
        rep: 'hassan 2',
        choix1: 'hassan 3',
        choix2: 'hassan 2',
      },{
      qte: 'capital alger',
        rep: 'alger',
        choix1: 'alger',
        choix2: 'casablanca',
      },
      {
        qte: '7*2',
        rep: '14',
        choix1: '12',
        choix2: '14', // Fixed typo 'parix' to 'paris'
      },
      {
        qte: 'prix de taxi',
        rep: '8dh',
        choix1: '8dh',
        choix2: '10dh',
      },
    ];
    this.index = 0;
    this.state = {
      msg:'',
      coQuestion: this.Quiz[this.index],
      score: 0,
      deChoix: false,
      color1ch: '',
      color2ch: '',
    };
  }

  connexion = () => {
    if (this.index < this.Quiz.length - 1) {
      this.index++;
      this.setState({
        msg:'',
        coQuestion: this.Quiz[this.index],
        deChoix: false,
        color1ch: '',
        color2ch: '',
      });
    }else{
      this.setState({msg:'your score is:' })
    }
  };

  getAnswer = (event) => {
    const reponse = event.target.value;
    const buttonName = event.target.name;
    let plus = 1;
    let color1 = '';
    let color2 = '';

    if (reponse !== this.state.coQuestion.rep) {
      plus = -1;
      if (buttonName === 'color1ch') {
        color1 = 'green';
        color2 = 'red';
      } else {
        color1 = 'red';
        color2 = 'green';
      }
    }else{
      if (buttonName === 'color2ch') {
        color1 = 'red';
        color2 = 'green';
      } else {
        color1 = 'green';
        color2 = 'red';
      }
    }

    this.setState({
      msg:this.state.msg,
      score: this.state.score + plus,
      deChoix: true,
      color1ch: color1,
      color2ch: color2,
    });
  };

  render() {
    const { score, coQuestion, color1ch, color2ch, deChoix,msg } = this.state;

    return (
      <div style={{textAlign:'center',marginTop:'50px'}}>
        <h3>Quiz</h3>
        <input
          value={coQuestion.qte}
          style={{ width: '200px',height:'200px',textAlign:'center',backgroundColor:'black',color:'white' }}
          type="text"
          readOnly
        />
        <br />
        <input
          disabled={deChoix}
          value={coQuestion.choix1}
          onClick={this.getAnswer}
          name="color1ch"
          style={{ backgroundColor: color1ch,width: '200px' }}
          type="button"
        />
        <br />
        <input
          disabled={deChoix}
          value={coQuestion.choix2}
          onClick={this.getAnswer}
          name="color2ch"
          style={{ backgroundColor: color2ch ,width: '200px'}}
          type="button"
        />
        <br />
        <input onClick={this.connexion} type="button" value="Next" />
        <br />
        <h4>{msg}{score}</h4>
        
      </div>
    );
  }
}

export default App;
*/

/*
getvalue=()=>{
  if(this.index<this.quiz.lenght-1){
    index=++
    this.setstate({
      coauist:this.quiz[this.index],
      colorcho:'',
      colorch:'',
      desabled:false,
    })
  }
}
*/









