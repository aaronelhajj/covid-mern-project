import axios from "axios";
import React, {useState, useEffect} from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const Profile = (props)=>{
    const [userCountries, setUserCountries] = useState([]);
    const [user, setUser] = useState({});
    const {username} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/covidByUser/${username}`,
        {withCredentials: true}
        )
            .then((res) =>{
                console.log(res.data);
                setUserCountries(res.data);
            })
            .catch((err)=>{
                console.log(err)
                navigate('/')
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
    const deleteEntry = (countryId,username) =>{
        console.log(countryId)
        axios.delete(`http://localhost:8000/api/covid/${countryId}`)
            .then((res)=>{
                console.log(res.data)
                setUserCountries(userCountries.filter((country, index) => country._id !== countryId))
                navigate(`/user/profile/${username}`)
            })
            .catch((err)=>{
                console.log(err);
                // navigate('/')
            })
    }
    return(
        <div>
            <NavBar />
            <h1>What Countries Are You Interested in?</h1>
            <div className='entriesContainer'>
                <Table striped bordered hover className="entriesTable">
                    <thead>
                        <tr>
                            <th>Country:</th>
                            <th>Family Members?</th>
                            <th>Plans to travel? </th>
                            <th>Actions?</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    userCountries.map((country, index)=>(
                        <tr key ={index}>
                            <td>{country.name}</td>
                            <td>{country.familyMembers == null ? 0 : country.familyMembers}</td>
                            <td>{country.plans}</td>
                            <td><p><Button href={`/update/country/${country.name}/${country._id}`}> Edit</Button> <Button variant='warning' href={`/view/country/${country.name}/${country._id}`}> View</Button> <Button variant='danger'onClick={(e)=>{deleteEntry(country._id,username)}}> Delete</Button></p></td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default Profile;