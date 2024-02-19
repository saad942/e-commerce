import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
function SignUp() {
    let [name, setName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [errorName, setError] = useState(true)
    let [errorPassword, setErrorPassword] = useState(true)
    let [errorEmail, setErrorEmail] = useState(true)
    let [msgEmail, setMsgEmail] = useState("")
    let navigate = useNavigate()
    function signup(e) {
        e.preventDefault();
                let items = { name, email, password };
                axios.post('http://localhost:8081/signup', items)
                    .then((response) => {
                        console.log(response);
                        navigate('/login')

                    })
                    .catch((error) => {
                        console.log(error.response.data.errors);
                        
                         if(error.response.data.errors.email){
                             setErrorEmail(false)
                             setMsgEmail(error.response.data.errors.email[0])
                             
                         }
                         else{
                             setErrorEmail(true)
                         }

                         if(error.response.data.errors.name){
                             setError(false)
                         }                        
                         else{
                             setError(true)
                         }
                         if(error.response.data.errors.password){
                             setErrorPassword(false)
                         }
                         else{
                            setErrorPassword(true)
                         }
                    });
    }
    return (
        <div class="center">
            <h3 className="h3">Register</h3>
            <form>                
                <div class="txt_field">
                    <input type="text" onChange={(e) => setName(e.target.value)}  required/>
                    <span></span>
                    <label>User name</label>
                    
                </div>{ errorName ? null : <span  style={{fontSize:"10px",color:"red"}}>The user name field is required.</span>    }
                <div class="txt_field">
                    <input type="text" required onChange={(e) => setEmail(e.target.value)} />
                    <span></span>
                    <label>Email</label>
                    
                </div>{ errorEmail ? null : <span style={{textAlign:"end",fontSize:"10px",color:"red"}}>{msgEmail}</span>    }
                <div class="txt_field">
                    <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                    <span></span>
                    <label>Password</label>
                    

                </div>{ errorPassword ? null : <span style={{textAlign:"end",fontSize:"10px",color:"red"}}>The password field is required.</span>    }
                <br/>
                <input type="submit" value="Signup" onClick={signup}/>
                <div class="signup_link">
                    you have compte <Link to='/login'>log in</Link>
                </div>
            </form>
        </div>
    )
}
export default SignUp;  