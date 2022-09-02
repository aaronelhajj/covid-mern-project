import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
const ViewCountry = (props) => {
    const { name, id } = useParams();
    const [country, setCountry] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [familyMembers, setFamilyMembers] = useState("");
    const [description, setDescription] = useState("");
    const [plans, setPlans] = useState("");
    const [errors, setErrors] = useState([])
    const [danger, setDanger] = useState(false)
    const styles = {
        dangerClass: {
            backgroundColor: danger ? "red" : ""
        }
    }
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: { country: name },
        headers: {
            'X-RapidAPI-Key': 'bf3dc3d936mshea8985b5b1e0517p18ae32jsnb9bbae562bec',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    useEffect(() => {
        axios.request(options).then(function (response) {
            console.log(response.data);
            setCountry(response.data.response)

            console.log(country)
        }).catch(function (error) {
            console.error(error);
        });

    }, [])

    useEffect(() => {
        axios.get("http://localhost:8000/api/users/getUser",
            {
                withCredentials: true
            })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/')
            })
    }, [])
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/covid', {
            name,
            familyMembers,
            description,
            plans
        }, {
            withCredentials: true
        }
        )
            .then((res) => {
                console.log('hello')
                console.log(res)
                if (res.data.errors) {
                    console.log('hello!!!!!!!!')
                    console.log(res.data.errors)
                    setErrors(res.data.errors);
                }
                else {
                    navigate(`/user/profile/${user.username}`)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        setDescription("");
        setFamilyMembers("");
        setPlans("");


    }
    const numbWithCommas = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const convertDate = (date) =>{
        const newDate = new Date(date).toLocaleTimeString();
        const newTime = new Date(date).toLocaleDateString();
        return newDate + ' '+newTime
    }
    useEffect(() => {
        if (country.active > 100000) {
            setDanger(true);
            console.log(danger)
        }
    })
    return (
        <div>
            <NavBar />
            {country.map((count, index) => {

                return (
                    <div key={index} className='infoContainer'>
                        <h1>{count.country} COVID-19 Cases:</h1>
                        <p>{count.cases.total ? numbWithCommas(count.cases.total) : 0}</p>
                        <h2>Total population:</h2>
                        <p>{count.population ? numbWithCommas(count.population) : 0}</p>
                        <h3>Total deaths:</h3>
                        <p>{count.deaths.total ? numbWithCommas(count.deaths.total) : 0}</p>
                        <p> Basic info:</p>
                        <Table>
                            <thead>
                                <tr>
                                    <th>New Cases:</th>
                                    <th>Recent Deaths:</th>
                                    <th>Recovered:</th>
                                    <th>Active:</th>
                                    <th>Critical:</th>
                                    <th>Tests:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{count.cases.new ? numbWithCommas(count.cases.new) : 0}</td>
                                    <td>{count.deaths.new ? numbWithCommas(count.deaths.new): 0}</td>
                                    <td>{count.cases.recovered ? numbWithCommas(count.cases.recovered) : 0}</td>
                                    <td style={styles.dangerClass}>{count.cases.active ? numbWithCommas(count.cases.active) : 0}</td>
                                    <td>{count.cases.critical ? numbWithCommas(count.cases.critical) : 0}</td>
                                    <td>{count.tests.total ? numbWithCommas(count.tests.total) : 0}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <p>Extra info:</p>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Cases Per One Mil:</th>
                                    <th>Death Per One Mil:</th>
                                    <th>Tests Per One Mill:</th>
                                    <th>Last Updated: </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{count.cases["1M_pop"] ? numbWithCommas(count.cases["1M_pop"]) : 0}</td>
                                    <td>{count.deaths["1M_pop"] ? numbWithCommas(count.deaths["1M_pop"]) : 0}</td>
                                    <td>{count.tests["1M_pop"] ? numbWithCommas(count.tests["1M_pop"]) : 0}</td>
                                    <td>{convertDate(count.time)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )
            })

            }
            <div className='infoContainer'>
                
               
            </div>
        </div>
    )
}
export default ViewCountry;