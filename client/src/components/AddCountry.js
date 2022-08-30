import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
const AddCountry = (props) => {
    const { name } = useParams();
    const [country, setCountry] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [familyMembers, setFamilyMembers] = useState("");
    const [description, setDescription] = useState("");
    const [plans, setPlans] = useState("");
    const [errors, setErrors] = useState([])
    const [danger, setDanger] = useState(false)
    const [imgName, setImgName] = useState("")
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
                    <div>
                        <div>
                            <img style={{width:250}}src={`/images/${count.continent}.png`} alt ={`/images/${count.continent}`}/>
                            <h1>{count.country ? count.country : null} COVID-19 Cases: </h1>
                            <p>{count.cases.total ? numbWithCommas(count.cases.total) : 0}</p>
                            <h2>Total population:</h2>
                            <p>{count.population ? numbWithCommas(count.population) : 'N/A'}</p>
                            <h3>Total deaths:</h3>
                            <p>{count.deaths.total ? numbWithCommas(count.deaths.total) : 0}</p>
                        </div>
                        <div className='infoContainer'>
                            <p> More info:</p>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>New Cases:</th>
                                        <th>New Deaths:</th>
                                        <th>Recovered:</th>
                                        <th>Active:</th>
                                        <th>Critical:</th>
                                        <th>Tests:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{count.cases.new ? numbWithCommas(count.cases.new) : 0}</td>
                                        <td>{count.deaths.new ? numbWithCommas(count.deaths.new) : 0}</td>
                                        <td>{count.recovered ? numbWithCommas(count.recovered) : 'N/A'}</td>
                                        <td style={styles.dangerClass}>{count.active ? numbWithCommas(count.active) : 0}</td>
                                        <td>{count.cases.critical ? numbWithCommas(count.cases.critical) : 0}</td>
                                        <td>{count.tests.total ? numbWithCommas(count.tests.total) : 0}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                    </div>
                )
            })}
            <div>
            </div>
            <h4>Keep Up to Date with this Country?</h4>
            <div className='countryForm'>
                <Form onSubmit={onSubmitHandler}>
                    <p>Country Name: {country.country}</p>
                    <div>
                        {errors.description && <p style={{ color: 'red', fontStyle: 'italic' }}>*{errors.description.message}</p>}
                        <Form.Label>Reason for keeping up to date?</Form.Label>
                        <Form.Control type='text' onChange={(e) => setDescription(e.target.value)} value={description}></Form.Control>
                        {/* {errors.description.message} */}
                    </div>
                    <div>
                        <Form.Label>Do you have family members living in this country if so how many?</Form.Label>
                        <Form.Select type='select' onChange={(e) => setFamilyMembers(e.target.value)}>
                            <option value="None" >0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9+</option>
                        </Form.Select>
                    </div>
                    <div>
                        {errors.plans && <p style={{ color: 'red', fontStyle: 'italic' }}>*{errors.plans.message}</p>}
                        <Form.Label>Plans to travel to this country?</Form.Label>
                        <Form.Control type='text' onChange={(e) => setPlans(e.target.value)}></Form.Control>
                    </div>
                    <Button type='submit' variant='outline-success'>Add Country</Button>
                </Form>
            </div>
        </div>
    )
}
export default AddCountry;