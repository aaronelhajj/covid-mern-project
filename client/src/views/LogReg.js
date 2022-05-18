import React, {useState, useEffect } from 'react';
import Login from '../components/Login';
import Registration from '../components/Registration';
import '../App.css';
import covidGif from "../images/covid.gif";

const LogReg = (props) =>{
    return(
        <div>
            <div>
                    <h1>COVID-19 Awareness!</h1>
                    <img src={covidGif}  width='400'alt='gif' />
            </div>
            <div className='container'>
                
                <div style={{width:1000}}>
                    <Login />
                </div>
                <div style={{width:1000}}>
                    <Registration />
                </div>
            
            </div>
        </div>
    )
}
export default LogReg;