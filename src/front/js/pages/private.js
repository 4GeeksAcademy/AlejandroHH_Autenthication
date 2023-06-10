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
  
    const postFetch = async () => {
      if (token) {
        const postConfig = {
          method: "POST",
          body: JSON.stringify(),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
    
        fetch(process.env.BACKEND_URL + 'api/private', postConfig)
          .then(response => response.json())
          .then((response) => {
            console.log(response);
          });
      }
    }
    
    
  }, []); // 
  

  const deleteToken = () => {
    sessionStorage.removeItem("token");
    setToken(null);

    navigate("/login")
    window.location.reload();
    
  }



    return (
      <>
        <div className='box'>
          
          <div className='bienvenida'>
            <h1 className='text-center'>Enjoy the meme</h1>
            <div>
              <img src="https://i.pinimg.com/564x/20/8f/d9/208fd953192924fd310f0cb0068ab364.jpg" />
            </div>
          </div>
          <div className='cabecera'>
            <button className='btn btn-danger' onClick={deleteToken}>Sign Out</button>
          </div>
        </div>
          
      </>
    )
  }
  