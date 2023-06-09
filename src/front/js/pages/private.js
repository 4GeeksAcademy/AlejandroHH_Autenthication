import React from 'react'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context } from '../store/appContext'



export const Private = () => {
  const navigate = useNavigate()

  const {actions, store} = useContext(Context)

  const [token, setToken] = useState()

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));

    
    const postConfig = {
      method: "POST",
      body: JSON.stringify(),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
  
    }
  
    fetch(process.env.BACKEND_URL + 'api/private', postConfig)
    .then(response => response.json(token))
    .then((response) => {
      
        console.log(response)
    })
  }, [])

  const deleteToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    navigate("/login")
    
  }



    return (
      <>
        <div className='box'>
          <div className='cabecera'>
            <button onClick={deleteToken}>Sign Out</button>
          </div>
          <div className='bienvenida'>
            <h1>WelcomeEEEEEEEE</h1>
            <h1>WelcomeEEEEEEEE</h1>
            <h1>WelcomeEEEEEEEE</h1>
            <h1>WelcomeEEEEEEEE</h1>
            <h1>WelcomeEEEEEEEE</h1>
          </div>
          
        </div>
          
      </>
    )
  }
  