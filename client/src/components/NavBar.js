import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
const NavBar = () =>{
    const [user, setUser] =  useState({})
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:8000/api/users/getUser",
        {
            withCredentials: true
        })
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
                navigate('/')
            })
    }, [])
    const logout = (e) =>{
        axios.post("http://localhost:8000/api/users/logout",
        {},
        {
            withCredentials: true,
        }
        )
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            navigate("/");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/all/countries">COVID-19 Awareness</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/all/countries">All Countries</Nav.Link>
                        <Nav.Link href={`/user/profile/${user.username}`}>Your Countries</Nav.Link>
                    </Nav>
                <Nav>
                    <Navbar.Text>
                        Signed in as: <a href={`/user/profile/${user.username}`}>{user.username}</a>
                    </Navbar.Text>
                    <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
export default NavBar;