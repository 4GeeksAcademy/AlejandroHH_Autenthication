import React from 'react'
import { useEffect } from 'react'



export const Private = () => {
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    
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

    return (
      <>
        <div className='box'>
          <h1>WelcomeEEEEEEEE</h1>
          <h1>WelcomeEEEEEEEE</h1>
          <h1>WelcomeEEEEEEEE</h1>
          <h1>WelcomeEEEEEEEE</h1>
          <h1>WelcomeEEEEEEEE</h1>
        </div>
          
      </>
    )
  }
  