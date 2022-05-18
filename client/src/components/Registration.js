import axios from 'axios';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css' 

const Registration = (props)    =>{
    const [confirmRegistration, setConfirmRegistration] = useState('');
    const [errors, setErrors] = useState([])
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const handleUpdate = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    const registerUser = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/register",
        user,
        {
            withCredentials: true
        })
        .then((res)=>{
            console.log(res.data)
            setUser({
                username: "",
                email: '',
                password: '',
                confirmPassword: ''
            });
            setConfirmRegistration("You have registered an account, you can now sign in!")
            setErrors();
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.message)
        })
    }
    return (
        <div style={{width: 500}}>
            <h1>Register</h1>
            <div>
                {confirmRegistration ? <h4>{confirmRegistration}</h4> : null}
                {errors ? <p style={{color: 'red', fontStyle: 'italic'}}>{errors}</p> : ""}
                <Form className='mb-3' onSubmit={registerUser}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type='text' name='username' value={user.username} onChange={(e)=> handleUpdate(e)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='text' name='email' value={user.email} onChange={handleUpdate} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' name='password' value={user.password} onChange={handleUpdate} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' name='confirmPassword' value={user.confirmPassword} onChange={handleUpdate} />
                    </Form.Group>
                    <div>
                        <Button variant='primary' type='submit'>Register</Button>
                    </div>
                    
                </Form>
            </div>
        </div>
    )
}
export default Registration;