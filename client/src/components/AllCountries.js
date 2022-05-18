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

const AllCountries = () =>{
    const [countries, setCountries] = useState([])
    const [user, setUser] =  useState({})
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get("https://corona.lmao.ninja/v2/countries?yesterday&sort")
            .then( res => {
                console.log(res.data);
                setCountries(res.data);
            })
            .catch((err) =>{
                console.log(err)
            })
    }, [])

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
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Flag</th>
                            <th>Country</th>
                            <th>Total Cases</th>
                            <th>Cases Today</th>
                            <th>Deaths Today</th>
                            <th>Add Country</th>
                        </tr>
                    </thead>
                    {
                    countries.map((country, index) =>{
                        return(
                            <tbody>
                                <tr key={index}>
                                    <td><img style={{height: 25}}src={country.countryInfo.flag} alt={country.countryInfo.iso3} /></td>
                                    <td>{country.country}</td>
                                    <td>{country.cases ? numbWithCommas(country.cases) : 0}</td>
                                    <td>{country.todayCases ? numbWithCommas(country.todayCases): 0}</td>
                                    <td>{country.todayDeaths ? numbWithCommas(country.todayDeaths): 0}</td>
                                    <td><Button href={`/add/country/${country.country}`}variant='danger'>Track Me</Button></td>
                                </tr>
                            </tbody>
                            )
                            })
                        }
                </Table>
            </div>
        </div>
    )
}
export default AllCountries;