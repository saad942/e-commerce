
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import './login.css'

function Login() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState(true)
    let navigate = useNavigate()

    function login(e) {
        e.preventDefault();
        let items = {email, password };
        axios.post('http://localhost:8081/login', items)
        .then((response) => {
            console.log(response);
            if(response.data.code == 500){
                toast.error(response.data.message);
            }
            else{
                localStorage.setItem('user-info',JSON.stringify(response.data.userInfo) )
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err);
            if(err.response.data.errors.email){
                toast.error(err.response.data.errors.email[0]);
            }
            if(err.response.data.errors.password){
                toast.error(err.response.data.errors.password[0]);
            }

            
        })
    }
    return (
            <div class="center">
                <h3 className="h3">Login</h3>
                <form>
                    <div class="txt_field">
                        <input type="text" required onChange={(e) => setEmail(e.target.value)} />
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div class="txt_field">
                        <input type="password" required onChange={(e) => setPassword(e.target.value)} />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div class="pass">Forgot Password?</div>
                    <input type="submit" value="Login" onClick={login} />
                    <div class="signup_link">
                        you don't have acompte <Link to='/SignUp'>Signup</Link>
                    </div>
                </form>
            </div>
    )
}
export default Login;   