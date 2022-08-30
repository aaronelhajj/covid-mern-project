import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './NavBar';
import { Form } from 'react-bootstrap';

const AllCountries = () =>{
    const [search, setSearch] = useState('')
    const [countries, setCountries] = useState([])
    const [user, setUser] =  useState({})
    const navigate = useNavigate();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bf3dc3d936mshea8985b5b1e0517p18ae32jsnb9bbae562bec',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    useEffect(()=>{
        fetch('https://covid-193.p.rapidapi.com/statistics', options)
	        .then(response => response.json())
	        .then(response =>{ 
                console.log(response)
                console.log('helo')
                setCountries(response.response)
                
            })
	        .catch(err => console.error(err));
    },[])
    
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
    const numbWithCommas = (num) =>{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return (
        <div>
            <NavBar />
            <h1>COVID-19 Awareness</h1>
            <h6>Keep up to date on COVID statistics on countries across the world!</h6>
            <div className='tableContainer'>
                <Form.Control type='text' placeholder='Find a Country...' onChange={(e) =>{setSearch(e.target.value)}}/>
                <br></br>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Country</th>
                            <th>Total Cases</th>
                            <th>Total Deaths</th>
                            <th>Active Cases</th>
                            
                            <th>Add Country</th>
                        </tr>
                    </thead>
                    {
                        
                    countries.filter((country)=>{
                        if(search ===""){
                            return country
                        } else if (country.country.toLowerCase().includes(search.toLowerCase())){
                            return country
                        }
                    }).map((country, index) =>{
                        // <p>country.country</p>
                        if (country.continent != null){
                            return(
                            
                                <tbody>
                                    <tr key={index}>
                                        <td>{country.continent ? numbWithCommas(country.continent): 0}</td>
                                        <td>{country.country ? numbWithCommas(country.country): 0}</td>
                                        <td>{country.cases.total ? numbWithCommas(country.cases.total): 0}</td>
                                        <td>{country.deaths.total ? numbWithCommas(country.deaths.total): 0}</td>
                                        <td>{country.cases.active ? numbWithCommas(country.cases.active): 0}</td>
                                        <td><Button href={`/add/country/${country.country}`}variant='danger'>Track Me</Button></td>
                                    </tr>
                                </tbody>
                                )
                        }
                        
                            })
                        }
                </Table>
            </div>
        </div>
    )
}
export default AllCountries;