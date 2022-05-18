import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import { Form, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

const Login = (props)=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const handleLogin = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
                email: email,
                password: password
            },
            {
                withCredentials: true,
            },
            )
            .then((res)=>{
                console.log(res.data);
                navigate("/all/countries");
            })
            .catch((err)=>{
                console.log(err);
                setErrors(err.response.data.message)
                console.log(err.message)
            })
    }
    return (
        <div style={{width:500}}>
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                {errors ?  <p style={{color: 'red', fontStyle: 'italic'}}>{errors}</p> : ""}
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' name='email' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type='submit'>Login</Button>
            </Form>
        </div>
    )
}
export default Login;