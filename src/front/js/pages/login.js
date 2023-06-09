import React, { useCallback, useContext } from 'react'
import "../../styles/login&register.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Context } from '../store/appContext';



export const Login = () => {
  const {actions, store} = useContext(Context)

  const navigate = useNavigate()

  const [data, setData] = useState({})

  const handleChange = (e) => {
    setData({...data, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(data)

    const postConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }

    }

    fetch(process.env.BACKEND_URL + 'api/login', postConfig)
    .then(response => response.json())
    .then((response) => {
      const token = response.user_token;
      sessionStorage.token = token
      console.log(token)

      if(token){
        actions.saveToken(token)
        navigate("/private")

        Swal.fire(
          'Good job!',
          "You've been logged in!",
          'success'
        )


      } else {
        Swal.fire({
          icon: 'error',
          title: '400',
          text: 'Complete the fields!'
        });
        navigate('/not-found-404').catch((error) => {
          console.error(error);
         
        });
      }
    });
};

  return (
    <div className='body'>
      <form onSubmit={handleSubmit} method='POST'>
        <div className='containerr regBox'>
          <h2 className='mb-3'>Login</h2>

            <div className='register-box'>
              <div className='input-box'>
              <input type='email' placeholder='Email' name='email' onChange={handleChange} />
              <label htmlFor=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#000000",}} />Email</label>
              </div>
            </div>

            <div className='input-box'>
              <input type='password' placeholder='Password' name='password' onChange={handleChange} />
              <label htmlFor=""><FontAwesomeIcon icon={faLock} style={{color: "#000000",}} />Password</label>
            </div>

            <button className='btn btn-info'>Login</button>
        </div>
      </form>
    </div>
  )
}
