import React, {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
const ViewCountry = (props) =>{
    const {name, id} = useParams();
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
                <p> Basic info:</p>
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
                <p>Extra info:</p>
                <Table>
                    <thead>
                        <tr>
                            <th>Active Per One Mil:</th>
                            <th>Cases Per One Mil:</th>
                            <th>Death Per One Mil:</th>
                            <th>Recovered Per One Mil:</th>
                            <th>Critical Per One Mil:</th>
                            <th>Tests Per One Mill:</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{country.activePerOneMillion ? numbWithCommas(country.activePerOneMillion) : 0}</td>
                            <td>{country.casesPerOneMillion ? numbWithCommas(country.casesPerOneMillion) : 0}</td>
                            <td>{country.deathsPerOneMillion ? numbWithCommas(country.deathsPerOneMillion) : 0}</td>
                            <td>{country.recoveredPerOneMillion ? numbWithCommas(country.recoveredPerOneMillion) : 0}</td>
                            <td>{country.criticalPerOneMillion ? numbWithCommas(country.criticalPerOneMillion) : 0}</td>
                            <td>{country.testsPerOneMillion ? numbWithCommas(country.testsPerOneMillion) : 0}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
)
}
export default ViewCountry;