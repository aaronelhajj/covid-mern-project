import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
const AddCountry = (props) =>{
    const {name} = useParams();
    const [country, setCountry] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] =  useState({})
    const [familyMembers, setFamilyMembers] = useState("");
    const [description, setDescription] = useState("");
    const [plans, setPlans] = useState("");
    const [errors, setErrors] = useState([])
    const [danger, setDanger] = useState(false)
    const styles = {
        dangerClass:{
            backgroundColor: danger ? "red" : ""
        }
    }
    

    const apiCall = async () =>{
        try {
            const data = await axios
            .get(`https://corona.lmao.ninja/v2/countries/${name}?yesterday=true&strict=true&query`)
            .then(res =>{
                console.log(res);
                setCountry(res.data);
                // setLoading(true);
            });
        } catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        apiCall();
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
    const onSubmitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8000/api/covid',{
            name,
            familyMembers,
            description,
            plans
        },{
            withCredentials: true
        }
        )
        .then((res)=>{
            console.log('hello')
            console.log(res)
            if(res.data.errors) {
                console.log('hello!!!!!!!!')
                console.log(res.data.errors)
                setErrors(res.data.errors);
            }
            else{
                navigate(`/user/profile/${user.username}`)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
        setDescription("");
        setFamilyMembers("");
        setPlans("");
        

    }
    const numbWithCommas = (num) =>{
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    useEffect(()=>{
        if(country.active > 100000){
            setDanger(true);
            console.log(danger)
        }
    })
    return (
        <div>
            <NavBar />
            <div>
                <img src={country.countryInfo?.flag} alt='picture' />
                <h1>{country.country} COVID-19 Cases:</h1>
                <p>{country.cases ? numbWithCommas(country.cases) : 0}</p>
                <h2>Total population:</h2>
                <p>{country.population ? numbWithCommas(country.population) : 0}</p>
                <h3>Total deaths:</h3>
                <p>{country.deaths ? numbWithCommas(country.deaths) : 0}</p>
            </div>
            <div className='infoContainer'>
                <p> More info:</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Today Cases:</th>
                            <th>Today Deaths:</th>
                            <th>Today Recovered:</th>
                            <th>Active:</th>
                            <th>Critical:</th>
                            <th>Tests:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{country.todayCases ? numbWithCommas(country.todayCases) : 0}</td>
                            <td>{country.todayDeaths}</td>
                            <td>{country.recovered ? numbWithCommas(country.recovered) : 0}</td>
                            <td style={styles.dangerClass}>{country.active ? numbWithCommas(country.active) : 0}</td>
                            <td>{country.critical ? numbWithCommas(country.critical) : 0}</td>
                            <td>{country.tests ? numbWithCommas(country.tests) : 0}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
            <h4>Keep Up to Date with this Country?</h4>
            <div className='countryForm'>
                <Form onSubmit={onSubmitHandler}>
                    <p>Country Name: {country.country}</p>
                    <div>
                        {errors.description && <p style={{color: 'red', fontStyle: 'italic'}}>*{errors.description.message}</p>}
                        <Form.Label>Reason for keeping up to date?</Form.Label>
                        <Form.Control type='text' onChange={(e)=> setDescription(e.target.value)} value={description}></Form.Control>
                        {/* {errors.description.message} */}
                    </div>
                    <div>
                        <Form.Label>Do you have family members living in this country if so how many?</Form.Label>
                        <Form.Select type='select' onChange={(e)=> setFamilyMembers(e.target.value)}>
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
                    {errors.plans && <p style={{color: 'red', fontStyle: 'italic'}}>*{errors.plans.message}</p>}
                        <Form.Label>Plans to travel to this country?</Form.Label>
                        <Form.Control type='text' onChange={(e)=> setPlans(e.target.value)}></Form.Control>
                    </div>
                    <Button type='submit' variant='outline-success'>Add Country</Button>
                </Form>
            </div>
        </div>
    )
}
export default AddCountry;